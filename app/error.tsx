'use client';

import { useEffect } from 'react';
import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { PageHeroCaption } from '@/components/general/HeroCaption';
import { MainLayout } from '@/components/layout/MainLayout';
import { CTA } from '@/components/sections/shared/Cta';
import { MoveDown } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MainLayout>
      <section className="min-h-screen w-full bg-gray-f2">
        <PageError reset={reset} />
        <CTA variant="gray" />
        <MoveDown className="hidden lg:block size-12 text-dark stroke-1 fixed bottom-[3.75rem] left-[2.27vw] z-[20]" />
      </section>
    </MainLayout>
  );
}

const PageError = ({ reset }: { reset: () => void }) => {
  return (
    <section className="w-full bg-white">
      <div className="pinpoint-container grid gap-6 md:gap-10 lg:gap-14 pt-[7.5rem] pb-[6rem] lg:px-[6vw]">
        <PageHeroCaption caption="Error" />
        <h1 className="typo-h1">Something went wrong</h1>
        <p className="typo-body-4 pt-10">
          We&apos;re sorry — something unexpected happened while loading this page. Please try
          again, or head back to the homepage.
        </p>
        <div className="grid md:flex gap-6 pt-4 md:pt-8">
          <PinpointBtn
            variant="default"
            text="Try again"
            onClick={() => reset()}
            animate={{ axis: 'y', duration: 0.1 }}
          />
          <PinpointBtn
            variant="secondary"
            text="Return home"
            linkProps={{ href: '/' }}
            animate={{ axis: 'y', duration: 0.1 }}
          />
        </div>
      </div>
    </section>
  );
};
