import type { TelemetryProvider } from '../types';
import { VITAL_EVENT_NAMES } from '../types';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

type Ga4ProviderOptions = {
  measurementId: string;
};

let scriptLoading: Promise<void> | null = null;

function loadGa4Script(measurementId: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.gtag) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise(resolve => {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      send_page_view: false,
    });
  });

  return scriptLoading;
}

export function createGa4Provider(options: Ga4ProviderOptions): TelemetryProvider {
  let ready = false;

  const ensureReady = async () => {
    if (ready || typeof window === 'undefined') return;
    await loadGa4Script(options.measurementId);
    ready = Boolean(window.gtag);
  };

  void ensureReady();

  return {
    id: 'ga4',
    track(event) {
      if (VITAL_EVENT_NAMES.has(event.name)) return;

      void ensureReady().then(() => {
        if (!window.gtag) return;

        window.gtag('event', event.name, {
          page_path: event.path,
          ...event.properties,
        });
      });
    },
    page(path, title) {
      void ensureReady().then(() => {
        if (!window.gtag) return;

        window.gtag('event', 'page_view', {
          page_path: path,
          page_title: title,
        });
      });
    },
  };
}
