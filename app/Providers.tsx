'use client';

import { PropsWithChildren } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { SiteLoadingProvider } from '@/lib/context/SiteLoadingContext';
import { ConsentProvider } from '@/lib/telemetry/ConsentContext';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import {
  DeferredTelemetryRoot,
  RouteTransitionShell,
} from '@/components/providers/DeferredClientProviders';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <TooltipProvider delayDuration={700} skipDelayDuration={300}>
        <ConsentProvider>
          <SiteLoadingProvider>
            <RouteTransitionShell>{children}</RouteTransitionShell>
            <DeferredTelemetryRoot />
            <CookieConsentBanner />
            <Toaster />
          </SiteLoadingProvider>
        </ConsentProvider>
      </TooltipProvider>
    </NuqsAdapter>
  );
};
