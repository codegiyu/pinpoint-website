'use client';
import { pinpointSocials } from '@/lib/constants/texts';
import Link from 'next/link';
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
    <div className="w-fit flex gap-2">
      {pinpointSocials.map((item, index) => (
        <SocialBtn {...item} key={index} variant={variant} />
      ))}
    </div>
  );
};

export const SocialBtn = ({ Icon, url, title, variant = 'white' }: SocialBtnVariant) => {
  return (
    <Link
      href={url}
      target="_blank"
      className={cn(
        'group w-[3.125rem] aspect-square md:size-[3.5rem] xl:size-[4rem] rounded-full grid place-items-center  border transition-colors relative overflow-hidden duration-1500 ',
        variant === 'black'
          ? 'border-gray-59/55 hover:border-dark hover:text-dark'
          : 'border-[currentColor] hover:border-white hover:text-white p-2'
      )}>
      <span className="sr-only">{title}</span>
      <span className="block relative h-fit aspect-square overflow-hidden">
        <span className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards] ">
          <Icon className="text-xl" />
        </span>
        <span className="block relative h-full top-0 left-0 w-full group-hover:animate-[slideY_0.2s_ease-in-out_forwards]">
          <Icon className="text-xl" />
        </span>
      </span>
    </Link>
  );
};
