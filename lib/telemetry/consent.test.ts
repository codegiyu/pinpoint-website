/// <reference types="node" />

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildConsentState,
  CONSENT_STORAGE_KEY,
  persistConsentChoice,
  readStoredConsent,
} from './consent';
import { withBrowserGlobals } from './test-browser-shim';

describe('consent storage', () => {
  it('builds accepted consent with twelve-month expiry', () => {
    const now = Date.UTC(2026, 4, 26);
    const state = buildConsentState('accepted', now);

    assert.equal(state.choice, 'accepted');
    assert.equal(state.expiresAt - state.updatedAt, 365 * 24 * 60 * 60 * 1000);
  });

  it('persists and reads consent from localStorage', () => {
    withBrowserGlobals(() => {
      persistConsentChoice('rejected', Date.UTC(2026, 4, 26));
      const read = readStoredConsent(Date.UTC(2026, 5, 1));

      assert.equal(read.choice, 'rejected');
      assert.ok(globalThis.window?.localStorage.getItem(CONSENT_STORAGE_KEY));
    });
  });
});
