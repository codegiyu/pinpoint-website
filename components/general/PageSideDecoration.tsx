'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroArrow } from './HeroArrow';
import { PageSideCaption } from './PageSideCaption';
import { cn } from '@/lib/utils';

const FULL_HEIGHT_SWITCH_OFFSET = 250;

export const PageSideDecoration = ({ caption }: { caption: string }) => {
  const [showCaption, setShowCaption] = useState(false);
  const [heights, setHeights] = useState({ scrollHeight: 0, innerHeight: 0 });
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const trigger = document.querySelector('.page-side-decorator-observer-trigger');

    if (!trigger || !heights.scrollHeight || !heights.innerHeight) {
      setHeights({ scrollHeight: document.documentElement.scrollHeight, innerHeight });
      return;
    }

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      setShowCaption(entries[0].isIntersecting);
    }, {});

    const observer = observerRef.current;

    observer.observe(trigger);

    return () => {
      if (observer) observer.unobserve(trigger);
    };
  }, [heights]);

  return (
    <div
      className={`hidden lg:block transition-opacity duration-700 ease-in-out 
      ${heights.innerHeight + FULL_HEIGHT_SWITCH_OFFSET < heights.scrollHeight ? 'opacity-100' : 'opacity-0'}`}>
      <HeroArrow
        id="move-down-arrow"
        className={cn(
          'text-black fixed left-[4vw] bottom-[5vh] z-10',
          showCaption ? 'opacity-0' : 'opacity-100'
        )}
      />
      <PageSideCaption
        caption={caption}
        className={`${showCaption ? 'opacity-100' : 'opacity-0'}`}
        noDefaultOpacity
      />
      <div
        className="page-side-decorator-observer-trigger absolute top-[110dvh]"
        style={{
          height: `${heights.scrollHeight - heights.innerHeight - FULL_HEIGHT_SWITCH_OFFSET}px`,
        }}
      />
    </div>
  );
};
