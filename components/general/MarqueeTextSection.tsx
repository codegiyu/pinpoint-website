import { cn } from '@/lib/utils';

export interface MarqueeTextSectionProps {
  text: string;
  animationDuration?: number;
  duplicationCount?: number;
  wrapClassName?: string;
  scrollContainerClassName?: string;
}

export const MarqueeTextSection = ({
  text,
  animationDuration = 40,
  duplicationCount = 20,
  wrapClassName,
  scrollContainerClassName,
}: MarqueeTextSectionProps) => {
  const scrollAnimation = 'animate-[marquee_' + animationDuration + 's_infinite_linear]';

  return (
    <div
      className={cn(
        'marquee md:bg-gray-f2 h-[calc(168px_+_5vh)] md:h-auto mt-[calc(-168px_-_5vh)] md:mt-0 pl-[10vw] relative z-[6] overflow-hidden',
        wrapClassName
      )}>
      <div
        id="scroll-text"
        className={cn(
          `w-[1000vw] ${scrollAnimation} flex flex-nowrap gap-12 typo-display text-white md:text-dark`,
          scrollContainerClassName
        )}>
        {Array(duplicationCount)
          .fill('')
          .map((_, idx) => (
            <p key={idx} className="flex-none py-[3.75rem] md:pb-[7.5rem]">
              {text}
            </p>
          ))}
      </div>
    </div>
  );
};
