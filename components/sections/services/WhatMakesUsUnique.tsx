import { FullServiceData, UniqueGroupProps } from '@/app/services/[service]/page';
import { SectionHeader } from '@/components/general/SectionHeader';

export const WhatMakesUsUnique = ({ title, groups }: FullServiceData['whatMakesUsUnique']) => {
  return (
    <section
      className="w-full bg-white md:bg-gray-f2 pt-[3.75rem] md:pt-0 pb-1.5 
      md:pb-10 lg:pb-14 xl:pb-[4.875rem]">
      <div className="pinpoint-container">
        <SectionHeader caption="What Makes Us Unique" title={title} titleClassName="lg:w-3/4" />
        <div
          className={`w-full lg:w-[684px] xl:w-[782px] 2xl:w-[950px] grid md:grid-cols-2 
          gap-10 md:gap-y-0 md:gap-x-6 lg:gap-x-[5vw] mt-[3.75rem] 
          md:mt-[6.25rem] lg:ml-auto xl:mx-auto md:pb-10 lg:pb-0`}>
          {groups.map((group, idx, arr) => (
            <GroupDisplay key={idx} {...group} isLast={idx === arr.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GroupDisplay = ({ title, text, isLast }: UniqueGroupProps) => {
  return (
    <div
      className={`w-full h-fit grid gap-6 pb-10 md:pb-10 lg:pb-[4.875rem] 
      ${isLast ? '' : 'border-b border-dark/25 md:border-b-0'}`}>
      <h4 className="typo-h5 text-dark/90">{title}</h4>
      <p className="typo-body-4 !leading-[2] !tracking-[0.05em] text-gray-59">{text}</p>
    </div>
  );
};
