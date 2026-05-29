'use client';

import dynamic from 'next/dynamic';
import { Suspense, type PropsWithChildren } from 'react';

const PageTransitionProvider = dynamic(
  () =>
    import('@/lib/context/PageTransitionContext').then(module => ({
      default: module.PageTransitionProvider,
    })),
  { ssr: false }
);

const SiteLoadAnimationScreen = dynamic(
  () =>
    import('@/components/general/SiteLoadAnimationScreen').then(module => ({
      default: module.SiteLoadAnimationScreen,
    })),
  { ssr: false }
);

const TelemetryRoot = dynamic(
  () =>
    import('@/components/telemetry/TelemetryRoot').then(module => ({
      default: module.TelemetryRoot,
    })),
  { ssr: false }
);

export function RouteTransitionShell({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={null}>
      <PageTransitionProvider>
        <SiteLoadAnimationScreen />
        {children}
      </PageTransitionProvider>
    </Suspense>
  );
}

export function DeferredTelemetryRoot() {
  return (
    <Suspense fallback={null}>
      <TelemetryRoot />
    </Suspense>
  );
}
