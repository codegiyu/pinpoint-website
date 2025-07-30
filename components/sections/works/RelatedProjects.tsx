'use client';

import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import {
  ProjectSlide,
  RelatedProjectSlideProps,
  RelatedProjectsSlider,
} from '../services/RelatedProjects';

export const RelatedProjects = ({ projects }: { projects: RelatedProjectSlideProps[] }) => {
  return (
    <section className="w-full bg-gray-f2 py-[3.75rem] md:py-[6.75rem] lg:py-[8.375rem] xl:[9.375rem]">
      <div className="pinpoint-container pb-9 md:pb-14">
        <h2 className="typo-h2-cta text-center">Other projects</h2>
      </div>

      <RelatedProjectsSlider projects={projects} className="md:hidden mb-10" />
      <div className="pinpoint-container h-fit hidden md:grid gap-16">
        <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
          {projects[0] && <ProjectSlide {...projects[0]} />}
          {projects[1] && <ProjectSlide {...projects[1]} />}
        </div>
        <div className="w-full flex justify-center">
          <PinpointBtn
            variant="secondary"
            linkProps={{ href: '/our-works' }}
            text="View all projects"
            animate
          />
        </div>
      </div>
    </section>
  );
};
