import { MainLayout } from '@/components/layout/MainLayout';
import { JobsForm } from '@/components/sections/forms/JobsForm';
import JobsDetailsFooter from '@/components/sections/jobs/JobsDetailsFooter';

export default function JoinOurTeamPage() {
  return (
    <MainLayout>
      <div className="pt-30 pinpoint-container ">
        <JobsForm
          heading={{
            text: `Spontaneous application`,
            className: 'text-[2.75rem] md:typo-h1 2xl:text-[5rem] 2xl:text-wrap 2xl:w-1/2',
          }}
          description="Send your CV"
          useFirstRef={true}
        />
      </div>
      <JobsDetailsFooter />
    </MainLayout>
  );
}
