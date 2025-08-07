import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ProjectIntroduction } from '@/components/sections/works/ProjectIntroduction';
import { RelatedProjects } from '@/components/sections/works/RelatedProjects';
import { RenderedService } from '@/components/sections/works/RenderedService';
import { AvailableProject, AvailableService } from '@/lib/constants/texts';
import { ImageOrVideoURL } from '@/lib/types/general';
import { getAllProjectIds, getProjectById } from '@/lib/utils/transform';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';

export interface FullProjectData {
  id: AvailableProject;
  name: string;
  pageTitle: string;
  descSummary: string;
  bannerURL: ImageOrVideoURL;
  cardImage: string;
  descriptionBg: string;
  textColorClass: string;
  descriptionHighlightPhotos: string[];
  description: string;
  services: AvailableService[];
  extraServices: string[];
  sectors: string[];
  createdWebsite: string;
  renderedServices: RenderedServiceProps[];
  relatedProjects: AvailableProject[];
}

export interface RenderedServiceProps {
  index?: string;
  caption: string;
  title: string;
  description: string[][];
  sectionBg: string;
  textColorClass: string;
  images: (ComponentPropsWithoutRef<'img'> & { alt: string })[];
}

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateStaticParams() {
  return getAllProjectIds();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById((await params).projectId);

  if (!project) return {};

  return {
    title: `${project.name} | Our Works`,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.name} | Our Works`,
      description: project.description,
      images: [project.cardImage],
    },
    twitter: {
      images: project.cardImage,
    },
  } satisfies Metadata;
}

export default async function ProjectPage({ params }: Props) {
  const projectData = getProjectById((await params).projectId);

  if (!projectData) return notFound();

  const {
    name,
    pageTitle,
    bannerURL,
    descriptionBg,
    textColorClass,
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
          descriptionHighlightPhotos,
          serviceBreakdown,
          extraServices,
          createdWebsite,
          textColorClass,
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
