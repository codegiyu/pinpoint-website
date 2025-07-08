'use client';

import { useEffect } from 'react';

export const ScrollRestorationHandler = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
};
