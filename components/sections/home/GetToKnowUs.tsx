import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export const GetToKnowUs = () => {
  return (
    <DescriptionTextSection
      text="Achieve your communication goals with Atelier Design : Get your message out, reflect who
      you are, be your own ambassador. Our creative communication agency based in Brussels
      produces powerful, innovative and digital projects that are tailor-made and effective.
      You'll love it.">
      <PinpointBtn linkProps={{ href: '/about-us' }} variant="secondary" text="Get to know us" />
    </DescriptionTextSection>
  );
};

export const DescriptionTextSection = ({
  className,
  children,
  text,
}: PropsWithChildren<{ className?: string; text: string }>) => {
  return (
    <section className={cn('section-block-padding bg-white relative z-[3]', className)}>
      <div className="pinpoint-container">
        <div className="w-full lg:max-w-[720px] xl:max-w-[782px] 1400:max-w-[950px] grid gap-16 mx-auto px-0">
          <p className="typo-body-1 font-light">{text}</p>
          {children}
        </div>
      </div>
    </section>
  );
};
