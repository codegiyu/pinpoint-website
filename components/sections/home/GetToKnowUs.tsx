import { PinpointBtn } from '@/components/atoms/PinpointBtn';

export const GetToKnowUs = () => {
  return (
    <section className="section-block-padding bg-white relative z-[5]">
      <div className="pinpoint-container">
        <div className="w-full lg:max-w-[720px] xl:max-w-[782px] 1400:max-w-[950px] grid gap-16 mx-auto px-0">
          <p className="typo-body-1 font-light">
            Achieve your communication goals with Atelier Design : Get your message out, reflect who
            you are, be your own ambassador. Our creative communication agency based in Brussels
            produces powerful, innovative and digital projects that are tailor-made and effective.
            You&apos;ll love it.
          </p>
          <PinpointBtn variant="secondary" text="Get to know us" />
        </div>
      </div>
    </section>
  );
};
