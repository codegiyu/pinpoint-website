/// <reference types="node" />

import assert from 'node:assert/strict';
import { describe, it, beforeEach } from 'node:test';
import { buildConsentState } from './consent';
import { createTelemetryFacade } from './telemetry-facade';
import { createMemoryStorage, withBrowserGlobals } from './test-browser-shim';
import type { AnalyticsEvent, ConsentState, TelemetryProvider } from './types';

function createRecordingProvider(id: TelemetryProvider['id']): TelemetryProvider & {
  events: AnalyticsEvent[];
} {
  const events: AnalyticsEvent[] = [];

  return {
    id,
    events,
    track(event) {
      events.push(event);
    },
    page(path) {
      events.push({ name: 'page_view', ts: Date.now(), path });
    },
  };
}

describe('telemetry facade consent routing', () => {
  let consent: ConsentState;
  let firstParty: ReturnType<typeof createRecordingProvider>;
  let ga4: ReturnType<typeof createRecordingProvider>;

  beforeEach(() => {
    consent = buildConsentState('pending');
    firstParty = createRecordingProvider('first-party');
    ga4 = createRecordingProvider('ga4');
  });

  const facade = () =>
    createTelemetryFacade({
      getConsent: () => consent,
      getConfig: () => ({
        siteId: 'pinpoint-global',
        ingestUrl: 'https://api.example/ingest',
        siteKey: 'key',
        ga4MeasurementId: 'G-TEST',
        providers: ['first-party', 'ga4'],
        enabled: true,
      }),
      getPath: () => '/test',
      providers: [firstParty, ga4],
    });

  it('rejects full analytics and GA4 when consent is rejected', () => {
    consent = buildConsentState('rejected');
    const telemetry = facade();

    telemetry.page('/about');
    telemetry.track('cta_click', { label: 'hero' });

    assert.equal(firstParty.events.length, 0);
    assert.equal(ga4.events.length, 0);
  });

  it('sends vitals to first-party only when consent is rejected', () => {
    consent = buildConsentState('rejected');
    const telemetry = facade();

    telemetry.track('web_vital_lcp', { value: 1200, rating: 'good' });

    assert.equal(firstParty.events.length, 1);
    assert.equal(firstParty.events[0]?.name, 'web_vital_lcp');
    assert.equal(firstParty.events[0]?.sessionId, undefined);
    assert.equal(ga4.events.length, 0);
  });

  it('mirrors page and custom events to first-party and GA4 when accepted', () => {
    withBrowserGlobals(
      () => {
        consent = buildConsentState('accepted');
        const telemetry = facade();

        telemetry.page('/contact');
        telemetry.track('form_start', { form_name: 'enquiry' });

        assert.equal(firstParty.events.length, 2);
        assert.equal(ga4.events.length, 2);
        assert.ok(firstParty.events.some(event => event.name === 'page_view'));
        assert.ok(firstParty.events.some(event => event.name === 'form_start'));
        assert.ok(ga4.events.some(event => event.name === 'form_start'));
      },
      {
        sessionStorage: createMemoryStorage({
          pinpoint_analytics_session_v1: 'test-session',
        }),
        referrer: 'https://example.com',
      }
    );
  });

  it('never sends vitals to GA4', () => {
    consent = buildConsentState('accepted');
    const telemetry = facade();

    telemetry.track('web_vital_inp', { value: 180, rating: 'good' });

    assert.equal(firstParty.events.length, 1);
    assert.equal(ga4.events.length, 0);
  });
});
