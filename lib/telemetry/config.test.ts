/// <reference types="node" />

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getTelemetryConfig, resolveAnalyticsIngestUrl } from './config';

describe('resolveAnalyticsIngestUrl', () => {
  it('uses explicit ingest URL when set', () => {
    const url = resolveAnalyticsIngestUrl({
      NEXT_PUBLIC_ANALYTICS_INGEST_URL: 'https://analytics.example/ingest',
    });

    assert.equal(url, 'https://analytics.example/ingest');
  });

  it('builds ingest URL from ANALYTICS_API_BASE_URL', () => {
    const url = resolveAnalyticsIngestUrl({
      ANALYTICS_API_BASE_URL: 'https://api.example',
    });

    assert.equal(url, 'https://api.example/api/v1/public/analytics/ingest');
  });

  it('falls back to NEXT_PUBLIC_PINPOINT_BACKEND_URL', () => {
    const url = resolveAnalyticsIngestUrl({
      NEXT_PUBLIC_PINPOINT_BACKEND_URL: 'https://api.pinpoint.ng/',
    });

    assert.equal(url, 'https://api.pinpoint.ng/api/v1/public/analytics/ingest');
  });
});

describe('getTelemetryConfig', () => {
  it('parses telemetry providers from env', () => {
    const config = getTelemetryConfig({
      NEXT_PUBLIC_ANALYTICS_INGEST_URL: 'https://api.example/ingest',
      NEXT_PUBLIC_ANALYTICS_SITE_KEY: 'secret-key-12345678',
      TELEMETRY_PROVIDERS: 'first-party,ga4',
      NEXT_PUBLIC_GA4_MEASUREMENT_ID: 'G-TEST123',
    });

    assert.equal(config.enabled, true);
    assert.deepEqual(config.providers, ['first-party', 'ga4']);
    assert.equal(config.ga4MeasurementId, 'G-TEST123');
  });
});
