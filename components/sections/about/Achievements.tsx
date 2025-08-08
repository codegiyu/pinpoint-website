import { AnimatedCounter } from '@/components/general/AnimatedCounter';
import { SectionHeader } from '@/components/general/SectionHeader';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const OurAchievements = ({ achievements }: { achievements: AchievementBlockProps[] }) => {
  return (
    <section className="w-full relative pt-[3.75rem] md:pt-0 1400:pb-[6.25rem]">
      <div className="w-full md:absolute md:inset-0">
        <div className="pinpoint-container pb-10 md:pb-0">
          <SectionHeader
            caption="Pinpoint Achievements"
            title={
              <>
                Proud moments,
                <br /> measurable impact
              </>
            }
          />
        </div>
      </div>
      <div className="w-full">
        <div
          className="w-full 1400:w-[1024px] 2xl:w-[1200px] 3xl:w-[1300px] h-auto 
          md:h-[100vw] lg:h-[75vw] 1400:h-[794px] 3xl:h-[50vw] grid md:grid-cols-3 
          lg:grid-cols-4 md:grid-rows-3 mx-auto relative z-[1]">
          {achievements.map((item, idx) => (
            <AchievementBlock key={idx} {...item} />
          ))}
          <div
            className="w-full h-[70vh] md:h-full md:col-start-2 md:col-end-4 lg:col-start-3 
            lg:col-end-5 md:row-start-2 md:row-end-4">
            <div className="w-full h-full relative">
              <Image
                src="https://static.pinpoint.ng/images/about-page/achievements.jpg"
                alt=""
                className="w-full h-full object-cover"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[21.875rem] xl:h-[450px] hidden 1400:block absolute -bottom-[15rem] z-0">
        <div className="w-full h-[150%] bg-gray-f2" />
      </div>
    </section>
  );
};

export interface AchievementBlockProps {
  number: number;
  numberSuffix?: string;
  desc: string;
  className: string;
}

const AchievementBlock = ({ number, numberSuffix, desc, className }: AchievementBlockProps) => {
  return (
    <div className={cn('w-full place-items-center pt-[3.75rem] pb-20 md:py-0', className)}>
      <div className="w-[85.8vw] max-w-[495px] md:max-w-none md:w-fit grid gap-3">
        <p className="typo-big font-light lg:text-right 1400:text-start">
          <AnimatedCounter to={number} />
          {numberSuffix}
        </p>
        <p className="typo-body-8 w-max">{desc}</p>
      </div>
    </div>
  );
};
