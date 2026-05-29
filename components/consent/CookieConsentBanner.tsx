'use client';

import { PinpointBtn } from '@/components/atoms/PinpointBtn';
import { isConsentBannerVisible, useConsent } from '@/lib/telemetry/ConsentContext';
import { getTelemetryConfig } from '@/lib/telemetry/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CookieConsentBanner() {
  const { consent, accept, reject, openPreferences, closePreferences, preferencesOpen } =
    useConsent();
  const config = getTelemetryConfig();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !config.enabled || !isConsentBannerVisible(consent)) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[200] p-4 md:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc">
      <div className="pinpoint-container-mobile-w-full mx-auto max-w-4xl rounded-lg border border-dark/10 bg-white p-5 shadow-lg md:p-6">
        <h2 id="cookie-consent-title" className="typo-body-2 font-medium text-dark">
          Cookies and analytics
        </h2>

        <p id="cookie-consent-desc" className="mt-2 typo-body-3 text-dark/70">
          We use first-party analytics to understand how our site is used and to measure
          performance. If you accept, we also load Google Analytics 4 for aggregated marketing
          insight. Anonymous performance metrics may still be collected if you reject non-essential
          cookies.{' '}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy policy
          </Link>
        </p>

        {preferencesOpen ? (
          <div className="mt-4 grid gap-3 rounded-md bg-gray-f2 p-4 typo-body-3 text-dark/80">
            <p>
              <strong>Essential:</strong> required for the site to function (not used for marketing
              profiles).
            </p>
            <p>
              <strong>Analytics:</strong> page views, navigation, form funnel steps, and Core Web
              Vitals sent to Pinpoint&apos;s first-party analytics service.
            </p>
            <p>
              <strong>Google Analytics 4:</strong> loaded only after you accept; no User-ID; light
              event mirroring for campaigns.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <PinpointBtn text="Accept analytics" onClick={accept} className="w-full sm:w-auto" />
          <PinpointBtn
            text="Reject non-essential"
            variant="secondary"
            onClick={reject}
            className="w-full sm:w-auto"
          />
          <button
            type="button"
            onClick={preferencesOpen ? closePreferences : openPreferences}
            className="typo-body-3 text-dark/70 underline underline-offset-2 sm:ml-auto">
            {preferencesOpen ? 'Hide details' : 'Manage preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}
