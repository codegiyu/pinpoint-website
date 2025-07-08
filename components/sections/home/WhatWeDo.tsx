import { GhostBtn } from '@/components/atoms/GhostBtn';
import { services } from '@/lib/constants/texts';
import { splitTextIntoTwoWithBrTag } from '@/lib/utils/general';
import { MoveRight } from 'lucide-react';

export const WhatWeDo = () => {
  return (
    <section className="w-full bg-gray-f2 md:bg-dark grid gap-10 md:gap-5 xl:gap-[clamp(20px,_1.493vw,_30px)] py-0 md:pt-[4.375rem] xl:pt-[clamp(70px,_5.224vw,_88px)] relative overflow-hidden">
      <p className="pinpoint-container typo-caption-small uppercase md:text-white/70 mb-[2px] relative z-[10]">
        What We Do
      </p>

      <ul className="w-full max-w-full md:max-w-none md:w-[595px] lg:w-[684px] xl:w-[782px] 2xl:w-[950px] 3xl:w-[1024px] grid md:gap-[3.375rem] lg:gap-0 md:pt-10 md:pb-[3.125rem] lg:pt-5 xl:pt-[clamp(60px,_4.478vw,_112px)] xl:pb-[clamp(60px,_4.478vw,_112px)] mx-auto">
        {services.map((item, idx) => (
          <ServiceCard key={idx} {...item} />
        ))}
      </ul>
    </section>
  );
};

export interface ServiceCardProps {
  name: string;
  breakdown: string[];
  href: string;
  videoUrl: string;
}

const ServiceCard = ({ name, breakdown, href, videoUrl }: ServiceCardProps) => {
  return (
    <li className="group w-full relative md:static overflow-hidden lg:overflow-visible">
      <GhostBtn
        linkProps={{ href }}
        className="w-full py-10 md:py-[2.875rem] xl:py-[clamp(46px,_3.433vw,_58px)] relative z-10"
        wrapClassName="group peer relative lg:before:absolute lg:before:top-[9px] lg:before:left-1/2 
        lg:before:-translate-x-1/2 lg:before:w-[51.75rem] lg:before:h-full
        xl:before:w-[64rem] 2xl:before:w-[75rem] 3xl:before:w-[81.25rem] lg:before:shadow-[inset_0_0_0_9px_#fff] 
        lg:before:transition-[opacity_0.7s_cubic-bezier(.39,.575,.565,1)] 
        lg:hover:before:transition-none lg:before:opacity-0 lg:hover:before:opacity-100">
        <div className="w-[85.8vw] max-w-[495px] md:w-[32.8125rem] md:max-w-none lg:w-full grid gap-[1.875rem] text-white mx-auto">
          <h4 className="typo-h4 text-start">{splitTextIntoTwoWithBrTag(name)}</h4>
          <ul className="grid">
            {[...breakdown, '...'].map((item, idx) => (
              <li key={idx} className="w-fit flex items-center gap-2 typo-body-4 text-white/85">
                <span className="">-</span>
                <span className="">{item}</span>
              </li>
            ))}
          </ul>
          <div className="w-full flex items-center justify-between">
            <span className="typo-button font-semibold">View more</span>
            <div className="size-[3.125rem] rounded-full grid place-items-center border border-white/30 group-hover:border-white transition-[border_0.4s_ease-in-out]">
              <MoveRight className="size-5 text-white/80" />
            </div>
          </div>
        </div>
      </GhostBtn>
      <div className="video-box w-full h-full absolute inset-0 block md:hidden lg:peer-hover:block">
        <video
          src={videoUrl}
          className="w-full h-full object-cover scale-120 relative z-[5]"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-dark/50 to-dark/15 z-[5]" />
      </div>
    </li>
  );
};
