export type ConsentChoice = 'pending' | 'accepted' | 'rejected';

export type ConsentState = {
  choice: ConsentChoice;
  updatedAt: number;
  expiresAt: number;
};

export type AnalyticsEventName =
  | 'page_view'
  | 'web_vital_lcp'
  | 'web_vital_inp'
  | 'web_vital_cls'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'client_error';

export type AnalyticsEvent = {
  name: AnalyticsEventName | string;
  ts: number;
  path?: string;
  sessionId?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceClass?: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  properties?: Record<string, string | number | boolean>;
};

export type TelemetryProviderId = 'first-party' | 'ga4';

export interface TelemetryProvider {
  id: TelemetryProviderId;
  track(event: AnalyticsEvent): void;
  page(path: string, title?: string): void;
  dispose?(): void;
}

export const VITAL_EVENT_NAMES = new Set<string>([
  'web_vital_lcp',
  'web_vital_inp',
  'web_vital_cls',
]);
