'use client';

import { useSiteLoading } from '@/lib/context/SiteLoadingContext';
import { useInitPageStore } from '@/lib/store/usePageStore';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const SPLASH_MIN_VISIBLE_MS = 1650;
const SPLASH_FADE_DURATION_S = 0.35;

export function SiteLoadAnimationScreen() {
  const { siteLoading, setSiteLoading } = useSiteLoading();
  const setPageLoadedStore = useInitPageStore(s => s.actions.setPageLoaded);
  const [pageLoaded, setPageLoadedLocal] = useState(false);
  const mountedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setPageLoadedLocal(true);
      return;
    }

    if (mountedAtRef.current == null) {
      mountedAtRef.current = Date.now();
    }

    const elapsed = Date.now() - mountedAtRef.current;
    const remaining = Math.max(0, SPLASH_MIN_VISIBLE_MS - elapsed);
    const id = window.setTimeout(() => setPageLoadedLocal(true), remaining);

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
