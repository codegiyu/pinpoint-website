'use client';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsForm } from '@/components/sections/forms/JobsForm';
import JobDetails, { JobDescription } from '@/components/sections/jobs/JobDetails';
import Footer from '@/components/layout/Footer';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ALL_JOBS_DATA } from '@/lib/constants/texts';
import { notFound, useParams } from 'next/navigation';

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

export default function JobOpportunityPage() {
  const { job } = useParams();

  const jobData = ALL_JOBS_DATA.find(data => data.id === job);

  if (!jobData) notFound();

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
