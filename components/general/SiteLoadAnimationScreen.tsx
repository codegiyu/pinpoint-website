'use client';

import { useSiteLoading } from '@/lib/context/SiteLoadingContext';
import { useInitPageStore } from '@/lib/store/usePageStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Phase 1: remove the hard "wait for window load + 1500ms" delay.
// Keep a short, low-friction splash so perceived LCP/TTI improve on first visits.
const SPLASH_VISIBLE_MS = 300;
const SPLASH_FADE_DURATION_S = 0.35;

export function SiteLoadAnimationScreen() {
  const { siteLoading, setSiteLoading } = useSiteLoading();
  const setPageLoadedStore = useInitPageStore(s => s.actions.setPageLoaded);
  const [pageLoaded, setPageLoadedLocal] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setPageLoadedLocal(true);
      return;
    }

    const id = window.setTimeout(() => setPageLoadedLocal(true), SPLASH_VISIBLE_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!siteLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={pageLoaded ? { opacity: 0 } : {}}
      transition={{ duration: SPLASH_FADE_DURATION_S, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        setSiteLoading(false);
        setPageLoadedStore(true);
      }}
      className="fixed inset-0 z-[99] grid h-screen w-full place-items-center bg-black">
      <div
        className={`transition-all duration-[350ms] ease-linear ${!pageLoaded ? '' : 'opacity-0'}`}>
        <Image
          src="/icons/pinpoint-full-dark.svg"
          alt=""
          width={280}
          height={80}
          className={!pageLoaded ? 'animate-loader' : ''}
          priority
        />
      </div>
    </motion.div>
  );
}
