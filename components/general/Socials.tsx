import { contactInformation } from '@/lib/constants/texts';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ComponentType, SVGProps } from 'react';

export const PinpointSocials = () => {
  return (
    <div className="flex gap-2">
      {contactInformation.socials.map((item, index) => (
        <SocialBtn {...item} key={index} />
      ))}
    </div>
  );
};

export interface SocialBtnProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  url: string;
  title: string;
}

export const SocialBtn = ({ Icon, url, title }: SocialBtnProps) => {
  return (
    <Link
      href={url}
      className="group w-[3.125rem] aspect-square md:size-[4rem] rounded-full grid place-items-center p-2 border border-white transition-colors relative overflow-hidden duration-1500  ">
      <span className="sr-only">{title}</span>
      <span className="block relative h-fit aspect-square overflow-hidden">
        <motion.span
          transition={{ ease: [0.25, 1, 0.5, 1] }}
          className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards] ">
          <Icon className="text-xl" />
        </motion.span>
        <motion.span
          transition={{ ease: [0.25, 1, 0.5, 1] }}
          className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
          <Icon className="text-xl" />
        </motion.span>
      </span>
    </Link>
  );
};
