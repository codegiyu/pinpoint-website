'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Manipulation, A11y, Pagination, Navigation } from 'swiper/modules';
import { SectionHeader } from '@/components/general/SectionHeader';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { MacaronTeam, MacaronTeamHand, MacaronTeamPointing } from '@/components/icons';
import { memo } from 'react';

export const Team = memo(({ team }: { team: TeamSlideProps[] }) => {
  return (
    <section className="w-full bg-gray-f2 pt-[3.75rem]">
      <div className="pinpoint-container relative z-[2]">
        <SectionHeader
          caption="The Creators Behind Our Achievements"
          title="Creative hands, strategic minds"
        />
      </div>

      <div className="w-full mt-10 md:mt-[3.125rem] md:pb-[5.625rem] lg:mt-16 xl:mt-20 relative">
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
          {team.map((teamMember, idx) => (
            <SwiperSlide
              key={idx}
              className={`!w-[85vw] !max-w-[450px] md:!max-w-none md:!w-[298px] 
              lg:!w-[292px] xl:!w-[325px] 2xl:!w-[384px] !mr-2 md:!mr-4 !transition-all 
              !duration-500 !ease-in-out !relative`}>
              <TeamSlide {...teamMember} />
            </SwiperSlide>
          ))}
          <SwiperSlide
            className={`hidden md:block !w-[85vw] !max-w-[450px] md:!max-w-none 
              md:!w-[298px] lg:!w-[292px] xl:!w-[325px] 2xl:!w-[384px] !mr-2 md:!mr-4 
              !transition-all !duration-500 !ease-in-out !relative`}
          />
        </Swiper>

        <div className="nav-btns-wrapper hidden md:block relative w-full mt-[34px]">
          <div className="nav-btns-container pinpoint-container flex items-center justify-end gap-2 relative">
            <GhostBtn
              id="custom-swiper-prev"
              LucideIcon={MoveLeft}
              iconClass="size-4 text-dark/75 scale-120"
              className="size-[52px] rounded-full grid place-items-center border 
              border-[silver] hover:border-dark disabled:opacity-50"
            />
            <GhostBtn
              id="custom-swiper-next"
              LucideIcon={MoveRight}
              iconClass="size-4 text-dark/75 scale-120"
              className="size-[52px] rounded-full grid place-items-center border 
              border-[silver] hover:border-dark disabled:opacity-50"
            />
          </div>
        </div>

        <div className="w-full relative md:absolute md:top-0 md:-translate-y-1/2 md:right-0 pointer-events-none z-[6]">
          <div
            className="pinpoint-container flex justify-center md:justify-end 
            pointer-events-none pt-[3.125rem] md:pt-0">
            <GhostBtn
              linkProps={{ href: '/jobs' }}
              className="block group pointer-events-auto"
              wrapClassName="group flex-none relative">
              <MacaronTeam className="macaron homepage-macaron animate-spin animation-duration-[10s] border-dark border-2" />
              <div className="half-macaron homepage-half-macaron absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 border-dark border-[2px]">
                <MacaronTeamHand
                  className="w-full h-full opacity-100 group-hover:rotate-359 group-hover:opacity-0 
                  duration-300 ease-out scale-50"
                />
              </div>
              <div className="half-macaron homepage-half-macaron absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 border-dark border-[0px]">
                <MacaronTeamPointing
                  className="w-full h-full opacity-0 group-hover:rotate-359 group-hover:opacity-100 
                  duration-300 ease-out scale-50"
                />
              </div>
            </GhostBtn>
          </div>
        </div>
      </div>
    </section>
  );
});
Team.displayName = 'Team';

export interface TeamSlideProps {
  name: string;
  title: string;
  mainImage: string;
  subImage: string;
}

const TeamSlide = ({ name, title, mainImage, subImage }: TeamSlideProps) => {
  const alt = `${name} - ${title}`;

  return (
    <div className="group w-full h-[clamp(425px,_133vw,_598px)] md:h-[480px] lg:h-[450px] 2xl:h-[500px] relative overflow-hidden">
      <h4 className="sr-only">{alt}</h4>
      <div className="w-full h-full scale-120 group-hover:scale-100 transition-all duration-700 ease-out relative z-[1]">
        <Image src={mainImage} alt={alt} className="w-full h-full object-cover z-[3]" fill />
        <Image
          src={subImage}
          alt={alt}
          className="w-full h-full object-cover z-[2] group-hover:z-[4]"
          fill
        />
      </div>
      <div
        className="bg-dark/60 absolute w-full left-0 bottom-0 pl-5 pr-5 
        pt-4 pb-4 grid text-[12px] leading-[1.625] 
        tracking-[0.08em] font-light text-white z-[4]">
        <p className="text-[0.875rem] md:text-[1rem] xl:text-[clamp(16px,_1.194vw,_20px)]">
          {name}
        </p>
        <p className="font-medium tracking-[0.05em]">{title}</p>
      </div>
    </div>
  );
};
