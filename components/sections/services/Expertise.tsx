import { FullServiceData, ServiceExpertiseGroupProps } from '@/app/services/[service]/page';
import { SectionHeader } from '@/components/general/SectionHeader';
import { BreakdownSingle } from '../home/WhatWeDo';

export const ServiceExpertise = ({ title, breakdown }: FullServiceData['expertise']) => {
  return (
    <section className="w-full bg-white pt-[3.75rem] lg:pt-[6.25rem]">
      <div className="pinpoint-container">
        <SectionHeader caption="Expertise" title={title} />
        <div className="w-full grid mt-[3.125rem]">
          {breakdown.slice(0, 3).map((item, idx, arr) => (
            <ServiceExpertiseGroup
              key={idx}
              {...item}
              index={idx + 1}
              isLast={idx === arr.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceExpertiseGroup = ({ index, title, services, isLast }: ServiceExpertiseGroupProps) => {
  return (
    <div
      className={`w-full grid gap-6 ${isLast ? '' : 'border-b border-dark/25'} ${index === 1 ? '' : 'pt-10'} pb-10`}>
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
