'use client';

import { PageSideCaption } from '@/components/general/PageSideCaption';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { intersectionExists } from '@/lib/utils/general';
import { memo, useEffect, useMemo } from 'react';
import { default as debounce } from 'lodash/debounce';

export const HomeScrollManager = memo(() => {
  const isTabletScreenAndAbove = useMediaQuery('(min-width: 768px)');

  const observerTargetIds = useMemo(
    () => (isTabletScreenAndAbove ? ['hero', 'what-we-do-inner'] : ['hero', 'what-we-do']),
    [isTabletScreenAndAbove]
  );

  useEffect(() => {
    const scrollManager = () => {
      const header = document.getElementById('visible-header');
      const pageSideCaption = document.querySelector('.page-side-caption');
      const observerTargets = observerTargetIds.map(id => document.getElementById(id));

      const halfInnerHeight = innerHeight / 2;
      const whatWeDo = observerTargets[1];

      const { top: whatWeDoTop = 0 } = whatWeDo?.getBoundingClientRect() ?? {};

      if (intersectionExists(observerTargets, header)) {
        header?.classList.replace('blend-difference', 'blend-normal');
      } else {
        header?.classList.replace('blend-normal', 'blend-difference');
      }

      if (scrollY > halfInnerHeight) {
        pageSideCaption?.classList.replace('opacity-0', 'opacity-100');
      } else {
        pageSideCaption?.classList.replace('opacity-100', 'opacity-0');
      }

      if (whatWeDoTop <= halfInnerHeight) {
        pageSideCaption?.classList.replace('mix-blend-difference', 'mix-blend-normal');
      } else {
        pageSideCaption?.classList.replace('mix-blend-normal', 'mix-blend-difference');
      }
    };

    const debouncedScrollManager = debounce(scrollManager, 500);

    // scrollManager();
    window.addEventListener('scroll', debouncedScrollManager);

    return () => window.removeEventListener('scroll', debouncedScrollManager);
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

    // observerTargets?.forEach(ref => {
    //   if (ref.current) observerRef.current?.observe(ref.current);
    // });

    // return () => {
    //   observerTargets?.forEach(ref => {
    //     if (ref.current) observerRef.current?.unobserve(ref.current);
    //   });
    // };
  }, [observerTargetIds]);

  return (
    <PageSideCaption caption="Your Branding, Marketing, and Packaging Solution" noDefaultOpacity />
  );
});
HomeScrollManager.displayName = 'HomeScrollManager';
