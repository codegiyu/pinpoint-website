import { GhostBtn } from '@/components/atoms/GhostBtn';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CTAProps {
  variant?: 'white' | 'gray';
}

export const CTA = ({ variant = 'white' }: CTAProps) => {
  const bgClass = variant === 'white' ? 'before:bg-white' : 'before:bg-gray-f2 md:before:bg-white';
  const containerBgClass = variant === 'gray' ? 'bg-gray-f2' : 'bg-white md:bg-gray-f2';

  return (
    <section
      className={`w-full ${containerBgClass} flex justify-center pt-11 pb-[3.125rem] md:pt-[3.75rem] md:pb-[4.125rem] 
      lg:pt-[7.25rem] lg:pb-[8.25rem] xl:pt-[clamp(116px,_8.657vw,_145px)] xl:pb-[clamp(132px,_9.851vw,_165px)]`}>
      <div className="pinpoint-container-mobile-w-full">
        <GhostBtn
          linkProps={{ href: '#' }}
          className={`w-full flex-none bg-transparent py-10 md:py-[3.125rem] lg:py-[4.25rem] xl:p-[clamp(80px,_5.97vw,_120px)]`}
          wrapClassName={`relative z-[2] before:w-full before:h-full ${bgClass} before:absolute before:inset-0 before:z-[1] before:transition-all before:duration-1000 before:ease-in-out md:hover:before:scale-[0.92] before:cursor-pointer`}>
          <div className="flex-none w-[85.8vw] max-w-[495px] md:w-[28.4375rem] md:max-w-none lg:w-[38.25rem] xl:w-[48.875rem] 2xl:w-[59.375rem] grid lg:grid-cols-[1fr_auto] gap-6 items-center lg:justify-between mx-auto relative z-[3]">
            <div className="w-full lg:w-fit h-fit grid gap-4 md:gap-[0.625rem] xl:gap-0 text-center lg:text-start">
              <h2 className="typo-h2-cta break-words text-wrap">Starting a new project?</h2>
              <p className="w-1/2 md:w-full typo-body-3 scale-[1.3] md:scale-100 text-dark/65 break-words text-wrap mx-auto">
                Let&apos;s create great things together
              </p>
            </div>
            <div
              className={cn(
                buttonVariants({ variant: 'default', size: 'default', typo: 'default' }),
                'mx-auto'
              )}>
              <span className="xl:px-[0.9375rem]">Contact us</span>
            </div>
          </div>
        </GhostBtn>
      </div>
    </section>
  );
};
