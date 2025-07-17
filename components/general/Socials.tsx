import { contactInformation } from '@/lib/constants/texts';
import Link from 'next/link';

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
      className="size-[3.125rem] md:size-[4rem] rounded-full grid place-items-center p-2 border border-white group-hover:border-white transition-[border_0.4s_ease-in-out]">
      <span className="sr-only">{title}</span>
      <Icon className="text-xl" />
    </Link>
  );
};
