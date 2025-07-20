'use client';

import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { DescriptionTextSection } from '@/components/sections/home/GetToKnowUs';
import { ServiceCardProps, WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { ServiceExpertise } from '@/components/sections/services/Expertise';
import {
  RelatedProjects,
  RelatedProjectSlideProps,
} from '@/components/sections/services/RelatedProjects';
import { ServiceScrollManager } from '@/components/sections/services/ScrollManager';
import { WhatMakesUsUnique } from '@/components/sections/services/WhatMakesUsUnique';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';
import { ALL_SERVICES_DATA, ALL_PROJECTS_DATA } from '@/lib/constants/texts';
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
  className?: string;
}

export interface WhatMakesUsUniqueProps {
  title: string;
  groups: UniqueGroupProps[];
}

export interface UniqueGroupProps {
  title: string;
  text: string;
  isLast?: boolean;
}

interface Params {
  service: string;
}

export default function ServicePage(props: { params: Promise<Params> }) {
  const { service } = use<Params>(props.params);
  const otherServicesRef = useRef<HTMLElement>(null);

  const serviceData = ALL_SERVICES_DATA.find(item => item.id === service);

  const { otherServices, relatedProjects } = useMemo(() => {
    const otherServices = ALL_SERVICES_DATA.reduce<ServiceCardProps[]>((acc, curr) => {
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

    const relatedProjects = ALL_PROJECTS_DATA.reduce<RelatedProjectSlideProps[]>((acc, curr) => {
      if (serviceData && curr.services.includes(serviceData.name)) {
        acc.push({
          projectId: curr.id,
          name: curr.name,
          image: curr.cardImage,
          description: curr.pageTitle,
        });
      }

      return acc;
    }, []);

    return { otherServices, relatedProjects };
  }, [service, serviceData]);

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
      <WhatMakesUsUnique {...serviceData.whatMakesUsUnique} />
      <RelatedProjects projects={relatedProjects.slice(0, 7)} />
      <CTA className="hidden md:flex" />
      <section
        ref={otherServicesRef}
        className="min-h-auto lg:min-h-screen bg-gray-f2 md:bg-dark flex items-center 
        relative overflow-hidden pt-10 md:pt-0">
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
