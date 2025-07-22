'use client';

import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { PageSideCaption } from '@/components/general/PageSideCaption';
import { changingContactTitleModifiers } from '@/lib/constants/texts';
import { useEffect, useState } from 'react';
import PinpointContacts from '../../general/PinpointContacts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ContactPageContent() {
  return (
    <section className="w-full min-h-[105vh] md:h-screen inset-0 pb-4 text-white overflow-hidden ">
      <video
        src="/videos/contact-animation.webm"
        className="w-full min-h-[105vh] md:h-screen relative inset-0 object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay bg-[#00000022] inset-0 z-10 absolute min-h-[105vh] md:h-screen w-screen"></div>
      <div className="hero-content absolute inset-0 pinpoint-container touch-events-none z-30 ">
        <div className="md:w-full md:h-full justify-center lg:justify-between flex-col flex gap-12 md:gap-16 lg:gap-0 lg:flex-row place-items-center mt-24 md:mt-6 lg:mt-0 relative ">
          <div className="w-full lg:w-3/7 grid gap-2 ">
            <h1 className="typo-h1 h-[5rem] md:h-[7rem] lg:mb-10">
              <ChangingModifier textsArray={changingContactTitleModifiers} />
            </h1>

            <p className="bottom-[3.125rem] md:bottom-0 left-0 w-full lg:pt-0 text-[1.15rem] typo-body-3 md:typo-body-1 md:text-[1.4rem] md:tracking-wider leading-6.5 md:leading-normal break-words text-wrap">
              Transform your ideas into reality with our <br className="hidden md:block" /> creative
              communication agency in Brussels.
            </p>
            <p className="bottom-[3.125rem] md:bottom-0 left-0  w-fit md:w-4/5  lg:pt-0 text-sm  typo-body-2 sm:text-base md:text-[18px] md:typo-subtitle leading-6 md:tracking-wide md:leading-8 break-words text-wrap">
              Our mission is to elevate your ideas into accomplished projects with elegance and
              precision. As experts in web design, logo creation and brand strategies, our
              communication agency in Brussels develops tailored solutions to make your brand shine
              while perfectly addressing your challenges
            </p>

            <div className="grid md:flex gap-6 pt-4 md:pt-8">
              <PinpointBtn
                variant="default"
                className="bg-white text-black"
                text="Start a project"
                linkProps={{ href: '/starting-a-new-project' }}
                animate={{
                  axis: 'y',
                  duration: 0.2,
                }}
              />
              <PinpointBtn
                variant="default"
                className="border bg-transparent border-white text-white transition-all duration-500 ease-in-out hover:outline-3 hover:outline-white hover:-outline-offset-3"
                text="Join the team"
                linkProps={{ href: '/jobs' }}
                animate={{ axis: 'y', duration: 0.2 }}
              />
            </div>
          </div>
          <PinpointContacts />
        </div>
      </div>

      <PageSideCaption
        caption="CONTACT"
        className="opacity-100 text-white mix-blend-normal"
        noDefaultOpacity
      />
    </section>
  );
}

export function ChangingModifier({
  textsArray,
  duration = 2200,
  wrapClassName,
}: {
  textsArray: string[];
  duration?: number;
  wrapClassName?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % textsArray.length);
    }, duration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className={cn('inline-block relative w-full h-full overflow-hidden', wrapClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={textsArray[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0">
          {textsArray[index]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
