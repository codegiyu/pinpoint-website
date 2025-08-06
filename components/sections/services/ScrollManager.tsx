'use client';

import { memo, useEffect } from 'react';
import { intersectionExists } from '@/lib/utils/general';

export const ServiceScrollManager = memo(
  ({ observerTargetIds }: { observerTargetIds: string[] }) => {
    useEffect(() => {
      const scrollManager = () => {
        const header = document.getElementById('visible-header');
        const pageSideCaption = document.querySelector('.page-side-caption');
        const observerTargets = observerTargetIds.map(id => document.getElementById(id));

        if (intersectionExists(observerTargets, header)) {
          header?.classList.replace('mix-blend-difference', 'mix-blend-normal');
        } else {
          header?.classList.replace('mix-blend-normal', 'mix-blend-difference');
        }

        if (intersectionExists(observerTargets, pageSideCaption as HTMLElement | null)) {
          pageSideCaption?.classList.replace('mix-blend-difference', 'mix-blend-normal');
        } else {
          pageSideCaption?.classList.replace('mix-blend-normal', 'mix-blend-difference');
        }
      };

      scrollManager();
      window.addEventListener('scroll', scrollManager);

      return () => window.removeEventListener('scroll', scrollManager);
    }, [observerTargetIds]);

    return null;
  }
);
ServiceScrollManager.displayName = 'ServiceScrollManager';
