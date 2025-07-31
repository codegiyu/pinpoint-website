'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Manipulation, A11y, Pagination, Navigation } from 'swiper/modules';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { memo } from 'react';

export const RelatedProjects = ({ projects }: { projects: RelatedProjectSlideProps[] }) => {
  return (
    <section className="w-full bg-gray-f2 pt-[3.75rem]">
      <div className="pinpoint-container pb-[1.875rem]">
        <h2 className="typo-caption-small uppercase">Related Projects</h2>
      </div>

      <RelatedProjectsSlider projects={projects} />
    </section>
  );
};

export const RelatedProjectsSlider = memo(
  ({ projects, className }: { projects: RelatedProjectSlideProps[]; className?: string }) => {
    return (
      <div className={cn('w-full relative', className)}>
        <Swiper
          modules={[Manipulation, A11y, Pagination, Navigation]}
          mousewheel={true}
          slidesPerView={'auto'}
          speed={1200}
          navigation={{
            prevEl: '#custom-swiper-prev',
            nextEl: '#custom-swiper-next',
          }}
          onSwiper={swiper => {
            // Fix for timing issues to ensures navigation is correctly bound
            setTimeout(() => {
              swiper.navigation?.init();
              swiper.navigation?.update();
            });
          }}
          className="mySwiper w-full h-auto flex items-center justify-start flex-nowrap relative">
          {projects.map((project, idx) => (
            <SwiperSlide
              key={idx}
              className={`!w-[85vw] !max-w-[450px] md:!max-w-none md:!w-[298px] lg:!w-[410px] xl:!w-[528px] !mr-2 md:!mr-4 !transition-all !duration-500 !ease-in-out !relative`}>
              <ProjectSlide {...project} />
            </SwiperSlide>
          ))}
          <SwiperSlide
            className={`!w-[85vw] !max-w-[450px] md:!max-w-none md:!w-[298px] lg:!w-[410px] xl:!w-[528px] !mr-2 md:!mr-4 !transition-all !duration-500 !ease-in-out !relative`}>
            <DiscoverMoreSlide />
          </SwiperSlide>
          <SwiperSlide
            className={`hidden md:block !w-[85vw] !max-w-[450px] md:!max-w-none md:!w-[298px] lg:!w-[410px] xl:!w-[528px] !mr-2 md:!mr-4 !transition-all !duration-500 !ease-in-out !relative`}
          />
        </Swiper>

        <div className="nav-btns-wrapper hidden md:block lg:absolute lg:top-[-105px] xl:relative xl:top-0 w-full mt-[34px]">
          <div className="nav-btns-container pinpoint-container flex items-center justify-end gap-2 relative">
            <GhostBtn
              id="custom-swiper-prev"
              LucideIcon={MoveLeft}
              iconClass="size-4 text-dark/75 scale-120"
              className="size-[52px] rounded-full grid place-items-center border border-[silver] hover:border-dark disabled:opacity-50"
            />
            <GhostBtn
              id="custom-swiper-next"
              LucideIcon={MoveRight}
              iconClass="size-4 text-dark/75 scale-120"
              className="size-[52px] rounded-full grid place-items-center border border-[silver] hover:border-dark disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    );
  }
);
RelatedProjectsSlider.displayName = 'RelatedProjectsSlider';

export interface RelatedProjectSlideProps {
  name: string;
  description: string;
  image: string;
  projectId: string;
}

export const ProjectSlide = ({ name, description, image, projectId }: RelatedProjectSlideProps) => {
  return (
    <GhostBtn
      linkProps={{ href: `/projects/${projectId}` }}
      className="w-full"
      wrapClassName="group">
      <div className="w-full relative">
        <div className="w-full h-[60vw] md:h-[200px] lg:h-[280px] xl:h-[clamp(354px,_26.418vw,_442px)]">
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src={image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              fill
            />
          </div>
        </div>
        <div
          className="w-full min-h-[200px] xl:min-h-0 xl:h-full xl:absolute xl:inset-0 xl:opacity-0 
          group-hover:opacity-100 bg-white xl:bg-dark/60 xl:grid xl:place-items-center 
          p-[26px_6.875vw_36px] md:p-[30px_28px_58px] relative transition-all duration-500 ease-out">
          <div
            className="w-full h-fit grid gap-3 xl:gap-[1.375rem] text-start 
            group-hover:-translate-y-2 xl:translate-y-12 xl:group-hover:translate-y-0 
            transition-all duration-500 ease-out">
            <h3 className="md:hidden typo-h3 text-wrap break-words">{name}</h3>
            <h3 className="hidden md:block typo-caption-small uppercase tracking-[0.035em] xl:text-white">
              {name}
            </h3>
            <p
              className="typo-body-2 text-gray-66/80 md:text-dark xl:text-white 
              md:font-semibold md:leading-[1.4] md:tracking-[0] text-wrap break-words">
              {description}
            </p>
          </div>
          <div className="size-[3.125rem] xl:hidden grid place-items-center absolute bottom-2 right-3">
            <MoveRight className="size-5 text-dark stroke-[1.5]" />
          </div>
        </div>
      </div>
    </GhostBtn>
  );
};

const DiscoverMoreSlide = () => {
  return (
    <GhostBtn linkProps={{ href: `/our-works` }} className="w-full" wrapClassName="group">
      <div className="w-full xl:h-[clamp(354px,_26.418vw,_442px)] bg-dark text-white flex flex-col justify-between relative xl:p-[clamp(46px,_3.433vw,_58px)]">
        <div className="w-full h-[60vw] md:h-[200px] lg:h-[280px] xl:h-auto typo-body-6 text-start pt-10 px-6 xl:pt-0 xl:px-0">
          <p className="">Still hungry ?</p>
          <p className="text-wrap break-words">
            Discover other projects completed for our clients.
          </p>
        </div>
        <div className="w-full min-h-[200px] xl:min-h-auto flex items-end px-6 pb-9 xl:px-0 xl:pb-0">
          <div
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'default', typo: 'default' }),
              'after:border-white group-hover:bg-white text-white group-hover:text-dark mx-auto'
            )}>
            <span className="xl:px-[0.9375rem]">Discover More</span>
          </div>
        </div>
      </div>
    </GhostBtn>
  );
};
