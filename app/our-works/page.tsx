'use client';

import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';
import { WorksDisplay } from '@/components/sections/works/WorksDisplay';
import { Suspense } from 'react';

export default function OurWorksPage() {
  return (
    <MainLayout pageName="Our Works" className="bg-gray-f2 lg:bg-white">
      <CommonHeroTextSection
        caption="Our Case Studies"
        title="When our achievements speak for themselves"
        leanUI
      />
      <Suspense fallback={null}>
        <WorksDisplay />
      </Suspense>
      <PageSideDecoration caption="Our Case Studies" />
    </MainLayout>
  );
}
