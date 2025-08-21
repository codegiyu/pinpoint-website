import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string | ReactNode;
  caption: string;
  className?: string;
  titleClassName?: string;
  captionClassName?: string;
}

export const SectionHeader = ({
  title,
  caption,
  className,
  titleClassName,
  captionClassName,
}: SectionHeaderProps) => {
  return (
    <div className={cn('w-full grid gap-5', className)}>
      <h2 className={cn('typo-caption-small uppercase', captionClassName)}>{caption}</h2>
      <p className={cn('typo-h2', titleClassName)}>{title}</p>
    </div>
  );
};
