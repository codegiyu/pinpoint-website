import { PinpointSocials } from '@/components/general/Socials';
import Link from 'next/link';
import { contactInformation } from '@/lib/constants/texts';

export default function PinpointContacts() {
  return (
    <div className="grid gap-2 lg:gap-4 w-full lg:w-2/7 place-items-start ">
      <h5 className="typo-h5 pb-2">Atelier Design</h5>
      <div className="grid gap-4 md:flex md:gap-16 lg:gap-8 lg:grid text-sm md:typo-body-3 md:text-[1.2rem] font-light lg:typo-body-2">
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
  );
}
