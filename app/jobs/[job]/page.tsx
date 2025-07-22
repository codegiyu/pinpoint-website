'use client';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ALL_JOBS_DATA } from '@/lib/constants/texts';
import { notFound, useParams } from 'next/navigation';

export default function JobOpportunityPage() {
  const { job } = useParams();

  const jobData = ALL_JOBS_DATA.find(data => data.id === job);

  if (!jobData) notFound();

  return (
    <MainLayout>
      <CommonHero caption="JOIN THE TEAM" title={jobData.title} />
      <PageSideDecoration caption="Join the team" />
    </MainLayout>
  );
}
