import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { SectionHeader } from '@/components/general/SectionHeader';
import { ourStoryTexts } from '@/lib/constants/texts';
import Image from 'next/image';

export const OurStory = () => {
  return (
    <section className="w-full bg-gray-f2 pt-[3.75rem] md:pt-[5.75rem] lg:pt-[7.5rem] xl:pt-[9rem] overflow-hidden relative">
      <div className="pinpoint-container grid lg:gap-[3.75rem] xl:gap-7">
        <div className="w-full grid lg:grid-cols-[59fr_41fr] lg:gap-[3.75rem] relative z-[5]">
          <div className="w-full h-fit md:max-w-[455px] lg:max-w-none mx-auto">
            <SectionHeader caption="Once upon a time" title="A story of complementarity" />
            <div className="w-full xl:w-[450px] pt-5 pb-10 md:pt-11 md:pb-[3.75rem] lg:pt-[3.75rem] lg:pb-0 xl:pt-[45px] xl:pb-[75px] xl:ml-auto xl:mr-7">
              <p className="typo-body-7 text-gray-59">{ourStoryTexts[0]}</p>
            </div>
          </div>
          <div className="w-full md:max-w-[455px] lg:max-w-none h-[100vw] max-h-[560px] lg:h-full lg:max-h-none my-[30px] md:my-0 mx-auto relative">
            <div className="absolute inset-0 w-[47vw] max-w-[270px] h-[70%] lg:w-[216px] lg:max-w-none lg:h-[325px] z-[6]">
              <div className="w-full h-full relative">
                <Image
                  src="/images/about-page/founder-image-1.webp"
                  alt=""
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[55vw] max-w-[315px] h-[60%] lg:w-[216px] lg:max-w-none lg:h-[300px] xl:w-[264px] xl:h-[320px]">
              <div className="w-full h-full relative">
                <Image
                  src="/images/about-page/founder-image-2.webp"
                  alt=""
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-[55fr_45fr] lg:gap-[3.75rem] lg:mb-[110px]">
          <div className="hidden lg:block w-full h-full relative">
            <div className="absolute inset-0 w-full xl:w-[90%] h-[calc(100%_+_50px)] xl:h-[calc(100%_+_70px)] z-[6]">
              <div className="w-full h-full relative">
                <Image
                  src="/images/about-page/founder-image-3.webp"
                  alt=""
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            </div>
          </div>
          <div
            className="w-full md:max-w-[455px] h-fit grid gap-10 pt-11 pb-[3.75rem] 
            md:pt-[3.75rem] md:pb-[6.25rem] lg:pt-0 lg:pb-[6rem] xl:pt-20 xl:pb-[8rem] mx-auto">
            <div className="w-full grid">
              {ourStoryTexts.slice(1).map((paragraph, idx) => (
                <p key={idx} className="typo-body-7 text-gray-59">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="w-full flex">
              <PinpointBtn
                variant="secondary"
                linkProps={{ href: '/our-works' }}
                text="See it to believe it"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden w-screen h-[100vw] md:h-[460px] mb-[6.25rem] relative">
        <div className="w-full h-full relative">
          <Image
            src="/images/about-page/founder-image-3.webp"
            alt=""
            className="w-full h-full object-cover"
            fill
          />
        </div>
      </div>

      <div className="w-full h-[21.875rem] xl:h-[450px] hidden md:block absolute -bottom-[15rem] z-0">
        <div className="w-full h-[150%] bg-white" />
      </div>
    </section>
  );
};
