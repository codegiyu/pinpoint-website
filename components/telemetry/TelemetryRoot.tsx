'use client';

import { useConsent } from '@/lib/telemetry/ConsentContext';
import { getTelemetryConfig } from '@/lib/telemetry/config';
import { getTelemetry } from '@/lib/telemetry/telemetry-facade';
import { observeWebVitals } from '@/lib/telemetry/vitals';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function TelemetryRoot() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useConsent();
  const config = getTelemetryConfig();
  const vitalsStarted = useRef(false);

  useEffect(() => {
    if (!config.enabled || vitalsStarted.current) return;

    vitalsStarted.current = true;
    const stop = observeWebVitals();

    return () => {
      stop();
    };
  }, [config.enabled]);

  useEffect(() => {
    if (!config.enabled) return;

    const search = searchParams.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    getTelemetry().page(path);
  }, [config.enabled, pathname, searchParams, consent.choice]);

  useEffect(() => {
    if (!config.enabled) return;

    const onError = (event: ErrorEvent) => {
      getTelemetry().trackError(event.error ?? event.message, {
        source: 'window.error',
      });
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      getTelemetry().trackError(event.reason, {
        source: 'unhandledrejection',
      });
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, [config.enabled, consent.choice]);

  return null;
}
