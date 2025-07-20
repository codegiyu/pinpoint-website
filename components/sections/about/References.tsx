/* eslint-disable @next/next/no-img-element */
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { SectionHeader } from '@/components/general/SectionHeader';
import { OUR_REFERENCES } from '@/lib/constants/texts';

export const OurReferences = () => {
  return (
    <section className="w-full bg-gray-f2 pt-[3.75rem] pb-11 md:py-0 relative z-[5]">
      <div className="pinpoint-container ">
        <SectionHeader caption="Our References" title="In Belgium and beyond" />

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-20 gap-x-8 pt-16 md:pt-[6.25rem] pb-20">
          {OUR_REFERENCES.map((reference, idx) => (
            <Reference key={idx} {...reference} />
          ))}
        </div>
        <p className="typo-caption-small uppercase text-center">And Many More</p>
      </div>
    </section>
  );
};

export interface ReferenceProps {
  logo: string;
  link: string;
}

const Reference = ({ logo, link }: ReferenceProps) => {
  return (
    <GhostBtn
      linkProps={{ href: link, target: '_blank', rel: 'noopener noreferrer' }}
      className="w-full">
      <div className="w-full flex justify-center">
        <img src={logo} alt="" className="max-w-4/5 xl:max-w-[70%] aspect-[2] object-contain" />
      </div>
    </GhostBtn>
  );
};
