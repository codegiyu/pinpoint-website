/* eslint-disable @next/next/no-img-element */
import { RenderedServiceProps } from '@/app/projects/[projectId]/page';
import { Article } from '@/components/general/Article';
import { cn } from '@/lib/utils';
import { omit } from 'lodash';

export const RenderedService = ({
  index,
  caption,
  title,
  description,
  sectionBg,
  textColorClass,
  images,
}: RenderedServiceProps) => {
  return (
    <section
      className={cn(
        'w-full relative z-[2]',
        sectionBg || 'bg-white',
        textColorClass || 'text-dark'
      )}>
      <div className="pinpoint-container py-[12vw] md:py-[6.75rem] lg:py-[8.375rem] xl:py-[9.375rem]">
        <div className="w-full relative mb-[30px]">
          <h2 className="text-[0.9375rem] xl:text-[clamp(0.9375rem,_1.493vw,_1.125rem)] text-current">
            {caption}
          </h2>
          {index && (
            <div className="w-fit h-fit hidden md:flex items-center gap-2 absolute top-1/2 right-full -translate-y-1/2">
              <span className="typo-tiny leading-none text-current">{index}</span>
              <div className="w-6 h-[1px] bg-current" />
              <span></span>
            </div>
          )}
        </div>
        <h3
          className="text-[1.375rem] lg:text-[2.125rem] xl:text-[clamp(2.125rem,_1.493vw,_2.625rem)] \
          leading-[1.1] md:leading-[1.2] font-bold text-current pb-[28px] md:pb-[45px]">
          {title}
        </h3>
        <Article
          paragraphs={description}
          textClassName="typo-body-4 leading-[1.85] md:leading-[1.778] text-current/85"
        />
      </div>
      <div className="w-full flex flex-wrap">
        {images.map((img, idx) => (
          <img
            key={idx}
            alt={img.alt}
            className={cn('flex-none aspect-auto object-cover', img.className)}
            {...omit(img, ['className', 'alt'])}
          />
        ))}
      </div>
    </section>
  );
};
