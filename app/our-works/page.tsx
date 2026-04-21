import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';
import { WorksDisplay } from '@/components/sections/works/WorksDisplay';
import { getGlobalConfig, getPage, listProjects, listServices } from '@/lib/api/pinpoint-public';
import type { OurWorksPageResponse } from '@/lib/api/pinpoint-public-types';
import { buildServicesLookup, mapPublicProjectToWorkCard } from '@/lib/utils/cms-mappers';
import { formatSlugToText } from '@/lib/utils/general';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Suspense } from 'react';
import type { Metadata } from 'next';

interface Props {
  searchParams: Promise<{
    sector?: string;
    service?: string;
    limit?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPage('our-works');
    return metadataFromRouteSeo(page.content.seo, 'Our Case Studies');
  } catch {
    return { title: 'Our Case Studies' };
  }
}

export default async function OurWorksPage({ searchParams }: Props) {
  const search = await searchParams;
  const [ourWorksPage, globalCfg, { services }] = await Promise.all([
    getPage('our-works'),
    getGlobalConfig(),
    listServices(),
  ]);

  if (ourWorksPage.pageKey !== 'our-works') {
    throw new Error('Unexpected our-works page payload');
  }
  const ow = ourWorksPage as OurWorksPageResponse;
  const lookup = buildServicesLookup(services);
  const order = ow.content.AVAILABLE_SERVICE_IDS ?? [];
  const facetServices = ow.projectFilterOptions.services;
  const serviceFilterOptions = order
    .filter(slug => facetServices.includes(slug))
    .map(slug => ({
      slug,
      label: lookup[slug] ?? formatSlugToText(slug),
    }));

  const defaultDisplayed =
    ow.content.DEFAULT_WORKS_DISPLAYED ?? globalCfg.content.DEFAULT_WORKS_DISPLAYED;
  const limitNum =
    search.limit != null && !Number.isNaN(Number(search.limit))
      ? Number(search.limit)
      : defaultDisplayed;

  const sectorsQ = search.sector ? [search.sector] : [];
  const servicesQ = search.service ? [search.service] : [];

  const projectsRes = await listProjects({
    page: 1,
    limit: limitNum,
    sectors: sectorsQ,
    services: servicesQ,
  });

  const projects = projectsRes.projects.map(p => mapPublicProjectToWorkCard(p, lookup));
  const provenSectors = ow.projectFilterOptions.sectors;

  return (
    <MainLayout pageName="Our Works" className="bg-gray-f2 lg:bg-white">
      <CommonHeroTextSection
        caption="Our Case Studies"
        title="When our achievements speak for themselves"
        leanUI
      />
      <Suspense fallback={null}>
        <WorksDisplay
          projects={projects}
          provenSectors={provenSectors}
          serviceFilterOptions={serviceFilterOptions}
          defaultWorksDisplayed={defaultDisplayed}
          defaultLimit={limitNum}
        />
      </Suspense>
      <PageSideDecoration caption="Our Case Studies" />
    </MainLayout>
  );
}
