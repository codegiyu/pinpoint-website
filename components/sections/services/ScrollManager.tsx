'use client';

import { useEffect } from 'react';
import { HomeScrollManagerProps } from '../home/HomeScrollManager';
import { intersectionExists } from '@/lib/utils/general';

export const ServiceScrollManager = ({ refsForObserver }: HomeScrollManagerProps) => {
  useEffect(() => {
    const scrollManager = () => {
      const header = document.getElementById('visible-header');
      const pageSideCaption = document.querySelector('.page-side-caption');

      if (intersectionExists(refsForObserver, header)) {
        header?.classList.replace('mix-blend-difference', 'mix-blend-normal');
      } else {
        header?.classList.replace('mix-blend-normal', 'mix-blend-difference');
      }

      if (intersectionExists(refsForObserver, pageSideCaption as HTMLElement | null)) {
        pageSideCaption?.classList.replace('mix-blend-difference', 'mix-blend-normal');
      } else {
        pageSideCaption?.classList.replace('mix-blend-normal', 'mix-blend-difference');
      }
    };

    scrollManager();
    window.addEventListener('scroll', scrollManager);

    return () => window.removeEventListener('scroll', scrollManager);
  }, [refsForObserver]);

  return null;
};
