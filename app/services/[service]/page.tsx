import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { DescriptionTextSection } from '@/components/sections/home/GetToKnowUs';
import { WhatWeDo } from '@/components/sections/home/WhatWeDo';
import { ServiceExpertise } from '@/components/sections/services/Expertise';
import { PackagePricing } from '@/components/sections/services/PackagePricing';
import { RelatedProjects } from '@/components/sections/services/RelatedProjects';
import { ServiceScrollManager } from '@/components/sections/services/ScrollManager';
import { WhatMakesUsUnique } from '@/components/sections/services/WhatMakesUsUnique';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';
import { getServiceBySlugOrNull, listServices } from '@/lib/api/pinpoint-public';
import type { PublicStyleSpec } from '@/lib/api/pinpoint-public-types';
import { mapServicesToSummaryCards } from '@/lib/utils/cms-mappers';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export interface FullServiceData {
  id: string;
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
  menu: {
    image: string;
    stylePreset?: string;
    style?: PublicStyleSpec;
    styleAdvanced?: Record<string, unknown>;
    className?: string;
  };
  packagePricing: ServicePackageGroup[];
}

export interface ServiceExpertiseGroupProps {
  title: string;
  services: string[];
  style?: PublicStyleSpec;
  index?: number;
  isLast?: boolean;
  className?: string;
  layoutClassName?: string;
}

export interface ServicePackageGroup {
  id: string;
  packages: ServicePackage[];
}

export interface ServicePackage {
  id: string;
  priceRange: [number, number] | [number];
  priceSuffix?: string;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).service;
  const service = await getServiceBySlugOrNull(slug);
  if (!service) return {};
  if (service.seo) {
    return metadataFromRouteSeo(service.seo, `${service.name} | Our Services`);
  }
  return {
    title: `${service.name} | Our Services`,
    description: service.description.slice(0, 160),
    keywords: [
      service.name,
      ...service.breakdownSummary,
      ...service.expertise.breakdown.flatMap(s => s.services),
    ],
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
  const slug = (await params).service;
  const [serviceData, { services: allServices }] = await Promise.all([
    getServiceBySlugOrNull(slug),
    listServices(),
  ]);

  if (!serviceData) return notFound();

  const otherServicesCards = mapServicesToSummaryCards(
    allServices.filter(s => s.slug !== serviceData.slug)
  );

  const relatedProjects = serviceData.featuredProjectsForService.map(p => ({
    projectId: p.slug,
    name: p.name,
    image: p.cardImage,
    description: p.pageTitle,
  }));

  const { name, pageTitle, videoUrl, description, expertise, whatMakesUsUnique, packagePricing } =
    serviceData;

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
      <PackagePricing packageGroups={packagePricing} />
      <RelatedProjects projects={relatedProjects.slice(0, 7)} />
      {packagePricing.length === 0 && <CTA className="hidden md:flex" />}
      <section
        id="other-services"
        className="min-h-auto lg:min-h-screen bg-gray-f2 md:bg-dark flex items-center 
        relative overflow-hidden pt-10 md:pt-0">
        <WhatWeDo sectionName="Other Services" services={otherServicesCards} />
      </section>
      {packagePricing.length === 0 && <CTA className="md:hidden" />}
      <PageSideDecoration caption={name} />
      <ServiceScrollManager observerTargetIds={['other-services']} />
    </MainLayout>
  );
}
