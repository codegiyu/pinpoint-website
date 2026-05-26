import { getTelemetry } from './telemetry-facade';

export function trackCtaClick(label: string, href?: string) {
  getTelemetry().track('cta_click', {
    label,
    ...(href ? { href } : {}),
  });
}
