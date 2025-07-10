'use client';

import { PageSideCaption } from '@/components/general/PageSideCaption';
import { intersectionExists } from '@/lib/utils/general';
import { RefObject, useEffect } from 'react';

export interface HomeScrollManagerProps {
  refsForObserver: RefObject<HTMLElement | null>[];
}

export const HomeScrollManager = ({ refsForObserver }: HomeScrollManagerProps) => {
  useEffect(() => {
    const scrollManager = () => {
      const header = document.getElementById('visible-header');
      const pageSideCaption = document.querySelector('.page-side-caption');
      const halfInnerHeight = innerHeight / 2;
      const whatWeDo = refsForObserver[1].current;

      const { top: whatWeDoTop = 0 } = whatWeDo?.getBoundingClientRect() ?? {};

      if (intersectionExists(refsForObserver, header)) {
        header?.classList.replace('mix-blend-difference', 'mix-blend-normal');
      } else {
        header?.classList.replace('mix-blend-normal', 'mix-blend-difference');
      }

      if (scrollY > halfInnerHeight) {
        pageSideCaption?.classList.replace('opacity-0', 'opacity-100');
      } else {
        pageSideCaption?.classList.replace('opacity-100', 'opacity-0');
      }

      if (whatWeDoTop <= halfInnerHeight) {
        pageSideCaption?.classList.replace('text-dark', 'text-white');
      } else {
        pageSideCaption?.classList.replace('text-white', 'text-dark');
      }
    };

    scrollManager();
    window.addEventListener('scroll', scrollManager);

    return () => window.removeEventListener('scroll', scrollManager);
    // if (observerRef.current) observerRef.current.disconnect();

    // observerRef.current = new IntersectionObserver(
    //   entries => {
    //     const isIntersecting = entries.some(entry => entry.isIntersecting);
    //     blendModeHasChangedRef.current = true;
    //     setFullscreenVideoIsIntersecting(isIntersecting);
    //   },
    //   {
    //     root: null,
    //     rootMargin: `0px 0px ${window.innerHeight - headerRef.current.clientHeight}px`,
    //     threshold: 0,
    //   }
    // );

    // refsForObserver?.forEach(ref => {
    //   if (ref.current) observerRef.current?.observe(ref.current);
    // });

    // return () => {
    //   refsForObserver?.forEach(ref => {
    //     if (ref.current) observerRef.current?.unobserve(ref.current);
    //   });
    // };
  }, [refsForObserver]);

  return <PageSideCaption caption="Creative Communication Agency" />;
};
