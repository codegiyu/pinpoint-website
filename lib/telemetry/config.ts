import type { TelemetryProviderId } from './types';

const DEFAULT_SITE_ID = 'pinpoint-global';
const INGEST_PATH = '/api/v1/public/analytics/ingest';

export type TelemetryConfig = {
  siteId: string;
  ingestUrl: string | null;
  siteKey: string | null;
  ga4MeasurementId: string | null;
  providers: TelemetryProviderId[];
  enabled: boolean;
};

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, '');
}

function parseProviderList(raw: string | undefined): TelemetryProviderId[] {
  if (!raw?.trim()) return ['first-party'];

  const allowed = new Set<TelemetryProviderId>(['first-party', 'ga4']);

  return raw
    .split(',')
    .map(part => part.trim() as TelemetryProviderId)
    .filter((part): part is TelemetryProviderId => allowed.has(part));
}

/** Resolves ingest URL from explicit env or analytics API base (swappable without facade changes). */
export function resolveAnalyticsIngestUrl(env: NodeJS.ProcessEnv = process.env): string | null {
  const explicit = env.NEXT_PUBLIC_ANALYTICS_INGEST_URL?.trim();
  if (explicit) return explicit;

  const apiBase =
    env.NEXT_PUBLIC_ANALYTICS_API_BASE_URL?.trim() ||
    env.ANALYTICS_API_BASE_URL?.trim() ||
    env.NEXT_PUBLIC_PINPOINT_BACKEND_URL?.trim();

  if (!apiBase) return null;

  return `${trimTrailingSlash(apiBase)}${INGEST_PATH}`;
}

export function getTelemetryConfig(env: NodeJS.ProcessEnv = process.env): TelemetryConfig {
  const ingestUrl = resolveAnalyticsIngestUrl(env);
  const siteKey = env.NEXT_PUBLIC_ANALYTICS_SITE_KEY?.trim() || null;
  const ga4MeasurementId = env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || null;
  const providers = parseProviderList(
    env.NEXT_PUBLIC_TELEMETRY_PROVIDERS?.trim() || env.TELEMETRY_PROVIDERS?.trim()
  );

  const enabled = Boolean(ingestUrl && siteKey);

  return {
    siteId: env.NEXT_PUBLIC_ANALYTICS_SITE_ID?.trim() || DEFAULT_SITE_ID,
    ingestUrl,
    siteKey,
    ga4MeasurementId,
    providers,
    enabled,
  };
}
