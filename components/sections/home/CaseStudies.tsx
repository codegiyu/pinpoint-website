import { GhostBtn } from '@/components/atoms/GhostBtn';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { homeCaseStudySamples } from '@/lib/constants/texts';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

export const CaseStudies = () => {
  return (
    <section className="w-full section-block-padding bg-gray-f2 relative z-[3]">
      <div className="pinpoint-container grid gap-6 md:gap-8 lg:gap-[3.75rem] xl:gap-[clamp(60px,_4.478vw,_75px)">
        <div className="grid gap-3">
          <p className="typo-caption-small uppercase">Our latest case studies</p>
          <h2 className="typo-h2">
            The DNA of <br />
            our creative agency
          </h2>
        </div>
        <div className="grid gap-12 md:gap-16 lg:gap-[7.5rem] xl:gap-[clamp(120px,_8.956vw,_150px)">
          {homeCaseStudySamples.map((item, idx) => (
            <CaseStudySummary key={idx} {...item} index={idx + 1} />
          ))}
        </div>
        <div className="flex justify-center mt-6 md:mt-14">
          <PinpointBtn variant="secondary" text="Discover more" />
        </div>
      </div>
    </section>
  );
};

export interface CaseStudySummaryProps {
  index: number;
  title: string;
  description: string;
  img: string;
  link: string;
  imgOnRight?: boolean;
}

export const CaseStudySummary = ({
  index,
  title,
  description,
  img,
  link,
  imgOnRight = false,
}: CaseStudySummaryProps) => {
  return (
    <div
      className={`w-full h-fit md:h-[19rem] lg:h-[20.125rem] xl:h-[24.5rem] flex flex-col flex-none flex-nowrap gap-2 md:gap-8 lg:gap-[3.75rem] xl:gap-[clamp(46px,_2.687vw,_58px)] md:grid ${imgOnRight ? 'md:grid-cols-[1fr_auto]' : 'md:grid-cols-[auto_1fr]'}`}>
      <div
        className={`w-full md:w-[19.6875rem] lg:w-[29.25rem] xl:w-[35.75rem] 2xl:w-[42.25rem] h-[60vw] md:h-full flex-none relative overflow-hidden 
        ${imgOnRight ? 'order-1 md:order-2' : 'order-1'}`}>
        <GhostBtn linkProps={{ href: link }} className="w-full h-full" wrapClassName="h-full">
          <div className="absolute w-full h-full lg:h-[calc(100%_+_120px)] left-0 top-0 lg:-top-[60px]">
            <div className="w-full h-full relative">
              <Image src={img} alt="" className="w-full h-full object-cover" sizes="" fill />
            </div>
          </div>
        </GhostBtn>
      </div>

      <div
        className={`w-full h-fit md:h-full flex-none bg-white md:bg-transparent flex items-center 
        pt-[1.625rem] pb-9 md:py-0 ${imgOnRight ? 'order-2 md:order-1' : 'order-2'}`}>
        <GhostBtn
          linkProps={{ href: link }}
          className="w-full h-fit"
          wrapClassName="w-[70.2vw] max-w-[405px] md:max-w-none md:w-full mx-auto">
          <div
            className={`w-full md:w-[13.625rem] lg:w-[18.25rem] xl:w-[19.25rem] 2xl:w-[25rem] min-h-[160px] flex flex-col justify-between md:justify-start gap-[1.375rem] text-left ${imgOnRight ? 'md:text-right ml-auto' : 'md:text-left mr-auto'}`}>
            <div
              className={`w-full hidden xl:flex items-center gap-5 ${imgOnRight ? 'flex-row-reverse' : ''}`}>
              <span className="text-gray-66/80">{String(index).padStart(2, '0')}</span>
              <div className="w-11 h-[1px] bg-gray-b3" />
            </div>
            <div className="w-full h-fit grid gap-3 lg:gap-[1.375rem]">
              <h3 className="typo-h3">{title}</h3>
              <p className="typo-body-2 text-gray-66/80 text-wrap break-words">{description}</p>
            </div>
            <span className="hidden md:block text-[1rem] xl:text-[clamp(16px,_1.194vw,_20px)] font-medium">
              View project
            </span>
            <div className="w-full flex md:hidden justify-end">
              <MoveRight className="size-5 text-dark stroke-[1.5]" />
            </div>
          </div>
        </GhostBtn>
      </div>
    </div>
  );
};
