'use client';

import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { PageSideCaption } from '@/components/general/PageSideCaption';
import { changingContactTitleModifiers } from '@/lib/constants/texts';
import { useEffect, useState } from 'react';
import PinpointContacts from '../../general/PinpointContacts';

export default function ContactPageContent() {
  return (
    <section className="w-full h-screen bg-dark text-white relative overflow-hidden">
      <video
        src="/videos/contact-animation.webm"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay bg-[#00000022] inset-0 z-10 absolute h-screen w-screen"></div>
      <div className="hero-content w-full-h-full absolute inset-0 pinpoint-container touch-events-none z-30">
        <div className="w-full h-full justify-center lg:justify-between flex-col  flex gap-16 lg:gap-0  lg:flex-row place-items-center mt-12 md:mt-4 lg:mt-0 relative ">
          <div className="w-full lg:w-3/7 grid gap-2 ">
            <div className="w-full h-fit flex items-center justify-between pb-4 lg:pb-12">
              <h1 className="typo-h1">
                <ChangingModifier />
              </h1>
            </div>
            <p className="bottom-[3.125rem] md:bottom-0 left-0 w-full lg:pt-0 text-[1.15rem] typo-body-3 md:typo-body-1 md:text-[1.4rem] break-words text-wrap">
              Transform your ideas into reality with our creative communication agency in Brussels.
            </p>
            <p className="bottom-[3.125rem] md:bottom-0 left-0  w-fit md:w-4/5  lg:pt-0 text-sm  typo-body-2 md:text-base md:typo-subtitle leading-7 md:leading-8 break-words text-wrap">
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
              />
              <PinpointBtn
                variant="default"
                className="border bg-transparent border-white text-white"
                text="Join the team"
                linkProps={{ href: '/jobs' }}
              />
            </div>
          </div>
          <PinpointContacts />
        </div>
      </div>

      <PageSideCaption caption="CONTACT" className="opacity-100 text-white" noDefaultOpacity />
    </section>
  );
}

const ChangingModifier = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % changingContactTitleModifiers.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return changingContactTitleModifiers[index];
};
