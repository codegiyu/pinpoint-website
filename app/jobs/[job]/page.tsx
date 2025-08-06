import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsForm } from '@/components/sections/forms/JobsForm';
import JobDetails, { JobDescription } from '@/components/sections/jobs/JobDetails';
import Footer from '@/components/layout/Footer';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { notFound } from 'next/navigation';
import { getAllJobIds, getJobById } from '@/lib/utils/transform';
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

export async function generateStaticParams() {
  return getAllJobIds();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJobById((await params).job);

  if (!job) return {};

  return {
    title: `${job.title} | Jobs | Pinpoint Global`,
    description: job.description.slice(0, 160),
    openGraph: {
      title: job.title,
      description: job.description,
    },
  };
}

export default async function JobOpportunityPage({ params }: Props) {
  const jobData = getJobById((await params).job);

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
      <Footer />
      <PageSideDecoration caption="JOIN THE TEAM" />
    </MainLayout>
  );
}
