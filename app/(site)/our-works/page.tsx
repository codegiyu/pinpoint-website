import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';
import { WorksDisplay } from '@/components/sections/works/WorksDisplay';
import { getPage, listProjects } from '@/lib/api/pinpoint-public';
import { getSiteShellData } from '@/lib/site-shell';
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
  }>;
}

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
  const [ourWorksPage, shell] = await Promise.all([getPage('our-works'), getSiteShellData()]);
  const { content: globalContent, services } = shell;

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

  const pageSize = ow.content.DEFAULT_WORKS_DISPLAYED ?? globalContent.DEFAULT_WORKS_DISPLAYED;
  const initialSector = search.sector?.trim() ?? '';
  const initialService = search.service?.trim() ?? '';

  const projectsRes = await listProjects({
    page: 1,
    limit: pageSize,
    sectors: initialSector ? [initialSector] : [],
    services: initialService ? [initialService] : [],
  });

  const initialProjects = projectsRes.projects.map(p => mapPublicProjectToWorkCard(p, lookup));
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
          initialProjects={initialProjects}
          initialPagination={projectsRes.pagination}
          pageSize={pageSize}
          provenSectors={provenSectors}
          serviceFilterOptions={serviceFilterOptions}
          initialFilters={{ service: initialService, sector: initialSector }}
        />
      </Suspense>
      <PageSideDecoration caption="Our Case Studies" />
    </MainLayout>
  );
}
