import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ProjectIntroduction } from '@/components/sections/works/ProjectIntroduction';
import { RelatedProjects } from '@/components/sections/works/RelatedProjects';
import { RenderedService } from '@/components/sections/works/RenderedService';
import { RelatedProjectSlideProps } from '@/components/sections/services/RelatedProjects';
import { getProjectBySlugOrNull, listServices } from '@/lib/api/pinpoint-public';
import type { PublicStyleSpec } from '@/lib/api/pinpoint-public-types';
import { ImageOrVideoURL } from '@/lib/types/general';
import { formatSlugToText } from '@/lib/utils/general';
import {
  buildServiceBreakdown,
  buildServicesLookup,
  mapPublicProjectToFullData,
} from '@/lib/utils/cms-mappers';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';

export interface FullProjectData {
  id: string;
  name: string;
  pageTitle: string;
  descSummary: string;
  bannerURL: ImageOrVideoURL;
  cardImage: string;
  descriptionBg?: string;
  descriptionStyle?: PublicStyleSpec;
  textColorClass?: string;
  textStyle?: PublicStyleSpec;
  descriptionHighlightPhotos: RenderedServiceProps['images'];
  description: string;
  services: string[];
  extraServices: string[];
  sectors: string[];
  createdWebsite: string;
  renderedServices: RenderedServiceProps[];
  relatedProjects: RelatedProjectSlideProps[];
  keywords?: string[];
  serviceBreakdown?: { href: string; text: string }[];
}

export interface RenderedServiceProps {
  index?: string;
  caption: string;
  title: string;
  description: string[][];
  sectionBg: string;
  textColorClass?: string;
  textStyle?: PublicStyleSpec;
  images: (ComponentPropsWithoutRef<'img'> & { alt: string; styleSpec?: PublicStyleSpec })[];
}

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).projectId;
  const project = await getProjectBySlugOrNull(slug);

  if (!project) return {};

  const projectSEO = project.seo
    ? metadataFromRouteSeo(project.seo, `${project.name} | Our Works`)
    : null;

  return {
    title: projectSEO?.title ?? `${project.name} | Our Works`,
    description: projectSEO?.description ?? project.description.slice(0, 160),
    keywords:
      (projectSEO?.keywords ?? []).length > 0
        ? projectSEO?.keywords
        : [
            project.name,
            formatSlugToText(project.slug).toLowerCase(),
            ...(project.keywords ?? []),
            ...project.extraServices,
            ...project.services.map(item => formatSlugToText(item).toLowerCase()),
          ],
    openGraph: {
      title: projectSEO?.title ?? `${project.name} | Our Works`,
      description: projectSEO?.description ?? project.description,
      images: [project.cardImage],
    },
    twitter: {
      title: projectSEO?.title ?? `${project.name} | Our Works`,
      description: projectSEO?.description ?? project.description,
      images: project.cardImage,
    },
  } satisfies Metadata;
}

export default async function ProjectPage({ params }: Props) {
  const slug = (await params).projectId;
  const [project, { services }] = await Promise.all([getProjectBySlugOrNull(slug), listServices()]);

  if (!project) return notFound();

  const lookup = buildServicesLookup(services);
  const breakdown = buildServiceBreakdown(project, lookup);

  const relatedSlides: RelatedProjectSlideProps[] = [];
  for (const relSlug of project.relatedProjects) {
    const rel = await getProjectBySlugOrNull(relSlug);
    if (rel) {
      relatedSlides.push({
        projectId: rel.slug,
        name: rel.name,
        image: rel.cardImage,
        description: rel.pageTitle,
      });
    }
  }

  const projectData = mapPublicProjectToFullData(project, relatedSlides, breakdown);

  const {
    name,
    pageTitle,
    bannerURL,
    descriptionBg,
    descriptionStyle,
    textColorClass,
    textStyle,
    descriptionHighlightPhotos,
    description,
    serviceBreakdown,
    extraServices,
    createdWebsite,
    renderedServices,
    relatedProjects,
  } = projectData;

  return (
    <MainLayout pageName={name}>
      <CommonHero
        caption={name}
        title={pageTitle}
        {...(bannerURL.image
          ? { imageProps: { src: bannerURL.image, alt: '' } }
          : { videoURL: bannerURL.video as string })}
        bottomStripBackground={descriptionBg}
      />
      <ProjectIntroduction
        {...{
          description,
          descriptionBg,
          descriptionStyle,
          descriptionHighlightPhotos,
          serviceBreakdown: serviceBreakdown ?? [],
          extraServices,
          createdWebsite,
          textColorClass,
          textStyle,
        }}
      />
      {renderedServices.map((item, idx) => (
        <RenderedService key={idx} {...item} index={String(idx + 1).padStart(2, '0')} />
      ))}
      <RelatedProjects projects={relatedProjects} />
      <PageSideDecoration caption={projectData.name} />
    </MainLayout>
  );
}
