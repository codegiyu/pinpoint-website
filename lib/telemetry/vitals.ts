import { getTelemetry } from './telemetry-facade';

type VitalMetric = 'lcp' | 'inp' | 'cls';

const VITAL_EVENT_BY_METRIC: Record<VitalMetric, string> = {
  lcp: 'web_vital_lcp',
  inp: 'web_vital_inp',
  cls: 'web_vital_cls',
};

export function observeWebVitals(): () => void {
  if (typeof window === 'undefined') return () => {};

  let cancelled = false;

  void import('web-vitals')
    .then(({ onLCP, onINP, onCLS }) => {
      if (cancelled) return;

      const report = (metric: VitalMetric, value: number, rating: string) => {
        getTelemetry().track(VITAL_EVENT_BY_METRIC[metric], {
          value: Math.round(metric === 'cls' ? value * 1000 : value),
          rating,
        });
      };

      onLCP(metric => report('lcp', metric.value, metric.rating));
      onINP(metric => report('inp', metric.value, metric.rating));
      onCLS(metric => report('cls', metric.value, metric.rating));
    })
    .catch(() => {});

  return () => {
    cancelled = true;
  };
}
