'use client';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { ALL_JOBS_DATA } from '@/lib/constants/texts';
import { notFound, useParams } from 'next/navigation';

export default function JobOpportunityPage() {
  const { job } = useParams();

  const jobData = ALL_JOBS_DATA.find(data => data.id === job);

  if (!jobData) notFound();

  return (
    <>
      <CommonHero caption="JOIN THE TEAM" title={jobData.title} />
    </>
  );
}
