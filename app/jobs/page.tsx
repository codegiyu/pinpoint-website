import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsCTA } from '@/components/sections/jobs/JobsCTA';
import JobsFooter from '@/components/sections/jobs/JobsFooter';
import { CommonHero } from '@/components/sections/shared/CommonHero';

const jobsPageCardsData = [
  {
    title: 'Interactive and resourceful front-end developer',
    description:
      'We are looking for a committed person, passionate about product and design, who develops interfaces with eye and rigor in order to take the lead on certain projects.',
    btnText: 'Discover the oppportunity',
    href: '#',
  },
  {
    title: 'Interactive and resourceful front-end developer',
    description:
      'We are looking for a committed person, passionate about product and design, who develops interfaces with eye and rigor in order to take the lead on certain projects.',
    btnText: 'Discover the oppportunity',
    href: '#',
  },
  {
    title: 'Internship in development, communication or project management',
    description:
      'We gladly welcome interns who are looking for experience in the field of web development, communication or project management.',
    btnText: 'Discover the oppportunity',
    href: '#',
  },
];

export default function JobsPage() {
  return (
    <>
      <MainLayout>
        <CommonHero
          caption="JOBS"
          title="Join the Atelier!"
          description="Join"
          videoProps={{ src: '/videos/jobs-animation.webm' }}
        />
        <div className="pt-[clamp(76px,_4.551vw,_165px)] bg-gray-f2">
          {jobsPageCardsData.map((card, index) => (
            <JobsCTA {...card} key={index} />
          ))}
        </div>
        <JobsFooter />

        <PageSideDecoration caption="JOBS" />
      </MainLayout>
    </>
  );
}
