import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudies } from '@/components/sections/home/CaseStudies';
import { GetToKnowUs } from '@/components/sections/home/GetToKnowUs';
import { HomeScrollManager } from '@/components/sections/home/HomeScrollManager';
import { HomeHero } from '@/components/sections/home/Hero';
import { CTA } from '@/components/sections/shared/Cta';
import { WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { getHomeCaseStudySamples, getServicesSummary } from '@/lib/utils/transform';

export default function Home() {
  const caseStudies = getHomeCaseStudySamples();
  const services = getServicesSummary();

  return (
    <MainLayout
      pageName="Pinpoint Global"
      headerProps={{
        whiteTextStart: true,
      }}>
      <HomeHero />
      <GetToKnowUs />
      <CaseStudies samples={caseStudies} />
      <WhatWeDo services={services} />
      <CTA />
      <HomeScrollManager />
    </MainLayout>
  );
}
