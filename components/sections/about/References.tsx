/* eslint-disable @next/next/no-img-element */
'use client';

import { GhostBtn } from '@/components/atoms/GhostBtn';
import { SectionHeader } from '@/components/general/SectionHeader';
import { MoveRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';

export const OurReferences = ({
  references,
  moreReferences,
}: {
  references: ReferenceProps[];
  moreReferences: string[][];
}) => {
  const [moreVisible, setMoreVisible] = useState(false);

  return (
    <section className="w-full bg-gray-f2 pt-[3.75rem] pb-11 md:py-0 relative z-[5]">
      <div className="pinpoint-container ">
        <SectionHeader caption="Our Clients" title="Brands that believe in us" />

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-20 gap-x-8 pt-16 md:pt-[6.25rem] pb-20">
          {references.map((reference, idx) => (
            <Reference key={idx} {...reference} />
          ))}
        </div>
      </div>

      {moreReferences.length > 0 && (
        <Accordion type="single" value={moreVisible ? 'more' : ''} className="w-full">
          <AccordionItem value="more" className="border-none">
            <AccordionContent>
              <div className={`w-full h-full py-6 md:py-8 lg:py-12 grid gap-6 md:gap-8`}>
                {moreReferences.map((clientsArr, idx) => (
                  <ReferencesMarqueeRow key={idx} clientsArr={clientsArr} index={idx} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="pinpoint-container">
        <div className="w-full flex justify-center">
          <GhostBtn
            className="gap-2 py-2 px-2"
            wrapClassName="group relative"
            onClick={() => setMoreVisible(prev => !prev)}>
            <p className="typo-caption-small uppercase text-center">
              {moreVisible ? 'Hide More' : 'And Many More'}
            </p>
            {!moreVisible && (
              <MoveRight className="size-4 group-hover:scale-x-110 transition-all duration-500 ease-in-out text-dark" />
            )}
            <div className="w-full max-w-0 group-hover:max-w-full h-[1px] bg-dark/60 absolute left-0 bottom-0 transition-all duration-500 ease-in-out" />
          </GhostBtn>
        </div>
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

const ReferencesMarqueeRow = ({ clientsArr, index }: { clientsArr: string[]; index: number }) => {
  const duplicatedSlides = [
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
    ...clientsArr,
  ];
  const duration = useMemo(() => Math.floor(Math.random() * 50) + 30, []);

  return (
    <div
      className="w-full h-10 md:h-16 lg:h-20 xl:h-[6.25rem] overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)',
      }}>
      <motion.ul
        className="w-full h-full flex items-center justify-center gap-8 md:gap-11 lg:gap-16 xl:gap-[5.25rem]"
        animate={{
          x: index % 2 ? ['0%', '-100%'] : ['0%', '100%'],
          transition: {
            ease: 'linear',
            duration,
            repeat: Infinity,
          },
        }}>
        {duplicatedSlides.map((imgName, idx) => (
          <li key={idx} className="w-full h-full grid place-items-center">
            <img
              src={`https://static.pinpoint.ng/images/more-references/${imgName}`}
              alt=""
              className="max-w-[300px] h-full max-h-10 md:max-h-16 lg:max-h-20 xl:max-h-[6.25rem] aspect-auto object-contain"
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
};
