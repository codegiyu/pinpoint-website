'use client';
import useScrollBlock from '@/lib/hooks/use-scroll-block';
import { usePageStore } from '@/lib/store/usePageStore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { debounce } from '@/lib/utils/general';

const BASE_LOAD_TIME = 1500; // ms
const TRANSITION_DURATION = 0.8; // s

export const LoadAnimationScreen = ({ name }: { name: string }) => {
  const {
    actions: { setPageLoaded },
  } = usePageStore(state => state);
  const [localPageLoaded, setLocalPageLoaded] = useState(false);
  const { allowScroll, blockScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll();
    const start = Date.now();

    const handleLoad = async () => {
      const timeDiff = BASE_LOAD_TIME - (Date.now() - start);

      await debounce(Math.max(timeDiff, 0));

      setPageLoaded(true);
      setLocalPageLoaded(true);

      setTimeout(() => {
        allowScroll();
        setPageLoaded(false);
      }, TRANSITION_DURATION * 100); // Based off of exit animation duration of this screen
    };

    // If already loaded (from cache)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      className="w-full h-screen overflow-hidden bg-dark grid place-items-center"
      initial={{ maxHeight: '100vh' }}
      animate={{ maxHeight: localPageLoaded ? '0px' : '100vh' }}
      transition={{ duration: TRANSITION_DURATION, ease: 'easeIn' }}>
      <h2 className="typo-h3 text-white">{name}</h2>
    </motion.section>
  );
};
