'use client';

import { usePageStore } from '@/lib/store/usePageStore';
import { cn } from '@/lib/utils';
import { LucideProps, MoveDown } from 'lucide-react';
import { RefAttributes } from 'react';

export type HeroArrowProps = Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>;

export const HeroArrow = ({ className, ...props }: HeroArrowProps) => {
  const { pageLoaded } = usePageStore(state => state);

  return (
    <>
      {pageLoaded && (
        <MoveDown
          className={cn(
            'size-9 lg:size-12 text-dark stroke-1 transition-opacity duration-700 ease-in-out',
            className
          )}
          {...props}
        />
      )}
    </>
  );
};
