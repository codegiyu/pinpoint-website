import { SectionHeader } from '@/components/general/SectionHeader';
import { servicesSummary } from '@/lib/constants/texts';
import { BreakdownSingle, ServiceCardProps } from '../home/WhatWeDo';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { MoveRight } from 'lucide-react';
import { splitArrayInTwo, splitTextIntoTwoWithBrTag } from '@/lib/utils/general';
import { omit } from 'lodash';

export const Services = () => {
  return (
    <section className="w-full bg-white pt-[3.75rem] md:pt-0 md:pb-[5.375rem] lg:pb-16 xl:pb-[clamp(64px,_3.731vw,_116px)]">
      <div className="pinpoint-container grid gap-10 md:gap-20 xl:gap-[11rem]">
        <div className="w-full lg:max-w-[720px] xl:max-w-[782px] 1400:max-w-[950px] grid gap-5 mx-auto px-0">
          <SectionHeader caption="AD Services" title="" />
          <p className="typo-body-1 text-dark/75 font-light">
            Our communication agency located in Brussels dedicates itself wholeheartedly to boosting
            your brand. Without compromising on quality. Experts in WordPress, the little CMS that
            has conquered the world, we create ambitious websites. And to enrich your online and
            offline presence, we also produce targeted content: videos, photos, texts, and
            meaningful print materials.
          </p>
        </div>

        <div className="w-full">
          <div className="w-full flex flex-wrap flex-col lg:flex-row lg:justify-between gap-6 md:gap-14 lg:gap-x-0 lg:gap-y-24">
            {servicesSummary.map((service, idx) => (
              <ServiceCard key={idx} {...omit(service, ['videoUrl'])} />
            ))}
            <div className="hidden lg:block lg:w-[216px] xl:w-[264px] 2xl:w-[330px]"></div>
          </div>

          {/* {servicesSummary.length > 3 && (
            <div className="w-full flex flex-wrap flex-col lg:flex-row lg:justify-between gap-6 md:gap-14 lg:gap-0">
              {servicesSummary.slice(3, 6).map((service, idx) => (
                <ServiceCard key={idx} {...omit(service, ['videoUrl'])} />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ name, breakdown, href }: Omit<ServiceCardProps, 'videoUrl'>) => {
  const [firstHalfOfBreakdown, secondHalfOfBreakdown] = splitArrayInTwo([...breakdown, '...']);

  return (
    <GhostBtn
      linkProps={{ href }}
      className={`w-full border lg:border-0 
      border-dark/15 group-hover:border-dark relative z-10`}
      wrapClassName="group lg:w-[216px] xl:w-[264px] 2xl:w-[330px] relative z-[6]">
      <div
        className="w-[85.8vw] max-w-[495px] md:w-[32.8125rem] md:max-w-none lg:w-full grid 
        gap-[1.875rem] pt-9 pb-10 px-8 md:p-[50px_52.5px_60px] lg:p-0 text-dark relative mx-auto">
        <h4
          className="typo-h4 md:text-dark/90 text-start font-medium 
          lg:group-hover:-translate-y-3 trasition-all duration-300 ease-out">
          {splitTextIntoTwoWithBrTag(name)}
        </h4>
        <div
          className="hidden lg:block w-full h-[1px] bg-dark/15 
          lg:group-hover:-translate-y-3 trasition-all duration-300 
          ease-out relative">
          <div
            className="w-full max-w-0 group-hover:max-w-full absolute inset-0 
            h-full bg-dark transition-all duration-300 ease-in"
          />
        </div>
        <div className="lg:group-hover:-translate-y-3 trasition-all duration-300 ease-out">
          <ul className="grid md:hidden lg:grid">
            {[...breakdown, '...'].map((item, idx) => (
              <BreakdownSingle key={idx} text={item} className="text-dark/65" noDecorationInXL />
            ))}
          </ul>
          <div className="w-full hidden md:grid lg:hidden grid-cols-2 gap-8">
            <ul className="grid md:border-r border-dark/25">
              {firstHalfOfBreakdown.map((item, idx) => (
                <BreakdownSingle key={idx} text={item as string} className="text-dark/65" />
              ))}
            </ul>
            <ul className="grid">
              {secondHalfOfBreakdown.map((item, idx) => (
                <BreakdownSingle key={idx} text={item as string} className="text-dark/65" />
              ))}
            </ul>
          </div>
        </div>
        <div
          className="w-full md:w-fit lg:w-full md:h-fit md:absolute 
          lg:relative md:top-[46px] lg:top-0 md:right-[35px] lg:right-0 
          flex items-center justify-between ml-auto">
          <span className="md:hidden typo-button font-medium">View more</span>
          <span className="hidden lg:block xl:hidden typo-caption-small uppercase text-dark font-normal tracking-tight">
            View more
          </span>
          <div
            className="xl:hidden size-[3.125rem] bg-white rounded-full grid 
            place-items-center border border-dark/15 lg:border-white 
            group-hover:border-dark lg:group-hover:border-white 
            transition-[border_0.4s_ease-in-out]">
            <MoveRight className="size-5 text-dark/80" />
          </div>
          <MoveRight className="hidden xl:block size-7 stroke-[0.75px] text-dark" />
        </div>
        <div
          className="hidden lg:block w-full h-full bg-transparent absolute z-[-1]
          inset-0 group-hover:scale-x-130 group-hover:scale-y-130 
          group-hover:translate-y-[-6px] group-hover:bg-gray-f2 transition-all 
          duration-300 ease-out"
        />
      </div>
    </GhostBtn>
  );
};
