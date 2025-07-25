import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { PageSideCaption } from '@/components/general/PageSideCaption';
import { changingContactTitleModifiers } from '@/lib/constants/texts';
import PinpointContacts from '../../general/PinpointContacts';
import { ChangingModifier } from '@/components/general/ChangingModifier';

export default function ContactPageContent() {
  return (
    <section className="w-full min-h-screen relative inset-0 text-white ">
      <video
        src="/videos/contact-animation.webm"
        className="w-full h-screen relative inset-0 object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay bg-[#00000022] inset-0 z-10 absolute min-h-screen w-full "></div>
      <div className="hero-content absolute inset-0 pinpoint-container touch-events-none z-30 ">
        <div className="md:w-full md:h-full justify-center lg:justify-between flex-col flex gap-12 md:gap-16 lg:gap-0 lg:flex-row place-items-center mt-24 md:mt-6  lg:mt-0 relative ">
          <div className="w-full lg:w-3/7 grid gap-2 ">
            <h1 className="typo-h1 h-[5rem] md:h-[7rem] lg:mb-10">
              <ChangingModifier textsArray={changingContactTitleModifiers} />
            </h1>

            <p className="bottom-[3.125rem] md:bottom-0 left-0 w-full lg:pt-0 text-[1.15rem] typo-body-3 md:typo-body-1 md:text-[1.4rem] md:tracking-wider leading-6.5 md:leading-normal break-words text-wrap">
              Transform your ideas into reality with our <br className="hidden md:block" /> creative
              communication agency in Brussels.
            </p>
            <p className="bottom-[3.125rem] md:bottom-0 left-0  w-fit md:w-4/5  lg:pt-0 text-sm  typo-body-2 sm:text-base md:text-[18px] md:typo-subtitle leading-6 md:tracking-wide md:leading-8 break-words text-wrap">
              Our mission is to elevate your ideas into accomplished projects with elegance and
              precision. As experts in web design, logo creation and brand strategies, our
              communication agency in Brussels develops tailored solutions to make your brand shine
              while perfectly addressing your challenges
            </p>

            <div className="grid md:flex gap-6 pt-4 md:pt-8">
              <PinpointBtn
                variant="default"
                className="bg-white text-black"
                text="Start a project"
                linkProps={{ href: '/starting-a-new-project' }}
                animate={{
                  axis: 'y',
                  duration: 0.1,
                }}
              />
              <PinpointBtn
                variant="default"
                className="border bg-transparent border-white text-white transition-all duration-500 ease-in-out hover:outline-3 hover:outline-white hover:-outline-offset-3"
                text="Join the team"
                linkProps={{ href: '/jobs' }}
                animate={{ axis: 'y', duration: 0.1 }}
              />
            </div>
          </div>
          <PinpointContacts />
        </div>
      </div>

      <PageSideCaption
        caption="CONTACT"
        className="opacity-100 text-white mix-blend-normal"
        noDefaultOpacity
      />
    </section>
  );
}
