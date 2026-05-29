'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_HEADER_CHROME_ROOT_MARGIN,
  resolveHeaderChromeColor,
  type HeaderContrastConfig,
  type HeaderChromeColor,
} from '@/lib/utils/header-contrast';

export function useHeaderContrast(config?: HeaderContrastConfig): HeaderChromeColor {
  const darkZonesKey = config?.solidZones?.join('\0') ?? '';
  const rootMargin = config?.rootMargin ?? DEFAULT_HEADER_CHROME_ROOT_MARGIN;
  const [color, setColor] = useState<HeaderChromeColor>('black');

  useEffect(() => {
    const darkZones = darkZonesKey ? darkZonesKey.split('\0') : [];

    if (darkZones.length === 0) {
      setColor('black');
      return;
    }

    const elements = darkZones
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setColor('black');
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

        const flags = darkZones.map(id => intersections.get(id) ?? false);
        setColor(resolveHeaderChromeColor(flags));
      },
      { root: null, threshold: 0, rootMargin }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [darkZonesKey, rootMargin]);

  return color;
}
