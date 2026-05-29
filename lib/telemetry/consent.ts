import type { ConsentChoice, ConsentState } from './types';

export const CONSENT_STORAGE_KEY = 'pinpoint_analytics_consent_v1';
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000;

type StoredConsent = {
  choice: Exclude<ConsentChoice, 'pending'>;
  updatedAt: number;
  expiresAt: number;
};

export function buildConsentState(choice: ConsentChoice, now = Date.now()): ConsentState {
  if (choice === 'pending') {
    return { choice, updatedAt: now, expiresAt: now };
  }

  return {
    choice,
    updatedAt: now,
    expiresAt: now + CONSENT_TTL_MS,
  };
}

export function readStoredConsent(now = Date.now()): ConsentState {
  if (typeof window === 'undefined') {
    return buildConsentState('pending', now);
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return buildConsentState('pending', now);

    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.expiresAt <= now) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return buildConsentState('pending', now);
    }

    if (parsed.choice !== 'accepted' && parsed.choice !== 'rejected') {
      return buildConsentState('pending', now);
    }

    return {
      choice: parsed.choice,
      updatedAt: parsed.updatedAt,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return buildConsentState('pending', now);
  }
}

export function persistConsentChoice(
  choice: Exclude<ConsentChoice, 'pending'>,
  now = Date.now()
): ConsentState {
  const state = buildConsentState(choice, now);

  if (typeof window !== 'undefined') {
    const stored: StoredConsent = {
      choice,
      updatedAt: state.updatedAt,
      expiresAt: state.expiresAt,
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  }

  return state;
}

export function clearStoredConsent(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  }
}
