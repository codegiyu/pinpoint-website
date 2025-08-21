'use client';

import { PropsWithChildren } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <SessionProvider>
        <TooltipProvider delayDuration={700} skipDelayDuration={300}>
          {children}
          <Toaster />
        </TooltipProvider>
      </SessionProvider>
    </NuqsAdapter>
  );
};
