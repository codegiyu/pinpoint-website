/* eslint-disable @next/next/no-img-element */
import { FullProjectData } from '@/app/projects/[projectId]/page';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { servicesLookup } from '@/lib/constants/texts';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import { useMemo } from 'react';

export type ProjectIntroductionProps = Pick<
  FullProjectData,
  | 'description'
  | 'descriptionBg'
  | 'descriptionHighlightPhotos'
  | 'textColorClass'
  | 'services'
  | 'extraServices'
  | 'createdWebsite'
>;

export const ProjectIntroduction = ({
  description,
  descriptionBg,
  descriptionHighlightPhotos,
  textColorClass,
  services,
  extraServices,
  createdWebsite,
}: ProjectIntroductionProps) => {
  const servicesArray = useMemo(() => {
    return services.map(service => ({
      href: `/services/${service}`,
      text: servicesLookup[service],
    }));
  }, [services]);

  return (
    <section
      className={cn(
        'w-full relative z-[2]',
        descriptionBg || 'bg-gray-f2',
        textColorClass || 'text-dark'
      )}>
      <div className="pinpoint-container py-[3.75rem] md:py-[6.75rem] lg:py-[8.375rem] xl:[9.375rem]">
        <div className="w-full grid lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="text-section xl:pl-24 2xl:pl-32 3xl:pl-40">
            <p className="typo-body-1 lg:text-[21px] xl:text-[25px] text-current">{description}</p>
          </div>
          <div className="w-fit h-fit grid pt-[3.75rem] md:pt-20 lg:pt-0">
            <div className="w-fit h-fit grid mb-6 xl:mb-[clamp(32px,_2.388vw,_42px)]">
              <h6 className="typo-menu uppercase text-current pb-1.5">Related Services</h6>
              <ul className="w-fit grid">
                {servicesArray.map(({ href, text }, idx) => (
                  <li key={idx} className="">
                    <GhostBtn linkProps={{ href }} wrapClassName="group relative">
                      <p className="typo-body-2 !leading-[1.4] text-current/65 group-hover:text-current/85 transition-all duration-300 ease-out">
                        {text}
                      </p>
                      <div
                        className="absolute bottom-0 left-0 h-[1px] w-full max-w-0 group-hover:max-w-full \
                        transition-all duration-300 ease-out bg-current/55"
                      />
                    </GhostBtn>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-fit h-fit grid">
              <h6 className="typo-menu uppercase text-current pb-1.5">Keywords</h6>
              <ul className="w-fit grid">
                {extraServices.map((text, idx) => (
                  <li key={idx} className="">
                    <p className="typo-body-4 !leading-[1.6] text-current/65"> {text}</p>
                  </li>
                ))}
              </ul>
            </div>
            {createdWebsite && (
              <GhostBtn
                linkProps={{ href: createdWebsite, target: '_blank', rel: 'noopener noreferrer' }}
                wrapClassName="group relative">
                <div className="w-fit flex items-center gap-2 mt-[3.125rem] relative">
                  <MoveRight className="w-7 stroke-1" />
                  <p className="text-[0.9375rem] leading-[1.4] font-bold ">Visit Website</p>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-[1px] w-full max-w-0 group-hover:max-w-full \
                  transition-all duration-300 ease-out bg-current/55"
                />
              </GhostBtn>
            )}
          </div>
        </div>
      </div>
      {descriptionHighlightPhotos.length > 0 &&
        descriptionHighlightPhotos.map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt={'Highlight Image ' + idx + 1}
            className="w-full aspect-auto object-cover"
          />
        ))}
    </section>
  );
};
