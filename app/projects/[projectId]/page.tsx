'use client';

import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ProjectIntroduction } from '@/components/sections/works/ProjectIntroduction';
import { RelatedProjects } from '@/components/sections/works/RelatedProjects';
import { RenderedService } from '@/components/sections/works/RenderedService';
import { ALL_PROJECTS_DATA, AvailableService } from '@/lib/constants/texts';
import { ImageOrVideoURL } from '@/lib/types/general';
import { notFound } from 'next/navigation';
import { ComponentPropsWithoutRef, use, useMemo } from 'react';

export interface FullProjectData {
  id: string;
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

interface Params {
  projectId: string;
}

export default function ServicePage(props: { params: Promise<Params> }) {
  const { projectId } = use<Params>(props.params);

  const projectData = ALL_PROJECTS_DATA.find(item => item.id === projectId);

  const relatedProjects = useMemo(() => {
    return ALL_PROJECTS_DATA.slice(0, 2).map(project => ({
      projectId: project.id,
      name: project.name,
      image: project.cardImage,
      description: project.pageTitle,
    }));
  }, []);

  if (!projectData) notFound();

  const {
    name,
    pageTitle,
    bannerURL,
    descriptionBg,
    textColorClass,
    descriptionHighlightPhotos,
    description,
    services,
    extraServices,
    createdWebsite,
    renderedServices,
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
          services,
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
