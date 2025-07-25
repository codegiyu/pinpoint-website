import { contactInformation } from '@/lib/constants/texts';
import Link from 'next/link';
import { PinpointSocials } from '@/components/general/Socials';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { LogoAd, LogoText } from '@/components/icons';

export default function JobsDetailsFooter() {
  return (
    <footer className="bg-gray-f2 w-full py-10 lg:py-28">
      <div className="grid gap-4 justify-start items-start w-full mx-auto py-8 md:flex xl:gap-16 md:bg-white md:gap-16 md:justify-between md:w-8/12 md:py-20 xl:py-16 px-8 sm:px-16 md:px-20 lg:w-8/10 lg:justify-around 2xl:gap-20 xl:px-36 xl:w-7/10">
        <GhostBtn
          linkProps={{ href: '/' }}
          className="pointer-events-auto self-start justify-self-start h-full block md:self-start md:justify-self-start lg:self-center lg:justify-self-center lg:2/10">
          <div className="w-fit flex items-center text-[1.8125rem] md:text-[2.0625rem]  xl:text-[clamp(33px,_2.463vw,_42px)] pb-4 md:pb-0">
            <LogoAd />
            <LogoText />
          </div>
        </GhostBtn>
        <div className="grid gap-6 lg:flex items-center md:self-end md:justify-self-end md:gap-6 justify-between md:w-2/3 lg:w-8/10 text-xs xl:text-sm xl:typo-body-4 font-light lg:typo-body-3">
          <div className="grid gap-2 lg:gap-2 text-xs md:typo-body-4 font-light lg:typo-body-3 underline">
            {contactInformation.address.map((address, index) => (
              <p key={index}>{address}</p>
            ))}
          </div>

          <div className="grid gap-2 lg:gap-2 font-light lg:typo-body-3">
            <p className="flex gap-1">
              <label htmlFor="phone-number" className="font-medium">
                T
              </label>
              :
              <Link href={`tel:${contactInformation.tel}`} id="phone-number">
                {contactInformation.tel}
              </Link>
            </p>
            <p>
              <Link href={`mailto:${contactInformation.email}`} id="email">
                {contactInformation.email}
              </Link>
            </p>
          </div>

          <div className="pt-3 md:pt-6 lg:pt-0 flex items-center">
            <PinpointSocials variant="black" />
          </div>
        </div>
      </div>
    </footer>
  );
}
