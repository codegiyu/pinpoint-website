/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { PinpointFull } from '@/components/icons';
import { useSiteLoading } from '@/lib/context/SiteLoadingContext';
import { routeTransitionLabel } from '@/lib/utils/route-transition-label';

const COVER_DURATION = 1.1;
const REVEAL_DURATION = 1.6;
const TITLE_FADE_DELAY = 0.36;
const TITLE_REVEAL_DURATION = 2;
const ROUTE_READY_EXTRA_MS = 360;
const READY_WAIT_TIMEOUT_MS = 6000;

type Phase = 'idle' | 'covering' | 'awaitingRoute' | 'revealing';

function fullLocationFromHref(href: string): string {
  const u = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'https://local');
  const q = u.search;
  return `${u.pathname}${q}`;
}

function currentFullLocation(pathname: string, search: string): string {
  return `${pathname}${search}`;
}

function isModifiedClick(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

function nextPaint(): Promise<void> {
  return new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );
}

function timeout(ms: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

async function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete && img.naturalWidth > 0) return;
  await new Promise<void>(resolve => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      img.removeEventListener('load', finish);
      img.removeEventListener('error', finish);
      resolve();
    };
    img.addEventListener('load', finish, { once: true });
    img.addEventListener('error', finish, { once: true });
  });
}

async function waitForCriticalAssets(): Promise<void> {
  const eagerImages = Array.from(
    document.querySelectorAll('img[loading="eager"], img[data-page-transition-wait="true"]')
  );
  const imageWaits = eagerImages.map(img => waitForImage(img as HTMLImageElement));
  const fontsReady =
    'fonts' in document
      ? (document as Document & { fonts: FontFaceSet }).fonts.ready
      : Promise.resolve();
  await Promise.race([
    Promise.allSettled([...imageWaits, fontsReady]).then(() => undefined),
    timeout(READY_WAIT_TIMEOUT_MS),
  ]);
}

