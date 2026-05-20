import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsForm } from '@/components/sections/forms/JobsForm';
import JobDetails, { JobDescription } from '@/components/sections/jobs/JobDetails';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { getJobBySlugOrNull } from '@/lib/api/pinpoint-public';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { formatSlugToText } from '@/lib/utils/general';

export interface FullJobProps {
  id: string;
  title: string;
  description: string;
  type: 'list' | 'paragraphs';
  profile: string[];
  offer: string[];
  Ps: string;
  flyerImage?: string;
  bannerImage?: string;
  jobDescription: JobDescription[];
}

interface Props {
  params: Promise<{
    job: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).job;
  const job = await getJobBySlugOrNull(slug);

  if (!job) return {};

  if (job.seo) {
    return metadataFromRouteSeo(job.seo, `${job.title} | Jobs`);
  }

  return {
    title: `${job.title} | Jobs`,
    description: job.description.slice(0, 160),
    keywords: [job.title, formatSlugToText(job.slug).toLowerCase(), ...job.profile],
  };
}

export default async function JobOpportunityPage({ params }: Props) {
  const slug = (await params).job;
  const jobData = await getJobBySlugOrNull(slug);

  if (!jobData) return notFound();

  const heroProps = jobData.bannerImage
    ? ({
        caption: 'JOIN THE TEAM',
        title: jobData.title,
        bottomStripBackground: 'hidden',
        imageProps: {
          src: jobData.bannerImage,
          alt: jobData.title,
          priority: true,
        },
      } as const)
    : ({
        caption: 'JOIN THE TEAM',
        title: jobData.title,
        bottomStripBackground: 'hidden',
      } as const);

  return (
    <MainLayout pageName={jobData.title}>
      <CommonHero {...heroProps} />
      <JobDetails
        profile={jobData.profile}
        offer={jobData.offer}
        jobDescription={jobData.jobDescription}
        Ps={jobData.Ps}
      />

      <JobsForm heading={{ text: 'Apply Now' }} formName={jobData.title} jobSlug={jobData.slug} />
      <PageSideDecoration caption="JOIN THE TEAM" />
    </MainLayout>
  );
}
