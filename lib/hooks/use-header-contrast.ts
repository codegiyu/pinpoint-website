'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DEFAULT_HEADER_CHROME_ROOT_MARGIN,
  HEADER_DARK_ZONE_SELECTOR,
  resolveHeaderChromeColor,
  shouldUseWhiteHeaderChrome,
  type HeaderContrastConfig,
  type HeaderChromeColor,
} from '@/lib/utils/header-contrast';

const MD_BREAKPOINT = '(min-width: 768px)';

function collectDarkZoneElements(legacyIds: string[]): HTMLElement[] {
  const seen = new Set<HTMLElement>();
  const elements: HTMLElement[] = [];

  const add = (el: HTMLElement | null) => {
    if (el && !seen.has(el)) {
      seen.add(el);
      elements.push(el);
    }
  };

  legacyIds.forEach(id => add(document.getElementById(id)));
  document.querySelectorAll<HTMLElement>(HEADER_DARK_ZONE_SELECTOR).forEach(add);

  return elements;
}

export function useHeaderContrast(config?: HeaderContrastConfig): HeaderChromeColor {
  const pathname = usePathname();
  const legacyIdsKey = config?.solidZones?.join('\0') ?? '';
  const rootMargin = config?.rootMargin ?? DEFAULT_HEADER_CHROME_ROOT_MARGIN;
  const [color, setColor] = useState<HeaderChromeColor>('black');

  useEffect(() => {
    const legacyIds = legacyIdsKey ? legacyIdsKey.split('\0') : [];
    const legacyIdSet = new Set(legacyIds);
    const intersections = new WeakMap<Element, boolean>();
    let observer: IntersectionObserver | null = null;
    let mutationTimer: ReturnType<typeof setTimeout> | undefined;

    const recomputeColor = () => {
      const elements = collectDarkZoneElements(legacyIds);

      if (elements.length === 0) {
        setColor('black');
        return;
      }

      const flags = elements.map(el =>
        shouldUseWhiteHeaderChrome(el, intersections.get(el) ?? false, legacyIdSet)
      );
      setColor(resolveHeaderChromeColor(flags));
    };

    const connect = () => {
      observer?.disconnect();
      const elements = collectDarkZoneElements(legacyIds);

      if (elements.length === 0) {
        setColor('black');
        return;
      }

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            intersections.set(entry.target, entry.isIntersecting);
          });
          recomputeColor();
        },
        { root: null, threshold: 0, rootMargin }
      );

      elements.forEach(el => observer?.observe(el));
      recomputeColor();
    };

    connect();

    const main = document.querySelector('main');
    const mutationObserver =
      main &&
      new MutationObserver(() => {
        clearTimeout(mutationTimer);
        mutationTimer = setTimeout(connect, 150);
      });

    mutationObserver?.observe(main, { childList: true, subtree: true });

    const mediaQuery = window.matchMedia(MD_BREAKPOINT);
    const onBreakpointChange = () => recomputeColor();
    mediaQuery.addEventListener('change', onBreakpointChange);

    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
      mediaQuery.removeEventListener('change', onBreakpointChange);
      clearTimeout(mutationTimer);
    };
  }, [legacyIdsKey, rootMargin, pathname]);

  return color;
}
