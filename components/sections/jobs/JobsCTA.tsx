import { GhostBtn } from '@/components/atoms/GhostBtn';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface JobsCTAProps {
  variant?: 'white' | 'gray';
  title: string;
  description: string;
  btnText: string;
  href: string;
}

export const JobsCTA = ({ variant = 'white', title, description, btnText, href }: JobsCTAProps) => {
  const bgClass = variant === 'white' ? 'before:bg-white bg-white' : 'md:before:bg-white';
  const containerBgClass = variant === 'gray' ? 'bg-gray-f2' : 'bg-gray-f2 md:bg-gray-f2';

  return (
    <section
      className={`w-full ${containerBgClass} flex justify-center pt-4 pb-[1.125rem] md:pt-[1.75rem] md:pb-[1.125rem]  px-4 lg:pt-[2.25rem] lg:pb-[2.25rem] xl:pt-[clamp(26px,_1.557vw,_145px)] xl:pb-[clamp(20px,_1.551vw,_165px)] relative z-[3]`}>
      <div className="pinpoint-container-mobile-w-full ">
        <GhostBtn
          linkProps={{ href: href }}
          className={`w-full ${bgClass} flex-none py-10 md:py-[3.125rem] lg:py-[4.25rem] xl:p-[clamp(80px,_5.97vw,_120px)]`}
          wrapClassName={`relative z-[2] before:w-full before:h-full  before:absolute before:inset-0 before:z-[1] before:transition-all before:duration-1000 before:ease-in-out md:hover:before:scale-[0.92] before:cursor-pointer`}>
          <div className="flex-none w-[84.8vw] max-w-[495px] md:w-[28.4375rem] md:max-w-none lg:w-[45.25rem] xl:w-[48.875rem] 2xl:w-[59.375rem] grid lg:grid-cols-[1fr_auto] gap-8 md:gap-6 2xl:gap-24 items-center lg:justify-between mx-auto relative z-[3]">
            <div className="w-full lg:w-fit  grid gap-4 md:gap-[1.625rem] xl:gap-0 text-start">
              <h2 className="typo-h3 2xl:mb-8 font-bold tracking-normal break-words text-wrap w-full">
                {title}
              </h2>
              <p className="w-full md:w-full text-sm md:text-base md:typo-body-3 md:scale-100 text-dark/85 font-thin break-words text-wrap mx-auto">
                {description}
              </p>
            </div>
            <div
              className={cn(
                buttonVariants({ variant: 'default', size: 'default', typo: 'default' }),
                ' justify-self-start self-start lg:self-end max-w-[250px] md:max-w-[210px] xl:max-w-[300px] lg:mx-auto'
              )}>
              <span className="xl:px-[0.9375rem] text-[15.5px] text-wrap 2xl:text-nowrap">
                {btnText}
              </span>
            </div>
          </div>
        </GhostBtn>
      </div>
    </section>
  );
};
