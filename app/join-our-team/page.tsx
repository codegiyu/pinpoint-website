import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsForm } from '@/components/sections/forms/JobsForm';
import JobsDetailsFooter from '@/components/sections/jobs/JobsDetailsFooter';

export default function JoinOurTeamPage() {
  return (
    <MainLayout pageName="Spontaneous Application">
      <div className="pt-30 pinpoint-container ">
        <JobsForm
          heading={{
            text: `Spontaneous application`,
            className:
              'text-[calc(8.1888888889vw_+_3.5555555556px)] md:text-[calc(10.1556px_+_3.89105vw)] \
              lg:text-[clamp(-5.85455px_+_5vw,_50%,_-5.85455px_+_6vw)] \
              xl:text-[clamp(71px,_4.733vw,_88px)] leading-[1.2] md:leading-[1.1] \
              lg:leading-[clamp(-9px_+_6.3vw,_54%,_-9px_+_8.1vw)] xl:leading-[1.25] \
              tracking-[0] font-medium',
          }}
          description="Send your CV"
          formName="Spontaneous Application"
        />
      </div>
      <JobsDetailsFooter />
      <PageSideDecoration caption="Join our team" />
    </MainLayout>
  );
}
