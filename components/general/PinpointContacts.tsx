import { PinpointSocials, PinpointSocialApiItem } from '@/components/general/Socials';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { ContactsGroupProps } from './PinpointContactsTypes';

export type { ContactsGroupProps } from './PinpointContactsTypes';

export default function PinpointContacts({
  fullWidth,
  inDarkBg,
  noTransitionDelay,
  contactInformation,
  pinpointSocials,
}: {
  fullWidth?: boolean;
  inDarkBg?: boolean;
  noTransitionDelay?: boolean;
  contactInformation: ContactsGroupProps[];
  pinpointSocials: PinpointSocialApiItem[];
}) {
  return (
    <div
      className={`grid gap-6 lg:gap-6 h-fit w-full ${fullWidth ? '' : 'lg:max-w-3/7'} lg:place-items-center`}>
      <div className="grid gap-10 sm:grid-cols-2">
        {contactInformation.map((group, idx) => (
          <ContactsGroup
            key={idx}
            {...group}
            inDarkBg={inDarkBg}
            noTransitionDelay={noTransitionDelay}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, translateY: noTransitionDelay ? 50 : 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, delay: noTransitionDelay ? 0 : 2.6 }}
        className="flex lg:justify-center pt-3 md:pt-6">
        <PinpointSocials items={pinpointSocials} />
      </motion.div>
    </div>
  );
}

export const ContactsGroup = ({
  location,
  address,
  tel,
  email,
  links,
  inDarkBg,
  showOpacity,
  noTransitionDelay,
}: ContactsGroupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: noTransitionDelay ? 50 : 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1, delay: noTransitionDelay ? 0 : 2.4 }}
      className="max-w-[150px] h-fit grid gap-2 md:gap-4">
      <h5 className="typo-h5 pb-2 text-wrap break-words ">{location}</h5>
      {links ? (
        <div className="grid gap-2">
          {links.map((link, idx) => (
            <p
              key={idx}
              className={`flex ${showOpacity ? 'opacity-75 hover:opacity-100' : ''} hover:underline ${inDarkBg ? 'hover:text-white' : 'hover:scale-105'} transition-all duration-500 ease-out`}>
              <Link href={link.href}>{link.label}</Link>
            </p>
          ))}
        </div>
      ) : (
        <>
          {address && (
            <p className={`typo-body-h7 ${showOpacity ? 'opacity-75' : ''}`}>{address}</p>
          )}
          {tel && tel.length > 0 && (
            <div className="grid gap-2">
              {tel.map((phone, idx) => (
                <p
                  key={idx}
                  className={`flex ${showOpacity ? 'opacity-75 hover:opacity-100' : ''} hover:underline ${inDarkBg ? 'hover:text-white' : 'hover:scale-105'} transition-all duration-500 ease-out`}>
                  <Link href={`tel:${phone.replaceAll(' ', '')}`}>{phone}</Link>
                </p>
              ))}
            </div>
          )}
          {email && (
            <p
              className={`flex ${showOpacity ? 'opacity-75 hover:opacity-100' : ''} hover:underline ${inDarkBg ? 'hover:text-white' : 'hover:scale-105'} transition-all duration-500 ease-out`}>
              <Link href={`mailto:${email}`}>{email}</Link>
            </p>
          )}
        </>
      )}
    </motion.div>
  );
};
