import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { DescriptionTextSection } from '@/components/sections/home/GetToKnowUs';
import { WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { ServiceExpertise } from '@/components/sections/services/Expertise';
import { RelatedProjects } from '@/components/sections/services/RelatedProjects';
import { ServiceScrollManager } from '@/components/sections/services/ScrollManager';
import { WhatMakesUsUnique } from '@/components/sections/services/WhatMakesUsUnique';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';
import { AvailablePackagedService, AvailableService } from '@/lib/constants/texts';
import { getAllServiceIds, getServiceById } from '@/lib/utils/transform';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export interface FullServiceData {
  id: AvailableService;
  name: string;
  pageTitle: string;
  videoUrl: string;
  posterUrl: string;
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

export interface ServicePackageGroup {
  id: AvailablePackagedService;
  name: string;
  packages: ServicePackage[];
}

export interface ServicePackage {
  id: string;
  name: string;
  priceRange: [number, number];
  benefits: string[];
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

interface Props {
  params: Promise<{
    service: string;
  }>;
}

export async function generateStaticParams() {
  return getAllServiceIds();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceById((await params).service);

  if (!service) return {};

  return {
    title: `${service.name} | Our Services`,
    description: service.description.slice(0, 160),
    openGraph: {
      title: `${service.name} | Our Services`,
      description: service.description,
      images: [service.posterUrl],
    },
    twitter: {
      images: service.posterUrl,
    },
  } satisfies Metadata;
}

export default async function ServicePage({ params }: Props) {
  const serviceData = getServiceById((await params).service);

  if (!serviceData) return notFound();

  const {
    name,
    pageTitle,
    videoUrl,
    description,
    expertise,
    whatMakesUsUnique,
    relatedProjects,
    otherServices,
  } = serviceData;

  return (
    <MainLayout pageName={name}>
      <CommonHero
        caption={name}
        title={pageTitle}
        videoURL={videoUrl}
        bottomStripBackground="bg-dark"
      />
      <DescriptionTextSection className="bg-dark text-white/80" text={description} />
      <ServiceExpertise {...expertise} />
      <WhatMakesUsUnique {...whatMakesUsUnique} />
      <RelatedProjects projects={relatedProjects.slice(0, 7)} />
      <CTA className="hidden md:flex" />
      <section
        id="other-services"
        className="min-h-auto lg:min-h-screen bg-gray-f2 md:bg-dark flex items-center 
        relative overflow-hidden pt-10 md:pt-0">
        <WhatWeDo sectionName="Other Services" services={otherServices} />
      </section>
      <CTA className="md:hidden" />
      <PageSideDecoration caption={name} />
      <ServiceScrollManager observerTargetIds={['other-services']} />
    </MainLayout>
  );
}
