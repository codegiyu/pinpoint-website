'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ChangingModifier({
  textsArray,
  duration = 2200,
  wrapClassName,
}: {
  textsArray: string[];
  duration?: number;
  wrapClassName?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % textsArray.length);
    }, duration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className={cn('inline-block relative w-full h-full overflow-hidden', wrapClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={textsArray[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0">
          {textsArray[index]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

// Change the key to trigger the flip
export function FlipText({
  text,
  flipKey,
  duration = 0.1,
  axis = 'y',
  wrapClassName,
}: {
  text: string;
  flipKey: string | number;
  duration?: number; // in seconds
  axis?: 'x' | 'y';
  wrapClassName?: string;
}) {
  return (
    <p className={cn('inline-block relative w-max h-full overflow-hidden', wrapClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={flipKey}
          initial={{ [axis]: '100%', opacity: 0 }}
          animate={{ [axis]: '0%', opacity: 1 }}
          exit={{ [axis]: '-100%', opacity: 0 }}
          transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0">
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">{text}</span>
    </p>
  );
}
