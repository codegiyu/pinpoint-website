'use client';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsCTA } from '@/components/sections/jobs/JobsCTA';
import JobsFooter from '@/components/sections/jobs/JobsFooter';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { jobCards } from '@/lib/constants/texts';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

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

export default function JobsPage() {
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <MainLayout pageName="Jobs" className="pt-6 md:pt-20 lg:pt-0">
      <CommonHero
        caption="JOBS"
        title="Join Pinpoint Global!"
        description={heroDescription}
        videoURL="/videos/jobs-animation.webm"
        bottomStripBackground=""
      />

      {isMobile && (
        <div className="max-w-[900px] text-[clamp(1.3rem,_1.2vw,_2.25rem)] sm:text-[clamp(1.55rem,_1.2vw,_2.25rem)] py-16 pb-0 px-8 sm:px-16 bg-gray-f2 font-light leading-9 sm:leading-12">
          {mobileHeroDescription}
        </div>
      )}
      <div className="pt-[clamp(65px,_4.551vw,_165px)] bg-gray-f2">
        {jobCards.map((card, index) => (
          <JobsCTA {...card} key={index} />
        ))}
      </div>
      <JobsFooter />

      <PageSideDecoration caption="JOBS" />
    </MainLayout>
  );
}
