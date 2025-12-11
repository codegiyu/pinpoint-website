import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';
import { WorksDisplay } from '@/components/sections/works/WorksDisplay';
import { filterProjects, getProvenServicesAndSectors } from '@/lib/utils/transform';
import { Suspense } from 'react';
import { Metadata } from 'next';

interface Props {
  searchParams: Promise<{
    sector?: string;
    service?: string;
    limit?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Case Studies',
};

export default async function OurWorksPage({ searchParams }: Props) {
  const search = await searchParams;

  const { provenSectors, provenServices } = getProvenServicesAndSectors();
  const projects = await filterProjects(search);

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
          provenServices={provenServices}
        />
      </Suspense>
      <PageSideDecoration caption="Our Case Studies" />
    </MainLayout>
  );
}
