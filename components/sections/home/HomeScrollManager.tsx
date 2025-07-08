'use client';

import { useEffect } from 'react';

export const HomeScrollManager = () => {
  useEffect(() => {
    const header = document.getElementById('header');
    const halfHeaderHeight = (header?.getBoundingClientRect?.().height || 0) / 2;

    const scrollManager = () => {
      if (!header) return;

      const { scrollY, innerHeight } = window;

      if (scrollY < innerHeight - halfHeaderHeight) {
        header.classList.replace('text-dark', 'text-white');
      } else {
        header.classList.replace('text-white', 'text-dark');
      }
    };

    scrollManager();
    window.addEventListener('scroll', scrollManager);

    return () => window.removeEventListener('scroll', scrollManager);
  }, []);

  return null;
};
