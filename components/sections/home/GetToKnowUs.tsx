import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export const GetToKnowUs = () => {
  return (
    <DescriptionTextSection
      text="Build a brand people remember with Pinpoint Global.
      We help you connect, communicate, and create impact, through 
      strategy, design, content, and experiences that reflect 
      who you are. From branding to digital to packaging, we craft 
      thoughtful, purpose-driven work that moves people. Let's make 
      something meaningful.">
      <PinpointBtn
        linkProps={{ href: '/about-us' }}
        variant="secondary"
        text="Get to know us"
        animate
      />
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
