'use client';

import { GhostBtn } from '@/components/atoms/GhostBtn';
import { MacaronTextEn, MacaronTextePlayEn } from '@/components/icons';
import { changingHeroTitleModifiers } from '@/lib/constants/texts';
import { PropsWithVideoDisplayRef } from '@/lib/types/general';
import { MoveDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export const HomeHero = ({ videoDisplayRef }: PropsWithVideoDisplayRef) => {
  return (
    <section
      ref={videoDisplayRef}
      className="w-full h-screen bg-dark text-white relative overflow-hidden">
      <video
        src="/videos/home-animation.webm"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-content w-full-h-full absolute inset-0 pinpoint-container touch-events-none">
        <div className="w-full h-full grid place-items-center relative lg:static">
          <div className="w-full grid gap-0">
            <span className="typo-subtitle">Creative communications agency based in Brussels</span>
            <div className="w-full h-fit flex items-center justify-between">
              <h1 className="typo-h1">
                <span>
                  We create <ChangingModifier />
                </span>
                <br />
                <span>tools, not toys</span>
              </h1>
              <GhostBtn className="hidden lg:block relative">
                <MacaronTextEn className="macaron homepage-macaron animate-spin animation-duration-[10s]" />
                <MacaronTextePlayEn className="half-macaron homepage-half-macaron absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
              </GhostBtn>
            </div>
            <p className="lg:hidden absolute md:relative bottom-[3.125rem] md:bottom-0 left-0 w-[70%] md:w-fit md:pt-5 lg:pt-0 typo-caption-large md:italic lg:not-italic break-words text-wrap">
              But we love to play with them.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-4/5 max-w-[1600px] lg:absolute lg:bottom-[2.5vh] lg:left-1/2 lg:-translate-x-1/2 justify-end">
        <p className="typo-caption-large md:italic lg:not-italic break-words text-wrap">
          <span className="hidden lg:block">But we love to</span>
          <span className="hidden lg:block">play with them.</span>
        </p>
      </div>
      <MoveDown
        id="move-down-arrow"
        className="block md:hidden lg:block size-9 lg:size-12 text-white stroke-1 absolute lg:fixed bottom-[3.75rem] lg:bottom-[5vh] right-[7.1vw] lg:right-auto lg:left-[7.1vw] xl:left-[5vw] z-[2]"
      />
    </section>
  );
};

const ChangingModifier = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % changingHeroTitleModifiers.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return changingHeroTitleModifiers[index];
};
