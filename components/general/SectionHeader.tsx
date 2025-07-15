import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string | ReactNode;
  caption: string;
  className?: string;
  titleClassName?: string;
}

export const SectionHeader = ({
  title,
  caption,
  className,
  titleClassName,
}: SectionHeaderProps) => {
  return (
    <div className={cn('w-full grid gap-5', className)}>
      <h2 className="typo-caption-small uppercase">{caption}</h2>
      <p className={cn('typo-h2', titleClassName)}>{title}</p>
    </div>
  );
};
