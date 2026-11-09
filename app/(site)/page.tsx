import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudies } from '@/components/sections/home/CaseStudies';
import { GetToKnowUs } from '@/components/sections/home/GetToKnowUs';
import { HomeScrollManager } from '@/components/sections/home/HomeScrollManager';
import { HomeHero } from '@/components/sections/home/Hero';
import { CTA } from '@/components/sections/shared/Cta';
import { WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { getPage } from '@/lib/api/pinpoint-public';
import { getSiteShellData } from '@/lib/site-shell';
import type { HomePageResponse } from '@/lib/api/pinpoint-public-types';
import { mapFeaturedToCaseStudies, mapServicesToSummaryCards } from '@/lib/utils/cms-mappers';
import { HEADER_CONTRAST_HOME } from '@/lib/constants/header-contrast';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const home = await getPage('home');
    const seo = home.content.seo;
    return metadataFromRouteSeo(seo, 'Pinpoint Global');
  } catch {
    return { title: 'Pinpoint Global' };
  }
}

export default async function Home() {
  const [home, { services }] = await Promise.all([getPage('home'), getSiteShellData()]);
  if (home.pageKey !== 'home') {
    throw new Error('Unexpected home page payload');
  }
  const homeData = home as HomePageResponse;
  const samples = mapFeaturedToCaseStudies(homeData.featuredProjects ?? []);
  const servicesSummary = mapServicesToSummaryCards(services);
  const changingHeroTitleModifiers = home.content.changingHeroTitleModifiers ?? [];

  return (
    <MainLayout
      pageName="Pinpoint Global"
      headerProps={{
        headerContrast: HEADER_CONTRAST_HOME,
      }}>
      <HomeHero changingHeroTitleModifiers={changingHeroTitleModifiers} />
      <GetToKnowUs />
      <CaseStudies samples={samples} />
      <WhatWeDo services={servicesSummary} />
      <CTA />
      <HomeScrollManager />
    </MainLayout>
  );
}
