import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsCTA } from '@/components/sections/jobs/JobsCTA';
import JobsFooter from '@/components/sections/jobs/JobsFooter';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { getJobCards } from '@/lib/utils/transform';
import { Metadata } from 'next';

const heroDescription = (
  <>
    <p>Do you have tremendous creativity but don&apos;t know what to do with it? Do you still</p>
    <p>have the soul of a child and take real pleasure in transforming things into real</p>
    <p className="md:text-wrap">applications? Do you play FIFA a lot? Join Pinpoint Global!</p>
  </>
);
const mobileHeroDescription = (
  <>
    <p>
      Do you have tremendous creativity but don&apos;t know what to do with it? Do you still have
      the soul of a child and take real pleasure in transforming things into real applications? Do
      you play FIFA a lot? Join Pinpoint Global!
    </p>
  </>
);

export const metadata: Metadata = {
  title: 'Jobs',
};

export default function JobsPage() {
  const jobCards = getJobCards();

  return (
    <MainLayout pageName="Jobs" className="pt-6 md:pt-20 lg:pt-0">
      <CommonHero
        caption="JOBS"
        title="Join Pinpoint Global!"
        description={heroDescription}
        videoURL="https://static.pinpoint.ng/videos/jobs-animation.webm"
        bottomStripBackground=""
      />

      <div className="block md:hidden max-w-[900px] text-[clamp(10px,_1.2vw,_17px)] sm:text-[clamp(1.55rem,_1.2vw,_2.25rem)] py-16 pb-0 px-8 sm:px-16 bg-gray-f2 font-light leading-9 sm:leading-12 relative z-[5]">
        {mobileHeroDescription}
      </div>

      <div className="pt-[clamp(65px,_4.551vw,_165px)] bg-gray-f2 relative z-[5]">
        {jobCards.length ? (
          <>
            {jobCards.map((card, index) => (
              <JobsCTA {...card} index={index} key={index} />
            ))}
          </>
        ) : (
          <div className="w-full py-10">
            <p className="typo-body-7 text-66 text-center">No open positions available</p>
          </div>
        )}
      </div>
      <JobsFooter />

      <PageSideDecoration caption="JOBS" />
    </MainLayout>
  );
}
