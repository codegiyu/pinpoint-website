'use client';
// import useScrollBlock from '@/lib/hooks/use-scroll-block';
import { usePageStore } from '@/lib/store/usePageStore';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { debounce } from '@/lib/utils/general';
import { BASE_LOAD_TIME, TRANSITION_DURATION } from '@/lib/constants/routing';
import { usePathname } from 'next/navigation';

export const LoadAnimationScreen = ({ name }: { name: string }) => {
  const {
    lastPathname,
    actions: { setPageLoaded, setLastPathname },
  } = usePageStore(state => state);
  const [localPageLoaded, setLocalPageLoaded] = useState(false);
  const pathname = usePathname();
  // const { allowScroll, blockScroll } = useScrollBlock();
  const screenRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const body = document.body;

    if (!body) return;

    if (localPageLoaded) {
      setTimeout(() => {
        body.classList.remove('load-animation-open');
        setLastPathname(pathname);
      }, TRANSITION_DURATION * 1000);
    } else {
      // body.classList.add('load-animation-open');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localPageLoaded, pathname]);

  useEffect(() => {
    const body = document.body;

    if (!body) return;

    if (pathname !== lastPathname) {
      body.classList.add('load-animation-open');
      document.body.style.overflow = 'hidden';
    }
  }, [pathname, lastPathname]);

  useEffect(() => {
    // blockScroll();

    // Prevent scroll when loading screen is open
    const start = Date.now();

    const handleLoad = async () => {
      const timeDiff = BASE_LOAD_TIME - (Date.now() - start);

      await debounce(Math.max(timeDiff, 0));

      setPageLoaded(true);
      setLocalPageLoaded(true);
      document.body.style.overflow = 'unset';

      setTimeout(() => {
        // allowScroll();
        setPageLoaded(false);
      }, TRANSITION_DURATION * 1000); // Based off of exit animation duration of this screen
    };

    // If already loaded (from cache)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('load', handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pathname === lastPathname) return null;

  return (
    <motion.section
      ref={screenRef}
      className="w-full h-screen overflow-hidden bg-dark grid place-items-center"
      initial={{ maxHeight: '100vh' }}
      animate={{ maxHeight: !localPageLoaded ? '100dvh' : '0px' }}
      transition={{ duration: TRANSITION_DURATION, ease: 'easeIn' }}
      viewport={{ once: true }}>
      <h2 className="typo-h3 text-white">{name}</h2>
    </motion.section>
  );
};
LoadAnimationScreen.displayName = 'LoadAnimationScreen';
