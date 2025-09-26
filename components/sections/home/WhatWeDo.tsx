'use client';

import { GhostBtn } from '@/components/atoms/GhostBtn';
import { SmartVideo } from '@/components/general/SmartVideo';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { splitArrayInTwo, splitTextIntoTwoWithBrTag } from '@/lib/utils/general';
import { MoveRight } from 'lucide-react';
import { ComponentPropsWithRef, memo, useState } from 'react';

interface WhatWeDoProps {
  sectionName?: string;
  services: ServiceCardProps[];
}

export const WhatWeDo = memo(({ sectionName, services }: WhatWeDoProps) => {
  return (
    <section
      id="what-we-do"
      className={`w-full bg-gray-f2 md:bg-dark grid gap-10 md:gap-5 
      xl:gap-[clamp(20px,_1.493vw,_30px)] py-0 md:pt-[4.375rem] overflow-hidden
      xl:pt-[clamp(70px,_5.224vw,_88px)] ${sectionName ? '' : 'relative'} z-[3]`}>
      <p
        className={`pinpoint-container typo-caption-small uppercase 
        md:text-white/85 mb-[2px] relative z-[10]`}>
        {sectionName || 'What We Do'}
      </p>

      <section
        id="what-we-do-inner"
        className="w-full max-w-full md:max-w-none md:w-[595px] lg:w-[684px] xl:w-[782px] 2xl:w-[950px] 3xl:w-[1024px] mx-auto">
        <ul
          id="services-list"
          className="w-full grid md:gap-[3.375rem] lg:gap-0 md:pt-10 md:pb-[3.125rem] lg:pt-5 xl:pt-[clamp(60px,_4.478vw,_112px)] xl:pb-[clamp(60px,_4.478vw,_112px)]">
          {services.map((item, idx, arr) => (
            <ServiceCard key={idx} {...item} isLast={idx === arr.length - 1} />
          ))}
        </ul>
      </section>
    </section>
  );
});
WhatWeDo.displayName = 'WhatWeDo';

export interface ServiceCardProps {
  name: string;
  breakdown: string[];
  href: string;
  videoUrl: string;
  posterUrl: string;
  isLast?: boolean;
}

const ServiceCard = memo(
  ({ name, breakdown, href, videoUrl, posterUrl, isLast }: ServiceCardProps) => {
    const [cardHovered, setCardHovered] = useState(false);
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const [firstHalfOfBreakdown, secondHalfOfBreakdown] = splitArrayInTwo([...breakdown, '...']);

    return (
      <li className="group w-full relative md:static overflow-hidden lg:overflow-visible">
        <GhostBtn
          linkProps={{
            href,
            onMouseEnter: () => setCardHovered(true),
            onMouseLeave: () => setCardHovered(false),
          }}
          className={`w-full py-10 sm:py-18 md:py-[2.875rem] xl:py-[clamp(46px,_3.433vw,_58px)] md:border lg:border-x-0 
          ${isLast ? 'lg:border-y-0' : 'lg:border-t-0'} border-white/25 group-hover:border-white relative z-10`}
          wrapClassName="group peer relative z-[6] before:hidden lg:before:block lg:before:absolute before:-top-[9px] 
        before:left-1/2 before:-translate-x-1/2 before:z-[5] before:w-[51.75rem] before:h-[calc(100%_+_10px)]
        xl:before:w-[64rem] 2xl:before:w-[75rem] 3xl:before:w-[81.25rem] before:shadow-[inset_0_0_0_9px_#fff] 
        before:transition-[all_0.7s_ease-in-out] before:opacity-0 hover:before:opacity-100">
          <div
            className="w-[85.8vw] max-w-[495px] md:w-[32.8125rem] md:max-w-none lg:w-full grid lg:grid-cols-[9fr_7fr_3fr] 
          xl:grid-cols-[7fr_7fr_3fr] gap-[1.875rem] lg:gap-0 xl:gap-5 text-white relative mx-auto">
            <h4 className="typo-h4 md:text-white/90 text-start">
              {splitTextIntoTwoWithBrTag(name)}
            </h4>
            <div className="">
              <ul className="grid sm:hidden lg:grid">
                {[...breakdown, '...'].map((item, idx) => (
                  <BreakdownSingle key={idx} text={item} />
                ))}
              </ul>
              <div className="w-full hidden sm:grid lg:hidden grid-cols-2 gap-8">
                <ul className="grid md:border-r border-white/25">
                  {firstHalfOfBreakdown.map((item, idx) => (
                    <BreakdownSingle key={idx} text={item as string} />
                  ))}
                </ul>
                <ul className="grid">
                  {secondHalfOfBreakdown.map((item, idx) => (
                    <BreakdownSingle key={idx} text={item as string} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full md:w-fit md:h-fit md:absolute lg:relative md:top-[46px] lg:top-0 md:right-[35px] lg:right-0 flex items-center justify-between ml-auto">
              <span className="md:hidden typo-button font-semibold">View more</span>
              <div className="size-[3.125rem] rounded-full grid place-items-center border border-white/30 group-hover:border-white transition-[border_0.4s_ease-in-out]">
                <MoveRight className="size-5 text-white/80" />
              </div>
            </div>
          </div>
        </GhostBtn>
        <div className="video-box w-full h-full absolute inset-0 opacity-100 md:opacity-0 lg:peer-hover:opacity-100 transition-opacity duration-300 peer-hover:duration-100 ease-linear">
          {/* <SmartVideo
            src={videoUrl}
            wrapClassName="h-full mobile-video md:hidden"
            className={`scale-110 relative z-[4]
            ${
              !isLargeScreen || (isLargeScreen && cardHovered)
                ? 'animate-[zoom-out_0.8s_ease-out_forwards]'
                : ''
            }`}
            threshold={1}
          /> */}
          <div className="w-full h-full md:hidden relative z-[3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={posterUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <SmartVideo
            src={videoUrl}
            poster={posterUrl}
            wrapClassName="h-full hidden md:block"
            className={`scale-110 relative z-[4]
            ${
              !isLargeScreen || (isLargeScreen && cardHovered)
                ? 'animate-[zoom-out_0.8s_ease-out_forwards]'
                : ''
            }`}
          />
          <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-dark/50 to-dark/15 z-[4]" />
        </div>
      </li>
    );
  }
);
ServiceCard.displayName = 'ServiceCard';

export const BreakdownSingle = ({
  text,
  className,
  noDecorationInXL,
  tickDecoration,
}: ComponentPropsWithRef<'li'> & {
  text: string;
  noDecorationInXL?: boolean;
  tickDecoration?: boolean;
}) => {
  return (
    <li
      className={cn(
        `w-fit flex items-center gap-2 typo-body-4 leading-[1.2] md:leading-[1.2] text-white/85`,
        className
      )}>
      <span className={`${noDecorationInXL ? 'xl:hidden' : ''}`}>{tickDecoration ? '✓' : '-'}</span>
      <span className="text-wrap break-words text-start">{text}</span>
    </li>
  );
};