interface PageTransitionContextValue {
  /** Programmatic navigation with the same overlay as internal links. */
  navigateWithTransition: (href: string, title?: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { siteLoading } = useSiteLoading();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('idle');
  const [displayTitle, setDisplayTitle] = useState('');
  const targetRef = useRef<string | null>(null);
  const routeReadyRunRef = useRef(0);
  const phaseRef = useRef<Phase>('idle');
  phaseRef.current = phase;

  const search = useMemo(() => {
    const s = searchParams.toString();
    return s ? `?${s}` : '';
  }, [searchParams]);

  const navigateWithTransition = (href: string, title?: string) => {
    if (reduceMotion) {
      router.push(href);
      return;
    }
    const target = fullLocationFromHref(href);
    const current = currentFullLocation(pathname, search);
    if (target === current) return;

    const label = title ?? routeTransitionLabel(new URL(href, window.location.origin).pathname);
    targetRef.current = target;
    setDisplayTitle(label);
    setPhase('covering');
  };

  const onCoverComplete = () => {
    if (phaseRef.current !== 'covering' || !targetRef.current) return;
    const href = targetRef.current;
    router.push(href.startsWith('/') ? href : `/${href}`);
    setPhase('awaitingRoute');
  };

  const onRevealComplete = () => {
    setPhase('idle');
    targetRef.current = null;
    setDisplayTitle('');
  };

  const showOverlay = phase !== 'idle' && !reduceMotion;
  const panelActive = phase === 'covering' || phase === 'awaitingRoute';
  const panelReveal = phase === 'revealing';

  const value = useMemo(() => ({ navigateWithTransition }), []);

  useEffect(() => {
    if (phase !== 'awaitingRoute' || !targetRef.current) return;

    const current = currentFullLocation(pathname, search);

    if (current !== targetRef.current) return;

    let cancelled = false;
    const runId = ++routeReadyRunRef.current;

    const run = async () => {
      await timeout(ROUTE_READY_EXTRA_MS);
      await nextPaint();
      await waitForCriticalAssets();

      if (cancelled) return;

      if (phaseRef.current !== 'awaitingRoute') return;

      if (routeReadyRunRef.current !== runId) return;

      setPhase('revealing');
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [phase, pathname, search]);

  // useEffect(() => {
  //   if (phase !== 'awaitingRoute' || !targetRef.current) return;
  //   const failSafe = window.setTimeout(() => {
  //     if (phaseRef.current === 'awaitingRoute') {
  //       setPhase('revealing');
  //       targetRef.current = null;
  //     }
  //   }, 8000);
  //   return () => window.clearTimeout(failSafe);
  // }, [phase]);

  useEffect(() => {
    if (siteLoading || reduceMotion) return;

    const onClickCapture = (e: MouseEvent) => {
      if (phaseRef.current !== 'idle') return;

      const el = (e.target as HTMLElement | null)?.closest?.('a');

      if (!el || !(el instanceof HTMLAnchorElement)) return;

      if (isModifiedClick(e)) return;

      if (el.getAttribute('data-no-page-transition') === 'true') return;

      if (el.target === '_blank' || el.hasAttribute('download')) return;

      const hrefAttr = el.getAttribute('href');

      if (
        !hrefAttr ||
        hrefAttr.startsWith('#') ||
        hrefAttr.startsWith('mailto:') ||
        hrefAttr.startsWith('tel:')
      ) {
        return;
      }

      let url: URL;

      try {
        url = new URL(hrefAttr, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const nextFull = `${url.pathname}${url.search}`;
      const curFull = currentFullLocation(pathname, search);

      if (nextFull === curFull) return;

      const dataTitle = el.getAttribute('data-page-transition-title');
      const label = dataTitle?.trim() || routeTransitionLabel(url.pathname);

      e.preventDefault();

      targetRef.current = nextFull;
      setDisplayTitle(label);
      setPhase('covering');
    };

    document.addEventListener('click', onClickCapture, true);

    return () => document.removeEventListener('click', onClickCapture, true);
  }, [pathname, reduceMotion, search, siteLoading]);

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      {showOverlay && (
        <div
          className="fixed inset-0 z-[100] overflow-hidden pointer-events-auto"
          aria-hidden="true">
          <motion.div
            className="absolute inset-0 bg-black will-change-transform"
            initial={{ opacity: 0.2, y: '100%' }}
            animate={
              panelReveal
                ? { opacity: 0.8, y: '-100%' }
                : panelActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: '100%' }
            }
            transition={{
              duration: panelReveal ? REVEAL_DURATION : COVER_DURATION,
              ease: panelReveal ? [0.22, 1, 0.36, 1] : [0.65, 0, 0.35, 1],
            }}
            onAnimationComplete={() => {
              if (phaseRef.current === 'covering') {
                onCoverComplete();
              } else if (phaseRef.current === 'revealing') {
                onRevealComplete();
              }
            }}>
            <div className="pointer-events-none absolute left-0 top-0 z-[101] flex w-full items-center px-[5vw] pt-6 md:px-[2.27vw] md:pt-8">
              <div className="flex w-fit items-center text-[1.125rem] md:text-[1.5rem] xl:text-[clamp(24px,_2.463vw,_32px)]">
                <PinpointFull className="pinpoint-logo page-transition-overlay-logo" />
              </div>
            </div>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <motion.p
                className="typo-h3 text-center text-white/95 px-6 max-w-[90vw] font-medium tracking-wide"
                initial={{ opacity: 0, y: 0, rotate: 8 }}
                animate={
                  panelReveal
                    ? { opacity: 0, y: 200, rotate: -8 }
                    : panelActive
                      ? { opacity: 1, y: 0, rotate: 0 }
                      : { opacity: 0, y: 0, rotate: 8 }
                }
                transition={{
                  opacity: {
                    delay: panelReveal ? 0 : phase === 'covering' ? TITLE_FADE_DELAY : 0,
                    duration: panelReveal ? TITLE_REVEAL_DURATION * 0.55 : 0.45,
                    ease: panelReveal ? [0.33, 0, 0.67, 1] : 'easeOut',
                  },
                  y: {
                    delay: panelReveal ? 0.08 : 0,
                    duration: panelReveal ? TITLE_REVEAL_DURATION : 0.5,
                    ease: panelReveal ? [0.25, 0.46, 0.45, 0.94] : [0.22, 1, 0.36, 1],
                  },
                }}>
                {displayTitle}
              </motion.p>
            </div>
          </motion.div>
        </div>
      )}
    </PageTransitionContext.Provider>
  );
}
