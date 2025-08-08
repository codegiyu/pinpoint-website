import { ServicePackage, ServicePackageGroup } from '@/app/services/[service]/page';
import { SectionHeader } from '@/components/general/SectionHeader';
import { AvailablePackagedService } from '@/lib/constants/texts';
import { formatSlugToText } from '@/lib/utils/general';
import { BreakdownSingle } from '../home/WhatWeDo';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

export const PackagePricing = ({ packageGroups }: { packageGroups: ServicePackageGroup[] }) => {
  if (!packageGroups.length) return null;

  return (
    <section className="w-full bg-white py-[3.75rem] md:py-[5.375rem] lg:py-16 xl:py-24">
      <div className="pinpoint-container grid gap-10">
        <SectionHeader caption="Pricing Packages" title="" />

        <div className="w-full overflow-hidden">
          <Accordion type="multiple" defaultValue={[packageGroups[0].id]} className="grid gap-2">
            {packageGroups.map((group, idx) => (
              <PackagePricingGroup key={idx} {...group} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const PackagePricingGroup = ({ id, packages }: ServicePackageGroup) => {
  // const modulusByThree = packages.length % 3;
  // const modulusByFour = packages.length % 4;

  return (
    <AccordionItem value={id} className="max-w-full border-none">
      <AccordionTrigger className="group w-full bg-gray-f2 rounded-none border-none py-4 px-6">
        <div className="w-full flex items-center justify-between">
          <p className="w-fit typo-body-2 font-medium no-underline">{formatSlugToText(id)}</p>
          <div className="w-fit h-4 flex items-center gap-3 relative">
            <div
              className={`w-4 h-4 -rotate-90 group-data-[state=open]:rotate-0 \
              relative transition-all duration-300 ease-linear`}>
              <ChevronDown className="size-4 stroke-2 font-bold" />
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="w-full py-14">
        <div className="w-full">
          <div
            className="w-full h-full three-cols-grid grid lg:grid-cols-2 \
            xl:grid-cols-3 items-stretch gap-12 md:gap-24 lg:gap-x-10 lg:gap-y-24 \
            px-4 md:px-6">
            {packages.map((item, idx) => (
              <PackageCard key={idx} {...item} groupId={id} />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

interface PackageCardProps extends ServicePackage {
  groupId: AvailablePackagedService;
  // rowLength: 'three' | 'four';
}

const PackageCard = ({ id, groupId, priceRange, priceSuffix, benefits }: PackageCardProps) => {
  return (
    <div
      className={`group w-full md:w-[400px] lg:w-[320px] xl:w-[264px] 2xl:w-[330px] h-full 
      relative z-10`}>
      <div
        className="w-full h-full flex flex-col justify-between
        gap-[1.875rem] pt-5 pb-6 px-4 md:p[36px_32px_40px] md:p-[20px_24px] lg:p-0 
        text-dark relative mx-auto">
        <div className="w-full grid gap-[1.25rem]">
          <div className="grid gap-3 px-2 lg:px-2">
            <h4
              className="typo-h4 md:text-dark/90 text-start font-medium
              lg:group-hover:-translate-y-3 trasition-all duration-300 ease-out">
              {formatSlugToText(id)}
            </h4>
            <p className="text-[0.875rem] lg:text-[1rem] font-medium text-dark/75">
              ₦{priceRange[0].toLocaleString()}
              {priceRange[1] && <span> - {priceRange[1].toLocaleString()}</span>}
              <span className="text-[0.75rem] lg:text-[0.875rem]">{priceSuffix}</span>
            </p>
          </div>
          <div
            className="block w-full h-[1px] bg-dark/15 
            lg:group-hover:-translate-y-3 trasition-all duration-300 
            ease-out relative">
            <div
              className="w-full max-w-0 group-hover:max-w-full absolute inset-0 
              h-full bg-dark transition-all duration-300 ease-in"
            />
          </div>
          <div className="lg:group-hover:-translate-y-3 trasition-all duration-300 ease-out">
            <ul className="grid lg:grid gap-1.5">
              {benefits.map((item, idx) => (
                <BreakdownSingle key={idx} text={item} className="text-dark/65" tickDecoration />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <PinpointBtn
            size="full"
            linkProps={{ href: `/starting-a-new-project?service=${groupId}&package=${id}` }}
            text="Request"
            animate
          />
        </div>
        <div
          className="block w-full h-full bg-transparent absolute z-[-1]
          inset-0 scale-105 md:scale-110 lg:group-hover:scale-x-130 lg:group-hover:scale-y-130 
          group-hover:translate-y-[-6px] group-hover:bg-gray-f2 transition-all 
          duration-300 ease-out border border-gray-f2 group-hover:border-transparent"
        />
      </div>
    </div>
  );
};
