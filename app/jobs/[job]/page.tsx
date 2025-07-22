'use client';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
// import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import JobDetails from '@/components/sections/jobs/JobDetails';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ALL_JOBS_DATA } from '@/lib/constants/texts';
import { notFound, useParams } from 'next/navigation';

export default function JobOpportunityPage() {
  const { job } = useParams();

  const jobData = ALL_JOBS_DATA.find(data => data.id === job);
  console.log({ jobData });
  if (!jobData) notFound();

  return (
    <MainLayout>
      <CommonHero caption="JOIN THE TEAM" title={jobData.title} bottomStripBackground="hidden" />
      <JobDetails
        profile={jobData.profile}
        offer={jobData.offer}
        jobDescription={jobData.jobDescription}
        PS={jobData.PS}
      />
      {/* <ProjectRequestForm /> */}
      <PageSideDecoration caption="JOIN THE TEAM" />
    </MainLayout>
  );
}
