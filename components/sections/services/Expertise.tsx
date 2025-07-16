import { FullServiceData, ServiceExpertiseGroupProps } from '@/app/services/[service]/page';
import { SectionHeader } from '@/components/general/SectionHeader';
import { BreakdownSingle } from '../home/WhatWeDo';
import Image from 'next/image';

export const ServiceExpertise = ({
  title,
  breakdown,
  highlightImage,
  marqueeText,
}: FullServiceData['expertise']) => {
  return (
    <section className="w-full bg-white pt-[3.75rem] md:pt-[6.25rem]">
      <div className="w-full relative overflow-hidden">
        <div className="pinpoint-container">
          <SectionHeader caption="Expertise" title={title} />
          <div
            className="w-full md:w-[756px] xl:w-[782px] 2xl:w-[950px] grid md:grid-cols-2 
            md:gap-x-6 xl:gap-x-[5vw] mt-[3.125rem] xl:mt-[clamp(86px,_5.333vw,_120px)] 
            lg:ml-auto xl:mx-auto">
            {breakdown.slice(0, 3).map((item, idx, arr) => (
              <ServiceExpertiseGroup
                key={idx}
                {...item}
                index={idx + 1}
                isLast={idx === arr.length - 1}
              />
            ))}
            <div
              className="highlight-img-container hidden md:block w-[calc(279px_+_((100vw_-_595px)_/_2))] 
              lg:w-[calc(359px_+_((100vw_-_828px)_/_2))] lg:max-w-[600px] xl:w-[calc(100%_+_((100vw_-_782px)_/_2))] 
              h-[570px] lg:h-[48vw] lg:min-h-550px xl:h-[600px] lg:pr-10 xl:pr-0 relative z-[5]">
              <div className="w-full h-full relative">
                <Image
                  src={highlightImage}
                  alt=""
                  className="w-full h-full object-cover"
                  sizes=""
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[12.5rem] hidden md:block absolute -bottom-[8.5rem] z-0">
          <div className="w-full h-[150%] bg-gray-f2" />
        </div>
      </div>
      <div className="w-full">
        <div className="mobile-img-container md:hidden w-full h-[70vh] relative z-[5]">
          <Image
            src={highlightImage}
            alt=""
            className="w-full h-full object-cover"
            sizes=""
            fill
            priority
          />
        </div>
        <div className="marquee md:bg-gray-f2 h-[calc(168px_+_5vh)] mt-[calc(-168px_-_5vh)] md:mt-0 pl-[10vw] relative z-[6] overflow-hidden">
          <div
            id="scroll-text"
            className="w-[1000vw] animate-[marquee_40s_infinite_linear] flex flex-nowrap gap-12 typo-display text-white md:text-dark">
            {Array(20)
              .fill('')
              .map((_, idx) => (
                <p key={idx} className="flex-none py-[3.75rem]">
                  {marqueeText}
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceExpertiseGroup = ({ index, title, services, isLast }: ServiceExpertiseGroupProps) => {
  return (
    <div
      className={`w-full h-fit grid gap-6  border-dark/25 md:border-t ${isLast ? '' : 'border-b md:border-b-0'}  ${index === 1 ? '' : 'pt-10'} pb-10 md:pt-10`}>
      <h3 className="typo-h5 text-dark/80">
        {index}. {title}
      </h3>
      <ul className="">
        {services.map((service, idx) => (
          <BreakdownSingle key={idx} text={service} className="text-dark/80" />
        ))}
      </ul>
    </div>
  );
};
