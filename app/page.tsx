'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudies } from '@/components/sections/home/CaseStudies';
import { GetToKnowUs } from '@/components/sections/home/GetToKnowUs';
import { HomeScrollManager } from '@/components/sections/home/HomeScrollManager';
import { HomeHero } from '@/components/sections/home/Hero';
import { CTA } from '@/components/sections/shared/Cta';
import { WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { RefObject, useRef } from 'react';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

export default function Home() {
  const isTabletScreenAndAbove = useMediaQuery('(min-width: 768px)');

  const heroVideoDisplayRef = useRef<HTMLElement>(null);
  const caseStudiesSectionRef = useRef<HTMLElement>(null);
  const caseStudiesListRef = useRef<HTMLElement>(null);

  const mobileRefs: RefObject<HTMLElement | null>[] = [heroVideoDisplayRef, caseStudiesListRef];
  const tabletAndAboveRefs: RefObject<HTMLElement | null>[] = [
    heroVideoDisplayRef,
    caseStudiesSectionRef,
  ];

  return (
    <MainLayout
      headerProps={{
        whiteTextStart: true,
      }}>
      <HomeHero videoDisplayRef={heroVideoDisplayRef} />
      <GetToKnowUs />
      <CaseStudies />
      <WhatWeDo
        sectionVideoDisplayRef={caseStudiesSectionRef}
        listVideoDisplayRef={caseStudiesListRef}
      />
      <CTA />
      <HomeScrollManager
        refsForObserver={isTabletScreenAndAbove ? tabletAndAboveRefs : mobileRefs}
      />
    </MainLayout>
  );
}
