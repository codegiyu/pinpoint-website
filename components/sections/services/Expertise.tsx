import { FullServiceData, ServiceExpertiseGroupProps } from '@/app/services/[service]/page';
import { SectionHeader } from '@/components/general/SectionHeader';
import { BreakdownSingle } from '../home/WhatWeDo';
import Image from 'next/image';
import { useMemo } from 'react';
import { MarqueeTextSection } from '@/components/general/MarqueeTextSection';

export const ServiceExpertise = ({
  title,
  breakdown,
  highlightImage,
  marqueeText,
}: FullServiceData['expertise']) => {
  const { breakdownArr, onlyTwoGroups } = useMemo(() => {
    const breakdownArr = breakdown.slice(0, 3);

    return { breakdownArr, onlyTwoGroups: breakdownArr.length === 2 };
  }, [breakdown]);

  return (
    <section
      className={`w-full ${onlyTwoGroups ? 'bg-white md:bg-gray-f2' : 'bg-white'} pt-[3.75rem] md:pt-[6.25rem]`}>
      <div className="w-full relative overflow-hidden">
        <div className="pinpoint-container">
          <SectionHeader caption="Expertise" title={title} titleClassName="lg:w-3/4 uppercase" />
          <div
            className={`w-full md:w-[756px] xl:w-[782px] 2xl:w-[950px] grid md:grid-cols-2 
            md:gap-x-6 xl:gap-x-[5vw] mt-[3.125rem] xl:mt-[clamp(86px,_5.333vw,_120px)] 
            lg:ml-auto xl:mx-auto ${onlyTwoGroups ? 'md:min-h-[570px] lg:min-h-[max(48vw,_550px)] xl:min-h-[600px] mb-12' : ''}`}>
            {breakdownArr.map((item, idx, arr) => (
              <ServiceExpertiseGroup
                key={idx}
                {...item}
                index={idx + 1}
                isLast={idx === arr.length - 1}
                className={onlyTwoGroups && idx === 1 ? 'md:order-3' : ''}
              />
            ))}
            <div
              className="highlight-img-container hidden md:block w-[calc(279px_+_((100vw_-_595px)_/_2))] 
              lg:w-[calc(359px_+_((100vw_-_828px)_/_2))] lg:max-w-[600px] 
              xl:w-[calc(100%_+_((100vw_-_782px)_/_2))] relative">
              <div
                className={`w-full lg:pr-10 xl:pr-0 z-[5]
                ${onlyTwoGroups ? 'order-2 absolute inset-0' : 'relative'}
                h-[570px] lg:h-[48vw] lg:min-h-[550px] xl:h-[600px]`}>
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
        </div>

        {!onlyTwoGroups && (
          <div className="w-full h-[12.5rem] hidden md:block absolute -bottom-[8.5rem] z-0">
            <div className="w-full h-[150%] bg-gray-f2" />
          </div>
        )}
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
        <MarqueeTextSection text={marqueeText} />
      </div>
    </section>
  );
};

const ServiceExpertiseGroup = ({
  index,
  title,
  services,
  isLast,
  className = '',
}: ServiceExpertiseGroupProps) => {
  return (
    <div
      className={`w-full h-fit grid gap-6  border-dark/25 md:border-t ${isLast ? '' : 'border-b md:border-b-0'}  ${index === 1 ? '' : 'pt-10'} pb-10 md:pt-10 ${className}`}>
      <h3 className="typo-h5 text-dark/90">
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
