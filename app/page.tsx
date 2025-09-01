import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudies } from '@/components/sections/home/CaseStudies';
import { GetToKnowUs } from '@/components/sections/home/GetToKnowUs';
import { HomeScrollManager } from '@/components/sections/home/HomeScrollManager';
import { HomeHero } from '@/components/sections/home/Hero';
import { CTA } from '@/components/sections/shared/Cta';
import { WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { getHomeCaseStudySamples, getServicesSummary } from '@/lib/utils/transform';
import { callApi } from '@/lib/services/callApi';

export default async function Home() {
  const { data } = await callApi('GET_HERO_TITLE_MODIFIERS', {});
  const caseStudies = getHomeCaseStudySamples();
  const services = getServicesSummary();

  return (
    <MainLayout
      pageName="Pinpoint Global"
      headerProps={{
        whiteTextStart: true,
      }}>
      <HomeHero textsArray={data?.heroTitleModifiers ?? ['brands']} />
      <GetToKnowUs />
      <CaseStudies samples={caseStudies} />
      <WhatWeDo services={services} />
      <CTA />
      <HomeScrollManager />
    </MainLayout>
  );
}
