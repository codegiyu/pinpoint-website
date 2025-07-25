'use client';

import { GhostBtn } from '@/components/atoms/GhostBtn';
import { ChangingModifier } from '@/components/general/ChangingModifier';
import { HeroArrow } from '@/components/general/HeroArrow';
import { MacaronTextEn, MacaronTextePlayEn } from '@/components/icons';
import { changingHeroTitleModifiers } from '@/lib/constants/texts';
import { PropsWithVideoDisplayRef } from '@/lib/types/general';

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
            <span className="typo-subtitle">Your Branding, Marketing, and Packaging Solution</span>
            <div className="w-full h-fit flex items-center justify-between">
              <h1 className="typo-h1 w-full">
                <div className="w-full inline-grid md:grid-cols-[auto_1fr] items-center md:gap-2 lg:gap-4">
                  <p className="inline-block">We build </p>
                  <ChangingModifier
                    textsArray={changingHeroTitleModifiers}
                    wrapClassName="h-[calc((10vw_+_3px)_*_1.2)] sm:h-[calc(3.3125rem_*_1.2)] md:h-full"
                  />
                </div>
                <br />
                <span>that mean something</span>
              </h1>
              <GhostBtn className="hidden lg:block relative" wrapClassName="flex-none">
                <MacaronTextEn className="macaron homepage-macaron animate-spin animation-duration-[10s]" />
                <MacaronTextePlayEn className="half-macaron homepage-half-macaron absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
              </GhostBtn>
            </div>
            <p
              className="lg:hidden absolute md:relative bottom-[3.125rem] md:bottom-0 
              left-0 w-[70%] md:w-fit md:pt-5 lg:pt-0 typo-caption-large md:italic 
              lg:not-italic break-words text-wrap">
              Because beauty&apos;s better with purpose.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-4/5 max-w-[1600px] lg:absolute lg:bottom-[2.5vh] lg:left-1/2 lg:-translate-x-1/2 justify-end">
        <p className="typo-caption-large md:italic lg:not-italic break-words text-wrap">
          <span className="hidden lg:block">Because beauty&apos;s</span>
          <span className="hidden lg:block">better with purpose</span>
        </p>
      </div>
      <HeroArrow
        id="move-down-arrow"
        className="block md:hidden lg:block text-white absolute lg:fixed 
        bottom-[3.75rem] lg:bottom-[5vh] right-[7.1vw] lg:right-auto 
        lg:left-[7.1vw] xl:left-[5vw] z-[2]"
      />
    </section>
  );
};
