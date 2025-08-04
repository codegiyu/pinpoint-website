'use client';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { PageSideCaption } from '@/components/general/PageSideCaption';
import { changingContactTitleModifiers } from '@/lib/constants/texts';
import PinpointContacts from '../../general/PinpointContacts';
import { ChangingModifier } from '@/components/general/ChangingModifier';
import { SmartVideo } from '@/components/general/SmartVideo';
import { motion } from 'motion/react';

export default function ContactPageContent() {
  return (
    <section className="w-full min-h-screen pb-4 text-white relative overflow-hidden">
      <SmartVideo
        src="/videos/contact-animation.webm"
        wrapClassName="h-full"
        className="absolute z-[1] inset-0 object-cover"
      />
      <div className="overlay bg-[#00000040] inset-0 z-[2] absolute h-full" />
      <div className="hero-content pinpoint-container touch-events-none pt-10 md:pt-40 lg:pt-60 pb-10 relative z-[3]">
        <div
          className="md:w-full md:h-full justify-center lg:justify-between flex-col flex \
          gap-12 md:gap-16 lg:gap-0 lg:flex-row place-items-center mt-24 md:mt-6 lg:mt-0 \
          relative ">
          <motion.div
            initial={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="w-full lg:w-3/7 grid gap-2">
            <h1 className="typo-h1 h-[5rem] md:h-[7rem] lg:mb-10">
              <ChangingModifier textsArray={changingContactTitleModifiers} />
            </h1>

            <motion.p
              initial={{ opacity: 0, translateY: 60 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1, delay: 2.1 }}
              className="bottom-[3.125rem] md:bottom-0 left-0 w-full lg:pt-0 text-[1.15rem] typo-body-3 md:typo-body-1 md:text-[1.4rem] md:tracking-wider leading-6.5 md:leading-normal break-words text-wrap">
              Transform your ideas into reality with our{' '}
              <br className="hidden md:block lg:hidden" /> branding, marketing and packaging agency.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, translateY: 60 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1, delay: 2.3 }}
              className="bottom-[3.125rem] md:bottom-0 left-0 w-fit md:w-4/5 lg:w-full lg:pt-0 typo-body-7 break-words text-wrap">
              Our mission is to empower brands globally by providing innovative, strategic branding
              solutions that solve complex challenges and create memorable, lasting impressions. We
              are dedicated to transforming businesses into iconic brands by offering tailored
              branding solutions that ensure success in an ever-evolving global marketplace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, translateY: 60 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="grid md:flex gap-6 pt-4 md:pt-8">
              <PinpointBtn
                variant="default"
                className="bg-white text-black"
                text="Start a project"
                linkProps={{ href: '/starting-a-new-project' }}
                animate={{
                  axis: 'y',
                  duration: 0.1,
                }}
              />
              <PinpointBtn
                variant="default"
                className="border bg-transparent border-white text-white transition-all duration-500 ease-in-out hover:outline-3 hover:outline-white hover:-outline-offset-3"
                text="Join the team"
                linkProps={{ href: '/jobs' }}
                animate={{ axis: 'y', duration: 0.1 }}
              />
            </motion.div>
          </motion.div>
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
