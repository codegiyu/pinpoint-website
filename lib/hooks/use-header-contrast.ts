'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_HEADER_CONTRAST_ROOT_MARGIN,
  resolveHeaderContrast,
  type HeaderContrastConfig,
  type HeaderContrastMode,
} from '@/lib/utils/header-contrast';

export function useHeaderContrast(config?: HeaderContrastConfig): HeaderContrastMode {
  const solidZonesKey = config?.solidZones?.join('\0') ?? '';
  const rootMargin = config?.rootMargin ?? DEFAULT_HEADER_CONTRAST_ROOT_MARGIN;
  const [mode, setMode] = useState<HeaderContrastMode>('blend');

  useEffect(() => {
    const solidZones = solidZonesKey ? solidZonesKey.split('\0') : [];

    if (solidZones.length === 0) {
      setMode('blend');
      return;
    }

    const elements = solidZones
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setMode('blend');
      return;
    }

    const intersections = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target.id) {
            intersections.set(entry.target.id, entry.isIntersecting);
          }
        });

        const flags = solidZones.map(id => intersections.get(id) ?? false);
        setMode(resolveHeaderContrast(flags));
      },
      { root: null, threshold: 0, rootMargin }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [solidZonesKey, rootMargin]);

  return mode;
}
