'use client';

import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ALL_PROJECTS_DATA } from '@/lib/constants/texts';
import { ImageOrVideoURL } from '@/lib/types/general';
import { notFound } from 'next/navigation';
import { use } from 'react';

export interface FullProjectData {
  id: string;
  name: string;
  pageTitle: string;
  descSummary: string;
  bannerURL: ImageOrVideoURL;
  cardImage: string;
  descriptionBg?: string;
  description: string;
  services: string[];
  extraServices: string[];
  sectors: string[];
}

interface Params {
  projectId: string;
}

export default function ServicePage(props: { params: Promise<Params> }) {
  const { projectId } = use<Params>(props.params);

  const projectData = ALL_PROJECTS_DATA.find(item => item.id === projectId);

  if (!projectData) notFound();
  return (
    <MainLayout pageName={projectData.name}>
      <CommonHero
        caption={projectData.name}
        title={projectData.pageTitle}
        {...(projectData.bannerURL.image
          ? { imageProps: { src: projectData.bannerURL.image, alt: '' } }
          : { videoURL: projectData.bannerURL.video as string })}
        bottomStripBackground={projectData.descriptionBg}
      />
      {/* <RelatedProjects /> */}
      <PageSideDecoration caption={projectData.name} />
    </MainLayout>
  );
}
