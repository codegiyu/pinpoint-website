'use client';
import { contactInformation } from '@/lib/constants/texts';
import { PinpointSocials } from '@/components/general/Socials';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { PinpointFull } from '@/components/icons';
import { ContactsGroup } from '@/components/general/PinpointContacts';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="footer bg-gray-f2 w-full py-10 lg:py-28">
      <motion.section
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="pinpoint-container-mobile-w-full md:bg-white md:py-14 lg:py-16 2xl:py-20">
        <div className="flex-none w-[85.8vw] max-w-[495px] md:w-[28.4375rem] md:max-w-none lg:w-[38.25rem] xl:w-[48.875rem] 2xl:w-[59.375rem] grid gap-6 mx-auto relative z-[3]">
          <div className="w-fit grid gap-5 pb-8">
            <GhostBtn linkProps={{ href: '/' }} className="pointer-events-auto">
              <div className="w-fit flex items-center text-[1.125rem] md:text-[1.5rem] xl:text-[clamp(24px,_2.463vw,_32px)]">
                <PinpointFull id="footer-logo" className="logo" />
              </div>
            </GhostBtn>
            <p className="typo-body-7 text-gray-59/90">
              We are a creative brand consultancy into design, branding and packaging. We&apos;ve
              been collaborating with leading organizations to solve brand and business challenges
              since 2020. Our team across different locations uses the power of creativity to
              transform businesses for the better.
            </p>
          </div>
          <div className="w-full grid gap-8 sm:grid-cols-2 1400:grid-cols-4 text-dark/80">
            {contactInformation.map((group, idx) => (
              <ContactsGroup key={idx} {...group} showOpacity />
            ))}
          </div>

          <div className="w-full flex lg:justify-center pt-3 md:pt-6 text-dark/80">
            <PinpointSocials variant="black" />
          </div>
        </div>
      </motion.section>
    </footer>
  );
}
