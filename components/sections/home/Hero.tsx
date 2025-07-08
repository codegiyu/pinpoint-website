'use client';

import { GhostBtn } from '@/components/atoms/GhostBtn';
import { MacaronTextEn, MacaronTextePlayEn } from '@/components/icons';
import { changingHeroTitleModifiers } from '@/lib/constants/texts';
import { MoveDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export const HomeHero = () => {
  return (
    <section className="w-full h-screen bg-dark text-white relative overflow-hidden">
      <video
        src="/videos/home-animation.webm"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-content w-full-h-full absolute inset-0 pinpoint-container touch-events-none">
        <div className="w-full h-full grid place-items-center">
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
          </div>
        </div>
      </div>
      <MoveDown className="block md:hidden lg:block size-9 text-white stroke-1 absolute lg:fixed bottom-[3.75rem] right-[7.1vw] lg:right-auto lg:left-[7.1vw] z-[2]" />
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
