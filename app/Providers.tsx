'use client';

import { PropsWithChildren, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { SiteLoadingProvider } from '@/lib/context/SiteLoadingContext';
import { PageTransitionProvider } from '@/lib/context/PageTransitionContext';
import { SiteLoadAnimationScreen } from '@/components/general/SiteLoadAnimationScreen';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <TooltipProvider delayDuration={700} skipDelayDuration={300}>
        <SiteLoadingProvider>
          <Suspense fallback={null}>
            <PageTransitionProvider>
              <SiteLoadAnimationScreen />
              {children}
            </PageTransitionProvider>
          </Suspense>
          <Toaster />
        </SiteLoadingProvider>
      </TooltipProvider>
    </NuqsAdapter>
  );
};
