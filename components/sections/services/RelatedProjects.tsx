'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Mousewheel,
  Manipulation,
  A11y,
  Pagination,
  Parallax,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

export const RelatedProjects = ({ projects }: { projects: RelatedProjectSlideProps[] }) => {
  return (
    <section className="w-full bg-gray-f2 pt-[3.75rem]">
      <div className="pinpoint-container pb-[1.875rem]">
        <h2 className="typo-caption-small uppercase">Related Projects</h2>
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Mousewheel, Manipulation, A11y, Pagination, Parallax, Navigation, Autoplay]}
          loop={true}
          centeredSlides={true}
          navigation={true}
          mousewheel={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={'auto'}
          spaceBetween={8}
          // onSwiper={swiper => {
          //   swiperRef.current = { swiper };
          // }}
          speed={1200}
          // onSlideChange={swiper => setActiveIndex(swiper.realIndex || 0)}
          className="mySwiper w-full h-auto flex items-center justify-center flex-nowrap">
          {projects.map((project, idx) => (
            <SwiperSlide
              key={idx}
              className={`w-full transition-all duration-500 ease-in-out relative`}>
              <ProjectSlide {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export interface RelatedProjectSlideProps {
  name: string;
  description: string;
  image: string;
  projectId: string;
}

const ProjectSlide = ({ name, description, image, projectId }: RelatedProjectSlideProps) => {
  return (
    <GhostBtn linkProps={{ href: `/works/${projectId}` }} className="w-full" wrapClassName="group">
      <div className="w-full relative">
        <div className="w-full h-[60vw]">
          <div className="w-full h-full relative">
            <Image src={image} alt="" className="w-full h-full object-cover" fill />
          </div>
        </div>
        <div className="w-full min-h-[160px] bg-white p-[26px_6.875vw_36px] relative">
          <div className="w-full h-fit grid gap-3 lg:gap-[1.375rem]">
            <h3 className="typo-h3">{name}</h3>
            <p className="typo-body-2 text-gray-66/80 text-wrap break-words">{description}</p>
          </div>
          <div className="size-[3.125rem] md:hidden grid place-items-center absolute bottom-2 right-3">
            <MoveRight className="size-5 text-dark stroke-[1.5]" />
          </div>
        </div>
      </div>
    </GhostBtn>
  );
};
