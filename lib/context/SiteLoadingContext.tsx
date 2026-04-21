'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface SiteLoadingContextValue {
  siteLoading: boolean;
  setSiteLoading: (value: boolean) => void;
}

const SiteLoadingContext = createContext<SiteLoadingContextValue | null>(null);

export function SiteLoadingProvider({ children }: { children: ReactNode }) {
  const [siteLoading, setSiteLoadingState] = useState(true);
  const setSiteLoading = useCallback((value: boolean) => {
    setSiteLoadingState(value);
  }, []);

  const value = useMemo(() => ({ siteLoading, setSiteLoading }), [siteLoading, setSiteLoading]);

  return <SiteLoadingContext.Provider value={value}>{children}</SiteLoadingContext.Provider>;
}

export function useSiteLoading() {
  const ctx = useContext(SiteLoadingContext);
  if (!ctx) {
    throw new Error('useSiteLoading must be used within SiteLoadingProvider');
  }
  return ctx;
}
