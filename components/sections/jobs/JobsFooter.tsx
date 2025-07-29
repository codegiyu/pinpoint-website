import { PinpointBtn } from '@/components/atoms/PinpointBtn';

export default function JobsFooter() {
  return (
    <section className=" pb-20 px-4 bg-gray-f2 ">
      <div className=" py-16 space-y-8  grid place-items-center gap-6 bg-gray-f2">
        <p className="typo-body-3 text-[15.5px] md:text-[1.2rem] leading-8 font-light w-9/10 mx-auto break-words md:w-5/10 text-center">
          No offer corresponding to your profile but you have an exceptional talent to share?
        </p>
        <PinpointBtn
          variant="secondary"
          text="Your spontaneous candidature"
          className="font-medium"
          linkProps={{
            href: '/join-our-team',
          }}
        />
      </div>
    </section>
  );
}
