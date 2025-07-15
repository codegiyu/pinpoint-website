'use client';

import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { DescriptionTextSection } from '@/components/sections/home/GetToKnowUs';
import { ServiceCardProps, WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { ServiceExpertise } from '@/components/sections/services/Expertise';
import { ServiceScrollManager } from '@/components/sections/services/ScrollManager';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';
import { ALL_SERVICES_DATA } from '@/lib/constants/texts';
import { notFound } from 'next/navigation';
import { use, useMemo, useRef } from 'react';

export interface FullServiceData {
  id: string;
  name: string;
  pageTitle: string;
  videoUrl: string;
  description: string;
  expertise: {
    title: string;
    breakdown: ServiceExpertiseGroupProps[];
    highlightImage: string;
    marqueeText: string;
  };
  breakdownSummary: string[];
  whatMakesUsUnique: WhatMakesUsUniqueProps;
  menu: { image: string; className: string };
}

export interface ServiceExpertiseGroupProps {
  title: string;
  services: string[];
  index?: number;
  isLast?: boolean;
}

export interface WhatMakesUsUniqueProps {
  title: string;
  groups: { title: string; text: string }[];
}

interface Params {
  service: string;
}

export default function ServicePage(props: { params: Promise<Params> }) {
  const { service } = use<Params>(props.params);
  const otherServicesRef = useRef<HTMLElement>(null);

  const serviceData = ALL_SERVICES_DATA.find(item => item.id === service);
  const otherServices: ServiceCardProps[] = useMemo(() => {
    return ALL_SERVICES_DATA.reduce<ServiceCardProps[]>((acc, curr) => {
      if (curr.id !== service) {
        acc.push({
          name: curr.name,
          breakdown: curr.breakdownSummary,
          href: `/services/${curr.id}`,
          videoUrl: curr.videoUrl,
        });
      }
      return acc;
    }, []);
  }, [service]);

  if (!serviceData) notFound();
  return (
    <MainLayout>
      <CommonHero
        caption={serviceData.name}
        title={serviceData.pageTitle}
        videoURL={serviceData.videoUrl}
        bottomStripBackground="bg-dark"
      />
      <DescriptionTextSection className="bg-dark text-white/80" text={serviceData.description} />
      <ServiceExpertise {...serviceData.expertise} />
      <CTA className="hidden md:flex" />
      <section
        ref={otherServicesRef}
        className="min-h-auto lg:min-h-screen bg-dark flex items-center 
        relative overflow-hidden">
        <WhatWeDo
          customProps={{
            sectionName: 'Other Services',
            services: otherServices,
          }}
        />
      </section>
      <CTA className="md:hidden" />
      <PageSideDecoration caption={serviceData.name} />
      <ServiceScrollManager refsForObserver={[otherServicesRef]} />
    </MainLayout>
  );
}
