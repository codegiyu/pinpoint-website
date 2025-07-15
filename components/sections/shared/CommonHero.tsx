/* eslint-disable jsx-a11y/alt-text */
import { HeroArrow } from '@/components/general/HeroArrow';
import { PageHeroCaption } from '@/components/general/HeroCaption';
import { cn } from '@/lib/utils';
import { omit } from 'lodash';
import Image, { ImageProps } from 'next/image';

interface BaseCommonHeroProps {
  caption: string;
  title: string;
  imageProps?: Omit<ImageProps, 'fill'>;
  videoURL?: string;
  bottomStripBackground?: string; // className
}

interface CommonHeroWithImageProps extends BaseCommonHeroProps {
  imageProps: Omit<ImageProps, 'fill'>;
  videoURL?: never;
}

interface CommonHeroWithVideoProps extends BaseCommonHeroProps {
  videoURL: string;
  imageProps?: never;
}

export type CommonHeroProps = CommonHeroWithImageProps | CommonHeroWithVideoProps;

export const CommonHero = ({
  caption,
  title,
  imageProps,
  videoURL,
  bottomStripBackground,
}: CommonHeroProps) => {
  return (
    <section className="w-full relative">
      <CommonHeroTextSection {...{ caption, title }} />
      <div
        className="img-container w-full md:w-[calc(595px_+_((100%_-_595px)_/_2))] 
        lg:w-[calc(828px_+_((100%_-_828px)_/_2))] h-[30rem] lg:h-[clamp(500px,_65vh,_650px)] 
        xl:w-[88vw] xl:h-[75vh] xl:min-h-[40.625rem] md:ml-auto">
        <div className="w-full h-full overflow-hidden">
          <div className="w-full h-full relative z-[1]">
            {imageProps && (
              <Image
                {...omit(imageProps, ['className'])}
                className={cn('w-full h-full object-cover', imageProps.className)}
                fill
              />
            )}
            {videoURL && (
              <video
                src={videoURL}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[21.875rem] hidden md:block absolute -bottom-[15rem] z-0">
        <div className={cn('w-full h-[150%] bg-gray-f2', bottomStripBackground)}></div>
      </div>
    </section>
  );
};

export const CommonHeroTextSection = ({
  caption,
  title,
  leanUI = false,
}: Pick<CommonHeroProps, 'caption' | 'title'> & { leanUI?: boolean }) => {
  const paddingBottom = `${leanUI ? 'pb-10' : 'pb-[6.25rem] md:pb-[10rem]'}`;

  return (
    <div
      className={`pinpoint-container xl:w-[61.875rem] 2xl:w-[70rem] lg:h-[70vh] 
      lg:flex items-center pt-[7.5rem] ${leanUI ? 'pt-[11rem]' : ''} ${paddingBottom} lg:py-0 
      xl:ml-[calc((100vw_-_794px)_/_2)] 2xl:ml-[calc((100vw_-_968px)_/_2)] relative`}>
      <div
        className={`w-full ${leanUI ? '' : 'max-h-[47.5rem] lg:max-h-none'} grid gap-[1.875rem] 
        lg:gap-9 xl:gap-[clamp(45px,_3vw,_55px)] lg:ml-[4.375rem] xl:ml-0 relative`}>
        <PageHeroCaption caption={caption} />
        <h1 className={`${leanUI ? '' : 'min-h-[34vh] md:min-h-auto'} typo-h2-hero`}>{title}</h1>
        {!leanUI && (
          <div className="w-full absolute -bottom-9 flex md:hidden justify-end">
            <HeroArrow className="" />
          </div>
        )}
      </div>
    </div>
  );
};
