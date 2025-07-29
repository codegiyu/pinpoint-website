import { GhostBtn } from '@/components/atoms/GhostBtn';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface JobsCTAProps {
  variant?: 'white' | 'gray';
  title: string;
  description: string;
  btnText?: string;
  href: string;
}

export const JobsCTA = ({
  variant = 'white',
  title,
  description,
  btnText = 'Discover the opportunity',
  href,
}: JobsCTAProps) => {
  const containerBgClass = variant === 'gray' ? 'bg-gray-f2' : 'bg-gray-f2 md:bg-gray-f2';
  const bgClass = variant === 'white' ? 'before:bg-white ' : 'before:bg-gray-f2 md:before:bg-white';

  return (
    <section
      className={`w-full mx-auto ${containerBgClass} flex justify-center pt-4  pb-[1.125rem] md:pt-[1.75rem] md:pb-[1.125rem] px-6 lg:pt-[2.25rem] lg:pb-[2.25rem] xl:pt-[clamp(26px,_1.557vw,_145px)] xl:pb-[clamp(20px,_1.551vw,_165px)] relative z-[3]`}>
      <div className="pinpoint-container-mobile-w-full lg:w-[76vw] xl:w-[76vw] 2xl:w-[67vw]">
        <GhostBtn
          linkProps={{ href: href }}
          className={`w-full  bg-transparent flex-none py-10 md:py-[3.125rem] px-14 lg:px-[clamp(5rem,_1.557vw,_55px)] lg:py-[clamp(5rem,_1.557vw,_45px)] xl:p-[clamp(80px,_4.97vw,_120px)] 2xl:py-[6rem] `}
          wrapClassName={`relative z-[2] before:w-full before:h-full ${bgClass} before:absolute before:inset-0 before:z-[1] before:transition-all before:duration-1500 before:ease-in-out md:hover:before:scale-[0.92] before:cursor-pointer`}>
          <div className="flex-none w-[76vw] max-w-[495px] md:w-[28.4375rem] md:max-w-none lg:w-full grid lg:grid-cols-[1fr_auto] gap-8 md:gap-6 lg:gap-[3rem] xl:gap-[clamp(120px,_4.97vw,_80px)]  items-center lg:justify-between mx-auto relative z-[3]">
            <div className="w-full lg:w-fit grid gap-6 text-start">
              <h2 className="typo-h3 2xl:mb-2 font-[600] tracking-[0.015] md:tracking-normal break-words text-wrap w-full">
                {title}
              </h2>
              <p className="w-full md:w-full text-[14.5px] md:text-base md:typo-body-2 lg:text-base xl:text-[1.05rem] 2xl:text-[1.2rem] md:scale-100 text-dark/85 font-light break-words text-wrap mx-auto leading-[1.8em]">
                {description}
              </p>
            </div>
            <div
              className={cn(
                buttonVariants({ variant: 'default', size: 'default', typo: 'default' }),
                ' justify-self-start self-start lg:self-end max-w-[250px] md:max-w-[270px] xl:max-w-[300px] lg:mx-auto'
              )}>
              <span className="xl:px-[0.9375rem] text-[15.5px] text-nowrap">{btnText}</span>
            </div>

            {/* <div
              className={cn(
                buttonVariants({ variant: 'default', size: 'default', typo: 'default' }),
                ' justify-self-start group overflow-hidden relative self-start lg:self-end max-w-[250px] md:max-w-[270px] xl:max-w-[300px] lg:mx-auto'
              )}>
              <span className="grid overflow-hidden  h-full">
                <span className="xl:px-[0.9375rem] text-[15.5px] text-nowrap block relative top-0 h-fit group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
                  {btnText}
                </span>
                <span className="xl:px-[0.9375rem] text-[15.5px] text-nowrap absolute top-1/2 h-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
                  {btnText}
                </span>
              </span>
            </div> */}
          </div>
        </GhostBtn>
      </div>
    </section>
  );
};
