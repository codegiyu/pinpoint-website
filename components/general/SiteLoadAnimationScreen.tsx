'use client';

import { useSiteLoading } from '@/lib/context/SiteLoadingContext';
import { useInitPageStore } from '@/lib/store/usePageStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BASE_LOAD_TIME, TRANSITION_DURATION } from '@/lib/constants/routing';

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export function SiteLoadAnimationScreen() {
  const { siteLoading, setSiteLoading } = useSiteLoading();
  const setPageLoadedStore = useInitPageStore(s => s.actions.setPageLoaded);
  const [pageLoaded, setPageLoadedLocal] = useState(false);

  useEffect(() => {
    const handleLoad = async () => {
      await delay(BASE_LOAD_TIME);
      setPageLoadedLocal(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!siteLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={pageLoaded ? { opacity: 0 } : {}}
      transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        setSiteLoading(false);
        setPageLoadedStore(true);
      }}
      className="fixed inset-0 z-[99] grid h-screen w-full place-items-center bg-black">
      <div
        className={`transition-all duration-[1500ms] ease-linear ${!pageLoaded ? '' : 'opacity-0'}`}>
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
