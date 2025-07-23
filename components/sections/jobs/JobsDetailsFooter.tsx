import { contactInformation } from '@/lib/constants/texts';
import Link from 'next/link';
import { PinpointSocials } from '@/components/general/Socials';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { LogoAd, LogoText } from '@/components/icons';

export default function JobsDetailsFooter() {
  return (
    <footer className="bg-gray-f2 w-full py-20">
      <div className="flex gap-2 lg:gap-4 place-items-start bg-white w-[70vw] mx-auto items-center justify-between py-16 px-24">
        <GhostBtn linkProps={{ href: '/' }} className="pointer-events-auto">
          <div className="w-fit flex items-center text-[1.8125rem] md:text-[2.0625rem] xl:text-[clamp(33px,_2.463vw,_42px)]">
            <LogoAd />
            <LogoText />
          </div>
        </GhostBtn>
        <div className="grid gap-4 md:flex md:gap-16 lg:gap-16 lg:flex text-sm md:typo-body-3 md:text-[1.2rem] font-light lg:typo-body-2">
          <div className="grid gap-2">
            {contactInformation.address.map((address, index) => (
              <p key={index}>{address}</p>
            ))}
          </div>

          <div className="grid gap-0 lg:gap-2">
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
        </div>

        <div className="pt-3 md:pt-6">
          <PinpointSocials />
        </div>
      </div>
    </footer>
  );
}
