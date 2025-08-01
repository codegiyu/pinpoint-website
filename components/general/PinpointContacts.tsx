import { PinpointSocials } from '@/components/general/Socials';
import Link from 'next/link';
import { contactInformation } from '@/lib/constants/texts';
import { motion } from 'motion/react';

export default function PinpointContacts({
  fullWidth,
  inDarkBg,
}: {
  fullWidth?: boolean;
  inDarkBg?: boolean;
}) {
  return (
    <div
      className={`grid gap-6 lg:gap-6 h-fit w-full ${fullWidth ? '' : 'lg:max-w-3/7'} lg:place-items-center`}>
      <div className="grid gap-10 sm:grid-cols-2">
        {contactInformation.map((group, idx) => (
          <ContactsGroup key={idx} {...group} inDarkBg={inDarkBg} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="flex lg:justify-center pt-3 md:pt-6">
        <PinpointSocials />
      </motion.div>
    </div>
  );
}

export interface ContactsGroupProps {
  location: string;
  address: string;
  tel: string[];
  email: string;
  inDarkBg?: boolean;
  showOpacity?: boolean;
}

export const ContactsGroup = ({
  location,
  address,
  tel,
  email,
  inDarkBg,
  showOpacity,
}: ContactsGroupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1, delay: 2.4 }}
      className="max-w-[150px] h-fit grid gap-2 md:gap-4">
      <h5 className="typo-h5 pb-2 text-wrap break-words ">{location}</h5>
      <p className={`typo-body-h7 ${showOpacity ? 'opacity-75' : ''}`}>{address}</p>
      <div className="grid gap-2">
        {tel.map((phone, idx) => (
          <p
            key={idx}
            className={`flex ${showOpacity ? 'opacity-75 hover:opacity-100' : ''} hover:underline ${inDarkBg ? 'hover:text-white' : 'hover:scale-105'} transition-all duration-500 ease-out`}>
            <Link href={`tel:${phone}`}>{phone}</Link>
          </p>
        ))}
      </div>
      <p
        className={`flex ${showOpacity ? 'opacity-75 hover:opacity-100' : ''} hover:underline ${inDarkBg ? 'hover:text-white' : 'hover:scale-105'} transition-all duration-500 ease-out`}>
        <Link href={`mailto:${email}`}>{email}</Link>
      </p>
    </motion.div>
  );
};
