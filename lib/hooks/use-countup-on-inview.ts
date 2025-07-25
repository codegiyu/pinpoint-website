'use client';

import { useEffect, useRef, useState } from 'react';

export const useCountUpOnInView = (to: number, duration = 2000) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animateCount = () => {
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = +(progress * to).toFixed(0);
        setCount(value);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, duration, to]);

  return { ref, count };
};
