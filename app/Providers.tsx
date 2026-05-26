'use client';

import { PropsWithChildren, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { SiteLoadingProvider } from '@/lib/context/SiteLoadingContext';
import { PageTransitionProvider } from '@/lib/context/PageTransitionContext';
import { SiteLoadAnimationScreen } from '@/components/general/SiteLoadAnimationScreen';
import { ConsentProvider } from '@/lib/telemetry/ConsentContext';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { TelemetryRoot } from '@/components/telemetry/TelemetryRoot';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <TooltipProvider delayDuration={700} skipDelayDuration={300}>
        <ConsentProvider>
          <SiteLoadingProvider>
            <Suspense fallback={null}>
              <PageTransitionProvider>
                <SiteLoadAnimationScreen />
                {children}
              </PageTransitionProvider>
            </Suspense>
            <Suspense fallback={null}>
              <TelemetryRoot />
            </Suspense>
            <CookieConsentBanner />
            <Toaster />
          </SiteLoadingProvider>
        </ConsentProvider>
      </TooltipProvider>
    </NuqsAdapter>
  );
};
