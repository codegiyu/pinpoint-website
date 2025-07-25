'use client';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsCTA } from '@/components/sections/jobs/JobsCTA';
import JobsFooter from '@/components/sections/jobs/JobsFooter';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

const jobsPageCardsData = [
  {
    title: 'Interactive and resourceful front-end developer',
    description:
      'We are looking for a committed person, passionate about product and design, who develops interfaces with eye and rigor in order to take the lead on certain projects.',
    btnText: 'Discover the oppportunity',
    href: '/jobs/interactive-and-resourceful-front-end-developer',
  },
  {
    title: 'Interactive and resourceful front-end developer',
    description:
      'We are looking for a committed person, passionate about product and design, who develops interfaces with eye and rigor in order to take the lead on certain projects.',
    btnText: 'Discover the oppportunity',
    href: '/jobs/interactive-and-resourceful-front-end-developer',
  },
  {
    title: 'Internship in development, communication or project management',
    description:
      'We gladly welcome interns who are looking for experience in the field of web development, communication or project management.',
    btnText: 'Discover the oppportunity',
    href: '/jobs/internship-in-development-communication-or-project-management',
  },
];

const heroDescription = (
  <>
    <p>Do you have tremendous creativity but don&apos;t know what to do with it? Do you still</p>
    <p>have the soul of a child and take real pleasure in transforming things into real</p>
    <p className="md:text-wrap">
      applications? Do you drink a lot of coffee? Join the Atelier ! (we also accept tea-drinkers.)
    </p>
  </>
);
const mobileHeroDescription = (
  <>
    <p>
      Do you have tremendous creativity but don&apos;t know what to do with it? Do you still have
      the soul of a child and take real pleasure in transforming things into real applications? Do
      you drink a lot of coffee? Join the Atelier ! (we also accept tea-drinkers.)
    </p>
  </>
);

export default function JobsPage() {
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <MainLayout pageName="Jobs" className="pt-6 md:pt-20 lg:pt-0">
      <CommonHero
        caption="JOBS"
        title="Join the Atelier!"
        description={heroDescription}
        videoURL="/videos/jobs-animation.webm"
        bottomStripBackground="hidden"
      />

      {isMobile && (
        <div className="max-w-[900px] text-[clamp(1.3rem,_1.2vw,_2.25rem)] sm:text-[clamp(1.55rem,_1.2vw,_2.25rem)] py-16 pb-0 px-8 sm:px-16 bg-gray-f2 font-light leading-9 sm:leading-12">
          {mobileHeroDescription}
        </div>
      )}
      <div className="pt-[clamp(65px,_4.551vw,_165px)] bg-gray-f2">
        {jobsPageCardsData.map((card, index) => (
          <JobsCTA {...card} key={index} />
        ))}
      </div>
      <JobsFooter />

      <PageSideDecoration caption="JOBS" />
    </MainLayout>
  );
}
