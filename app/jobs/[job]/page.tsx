import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsForm } from '@/components/sections/forms/JobsForm';
import JobDetails, { JobDescription } from '@/components/sections/jobs/JobDetails';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { getJobBySlugOrNull } from '@/lib/api/pinpoint-public';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export interface FullJobProps {
  id: string;
  title: string;
  description: string;
  type: 'list' | 'paragraphs';
  profile: string[];
  offer: string[];
  Ps: string;
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
    openGraph: {
      title: `${job.title} | Jobs`,
      description: job.description,
    },
  } satisfies Metadata;
}

export default async function JobOpportunityPage({ params }: Props) {
  const slug = (await params).job;
  const jobData = await getJobBySlugOrNull(slug);

  if (!jobData) return notFound();

  return (
    <MainLayout pageName={jobData.title}>
      <CommonHero caption="JOIN THE TEAM" title={jobData.title} bottomStripBackground="hidden" />
      <JobDetails
        profile={jobData.profile}
        offer={jobData.offer}
        jobDescription={jobData.jobDescription}
        Ps={jobData.Ps}
      />

      <JobsForm heading={{ text: 'Apply Now' }} formName={jobData.title} />
      <PageSideDecoration caption="JOIN THE TEAM" />
    </MainLayout>
  );
}
