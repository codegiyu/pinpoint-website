import { contactInformation } from '@/lib/constants/texts';
import Link from 'next/link';
// import { motion } from 'framer-motion';
import { ComponentType, SVGProps } from 'react';
import { cn } from '@/lib/utils';

export interface SocialBtnProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  url: string;
  title: string;
}

interface SocialBtnVariant extends SocialBtnProps {
  variant?: 'black' | 'white';
}

export const PinpointSocials = ({ variant = 'white' }: Pick<SocialBtnVariant, 'variant'>) => {
  return (
    <div className="flex gap-2">
      {contactInformation.socials.map((item, index) => (
        <SocialBtn {...item} key={index} variant={variant} />
      ))}
    </div>
  );
};

export const SocialBtn = ({ Icon, url, title, variant = 'white' }: SocialBtnVariant) => {
  return (
    <Link
      href={url}
      className={cn(
        'group w-[3.125rem] aspect-square md:size-[3.5rem] xl:size-[4rem] rounded-full grid place-items-center  border transition-colors relative overflow-hidden duration-1500 ',
        variant === 'black' ? 'border-gray-300' : 'border-white p-2'
      )}>
      <span className="sr-only">{title}</span>
      <span className="block relative h-fit aspect-square overflow-hidden">
        <span
          // transition={{ ease: [0.25, 1, 0.5, 1] }}
          className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards] ">
          <Icon className="text-xl" />
        </span>
        <span
          // transition={{ ease: [0.25, 1, 0.5, 1] }}
          className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
          <Icon className="text-xl" />
        </span>
      </span>
    </Link>
  );
};
