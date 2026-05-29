'use client';

import { memo, useEffect } from 'react';
import { intersectionExists } from '@/lib/utils/general';
import { default as debounce } from 'lodash/debounce';

export const ServiceScrollManager = memo(
  ({ observerTargetIds }: { observerTargetIds: string[] }) => {
    useEffect(() => {
      const scrollManager = () => {
        const pageSideCaption = document.querySelector('.page-side-caption');
        const observerTargets = observerTargetIds.map(id => document.getElementById(id));

        if (intersectionExists(observerTargets, pageSideCaption as HTMLElement | null)) {
          pageSideCaption?.classList.replace('mix-blend-difference', 'mix-blend-normal');
        } else {
          pageSideCaption?.classList.replace('mix-blend-normal', 'mix-blend-difference');
        }
      };

      const debouncedScrollManager = debounce(scrollManager, 500);

      scrollManager();
      window.addEventListener('scroll', debouncedScrollManager);

      return () => window.removeEventListener('scroll', debouncedScrollManager);
    }, [observerTargetIds]);

    return null;
  }
);
ServiceScrollManager.displayName = 'ServiceScrollManager';
