const SESSION_STORAGE_KEY = 'pinpoint_analytics_session_v1';

export type TrafficContext = {
  sessionId?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceClass: 'mobile' | 'tablet' | 'desktop' | 'unknown';
};

export function detectDeviceClass(): TrafficContext['deviceClass'] {
  if (typeof window === 'undefined') return 'unknown';

  const width = window.innerWidth ?? 1280;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';

  return 'desktop';
}

export function readUtmParams(
  search = typeof window !== 'undefined' ? window.location.search : ''
): Pick<TrafficContext, 'utmSource' | 'utmMedium' | 'utmCampaign'> {
  const params = new URLSearchParams(search);

  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  };
}

export function getOrCreateSessionId(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);

  return id;
}

export function clearSessionId(): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function buildTrafficContext(includeSession: boolean): TrafficContext {
  const utm = readUtmParams();
  const sessionId = includeSession ? getOrCreateSessionId() : undefined;

  return {
    ...(sessionId ? { sessionId } : {}),
    referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    ...utm,
    deviceClass: detectDeviceClass(),
  };
}
