import type { CaseStudySummaryProps } from '@/components/sections/home/CaseStudies';
import type { ImageOrVideoURL } from '@/lib/types/general';
import type { ServiceCardProps } from '@/components/sections/home/WhatWeDo';
import type { WorkCardProps } from '@/components/sections/works/WorksDisplay';
import type { JobsCTAProps } from '@/components/sections/jobs/JobsCTA';
import type { RelatedProjectSlideProps } from '@/components/sections/services/RelatedProjects';
import type { FullProjectData, RenderedServiceProps } from '@/app/projects/[projectId]/page';
import type { PublicProject, PublicService } from '@/lib/api/pinpoint-public-types';
import { formatSlugToText } from '@/lib/utils/general';

/** Package dropdown lines for project request forms (was sync transform + static services). */
export function getPackageOptionsForServiceSync(
  services: PublicService[],
  packagedId: string,
  groupSlug: string
): string[] {
  const service = services.find(s => s.slug === groupSlug);

  if (!service) return [];

  const packageGroup = service.packagePricing.find(item => item.id === packagedId);

  if (!packageGroup) return [];

  return packageGroup.packages.map(item => {
    const low = '₦ ' + item.priceRange[0].toLocaleString();
    const high = item.priceRange[1] != null ? '₦ ' + item.priceRange[1].toLocaleString() : '';

    const range =
      item.priceRange.length > 1 && item.priceRange[1] != null ? `${low}  ->  ${high}` : low;

    return `${formatSlugToText(item.id)} (${range}${item.priceSuffix ?? ''})`;
  });
}

export function buildServicesLookup(services: PublicService[]): Record<string, string> {
  return services.reduce<Record<string, string>>((acc, s) => {
    acc[s.slug] = s.name;
    return acc;
  }, {});
}

export function mapServicesToSummaryCards(services: PublicService[]): ServiceCardProps[] {
  return services.map((service, idx, arr) => ({
    name: service.name,
    breakdown: service.breakdownSummary,
    href: `/services/${service.slug}`,
    videoUrl: service.videoUrl,
    posterUrl: service.posterUrl,
    isLast: idx === arr.length - 1,
  }));
}

export function mapPublicProjectToWorkCard(
  project: PublicProject,
  servicesLookup: Record<string, string>
): WorkCardProps {
  let servicesListString = '';
  project.services.forEach((slug, idx, arr) => {
    const label = servicesLookup[slug] ?? formatSlugToText(slug);
    servicesListString += `${label}${idx < arr.length - 1 ? ' | ' : ''}`;
  });

  return {
    id: project.slug,
    name: project.name,
    image: project.cardImage,
    services: project.services,
    servicesListString,
    extraServices: project.extraServices,
    sectors: project.sectors,
  };
}

export function mapFeaturedToCaseStudies(
  featured: PublicProject[]
): Omit<CaseStudySummaryProps, 'index'>[] {
  return featured.map((project, index) => ({
    id: project.slug,
    title: project.name,
    description: project.descSummary,
    img: project.cardImage,
    imgOnRight: index % 2 === 1,
  }));
}

export function mapRenderedServicesFromApi(
  items: PublicProject['renderedServices']
): RenderedServiceProps[] {
  return items.map(rs => ({
    caption: rs.caption,
    title: rs.title,
    description: rs.description,
    sectionBg: rs.sectionBg,
    textColorClass: rs.textColorClass,
    textStyle: rs.textStyle,
    images: rs.images.map(img => ({
      src: img.src,
      alt: img.alt,
      className: img.className,
      styleSpec: img.style,
      width: img.width,
      height: img.height,
    })),
  }));
}

export function mapPublicProjectToFullData(
  project: PublicProject,
  relatedSlides: RelatedProjectSlideProps[],
  serviceBreakdown: { href: string; text: string }[]
): FullProjectData {
  return {
    id: project.slug,
    name: project.name,
    pageTitle: project.pageTitle,
    descSummary: project.descSummary,
    bannerURL: project.bannerURL as ImageOrVideoURL,
    cardImage: project.cardImage,
    descriptionBg: project.descriptionBg,
    descriptionStyle: project.descriptionStyle,
    textColorClass: project.textColorClass,
    textStyle: project.textStyle,
    descriptionHighlightPhotos: project.descriptionHighlightPhotos.map(photo => ({
      src: photo.src,
      alt: photo.alt,
      className: photo.className,
      styleSpec: photo.style,
      width: photo.width,
      height: photo.height,
    })),
    description: project.description,
    services: project.services,
    extraServices: project.extraServices,
    sectors: project.sectors,
    createdWebsite: project.createdWebsite,
    renderedServices: mapRenderedServicesFromApi(project.renderedServices),
    relatedProjects: relatedSlides,
    keywords: project.keywords,
    serviceBreakdown: serviceBreakdown.length ? serviceBreakdown : project.serviceBreakdown,
  };
}

export function buildServiceBreakdown(
  project: PublicProject,
  servicesLookup: Record<string, string>
): { href: string; text: string }[] {
  return project.services.map(slug => ({
    href: `/services/${slug}`,
    text: servicesLookup[slug] ?? formatSlugToText(slug),
  }));
}

export function mapJobToCard(job: {
  slug: string;
  title: string;
  description: string;
  flyerImage?: string;
}): JobsCTAProps {
  return {
    title: job.title,
    description: job.description,
    href: `/jobs/${job.slug}`,
    ...(job.flyerImage?.trim() ? { flyerImage: job.flyerImage.trim() } : {}),
  };
}

export function mapTeamMemberToSlide(member: {
  name: string;
  title: string;
  mainImage: string;
  subImage: string;
}) {
  return {
    name: member.name,
    title: member.title,
    mainImage: member.mainImage,
    subImage: member.subImage,
  };
}

export function getAllIndividualServicesFromCatalog(services: PublicService[]): string[] {
  return [
    "I'm just making enquiries",
    ...services.flatMap(service => service.expertise.breakdown.flatMap(item => item.services)),
  ].sort();
}

export function getPackagedServicesListFromAllowed(allowedIds: string[]): string[] {
  return allowedIds.filter(
    item => !new Set(['make_a_custom_request', 'make_an_enquiry']).has(item)
  );
}
