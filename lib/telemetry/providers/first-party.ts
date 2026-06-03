import type { AnalyticsEvent, TelemetryProvider } from '../types';
import { sanitizeEventProperties } from '../sanitize';

type FirstPartyProviderOptions = {
  siteId: string;
  siteKey: string;
  ingestUrl: string;
  flushIntervalMs?: number;
  maxBatchSize?: number;
  fetchImpl?: typeof fetch;
};

export function createFirstPartyProvider(options: FirstPartyProviderOptions): TelemetryProvider {
  const queue: AnalyticsEvent[] = [];
  const flushIntervalMs = options.flushIntervalMs ?? 5000;
  const maxBatchSize = options.maxBatchSize ?? 20;
  const fetchImpl = options.fetchImpl ?? fetch;
  let flushTimer: ReturnType<typeof setInterval> | null = null;
  let flushing = false;

  const flush = async () => {
    if (flushing || !queue.length) return;

    flushing = true;
    const batch = queue.splice(0, maxBatchSize);

    try {
      await fetchImpl(options.ingestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: options.siteId,
          siteKey: options.siteKey,
          events: batch,
        }),
        keepalive: true,
      });
    } catch {
      queue.unshift(...batch);
    } finally {
      flushing = false;
    }
  };

  const scheduleFlush = () => {
    if (typeof window === 'undefined') return;

    if (!flushTimer) {
      flushTimer = setInterval(() => {
        void flush();
      }, flushIntervalMs);
    }

    if (queue.length >= maxBatchSize) {
      void flush();
    }
  };

  const enqueue = (event: AnalyticsEvent) => {
    queue.push({
      ...event,
      properties: sanitizeEventProperties(event.properties),
    });
    scheduleFlush();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        void flush();
      }
    });
    window.addEventListener('pagehide', () => {
      void flush();
    });
  }

  return {
    id: 'first-party',
    track: enqueue,
    page(path) {
      enqueue({
        name: 'page_view',
        ts: Date.now(),
        path,
      });
    },
    dispose() {
      if (flushTimer) {
        clearInterval(flushTimer);
        flushTimer = null;
      }
    },
  };
}
