'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { buildConsentState, persistConsentChoice, readStoredConsent } from './consent';
import { getTelemetry, setTelemetryConsentReader } from './telemetry-facade';
import type { ConsentChoice, ConsentState } from './types';

type ConsentContextValue = {
  consent: ConsentState;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  preferencesOpen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: PropsWithChildren) {
  const [consent, setConsent] = useState<ConsentState>(() => readStoredConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setTelemetryConsentReader(() => consent);
  }, [consent]);

  const applyChoice = useCallback((choice: Exclude<ConsentChoice, 'pending'>) => {
    const next = persistConsentChoice(choice);
    setConsent(next);
    getTelemetry().onConsentChange(choice);
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      accept: () => applyChoice('accepted'),
      reject: () => applyChoice('rejected'),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      preferencesOpen,
    }),
    [applyChoice, consent, preferencesOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within ConsentProvider');
  }

  return ctx;
}

export function useConsentChoice(): ConsentChoice {
  return useConsent().consent.choice;
}

export function isConsentBannerVisible(consent: ConsentState): boolean {
  return consent.choice === 'pending';
}

export function consentLabel(choice: ConsentChoice): string {
  if (choice === 'accepted') return 'Analytics accepted';
  if (choice === 'rejected') return 'Analytics rejected';

  return 'Choose analytics preferences';
}

export { buildConsentState };
