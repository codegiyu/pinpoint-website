import { getTelemetryConfig } from './config';
import { readStoredConsent } from './consent';
import { buildTrafficContext, clearSessionId } from './context';
import { createFirstPartyProvider } from './providers/first-party';
import { createGa4Provider } from './providers/ga4';
import { sanitizeClientErrorMessage, sanitizeEventProperties } from './sanitize';
import type {
  AnalyticsEvent,
  AnalyticsEventName,
  ConsentChoice,
  ConsentState,
  TelemetryProvider,
} from './types';
import { VITAL_EVENT_NAMES } from './types';

export type TelemetryFacadeDeps = {
  getConsent: () => ConsentState;
  getConfig: () => ReturnType<typeof getTelemetryConfig>;
  getPath: () => string;
  providers: TelemetryProvider[];
};

function isVitalEvent(name: string): boolean {
  return VITAL_EVENT_NAMES.has(name);
}

function allowsFullAnalytics(choice: ConsentChoice): boolean {
  return choice === 'accepted';
}

function allowsVitals(choice: ConsentChoice): boolean {
  return choice === 'accepted' || choice === 'rejected' || choice === 'pending';
}

export function createTelemetryFacade(deps: TelemetryFacadeDeps) {
  const getActiveProviders = (eventName: string, choice: ConsentChoice): TelemetryProvider[] => {
    const vital = isVitalEvent(eventName);

    if (vital) {
      if (!allowsVitals(choice)) return [];
      return deps.providers.filter(p => p.id === 'first-party');
    }

    if (!allowsFullAnalytics(choice)) return [];

    return deps.providers.filter(p => {
      if (p.id === 'ga4' && choice !== 'accepted') return false;
      return true;
    });
  };

  const enrichEvent = (event: AnalyticsEvent, choice: ConsentChoice): AnalyticsEvent => {
    const path = event.path ?? deps.getPath();
    const includeSession = allowsFullAnalytics(choice) && !isVitalEvent(event.name);
    const context = buildTrafficContext(includeSession);

    return {
      ...event,
      path,
      ...(includeSession ? { sessionId: context.sessionId } : {}),
      ...(allowsFullAnalytics(choice)
        ? {
            referrer: event.referrer ?? context.referrer,
            utmSource: event.utmSource ?? context.utmSource,
            utmMedium: event.utmMedium ?? context.utmMedium,
            utmCampaign: event.utmCampaign ?? context.utmCampaign,
          }
        : {}),
      deviceClass: event.deviceClass ?? context.deviceClass,
      properties: sanitizeEventProperties(event.properties),
    };
  };

  return {
    getConsent: deps.getConsent,

    track(name: AnalyticsEventName | string, properties?: AnalyticsEvent['properties']) {
      const consent = deps.getConsent().choice;
      const providers = getActiveProviders(name, consent);
      if (!providers.length) return;

      const event = enrichEvent(
        {
          name,
          ts: Date.now(),
          properties,
        },
        consent
      );

      for (const provider of providers) {
        provider.track(event);
      }
    },

    page(path?: string, title?: string) {
      const consent = deps.getConsent().choice;
      const pagePath = path ?? deps.getPath();
      const providers = getActiveProviders('page_view', consent);

      if (!providers.length) return;

      const event = enrichEvent(
        {
          name: 'page_view',
          ts: Date.now(),
          path: pagePath,
          properties: title ? { page_title: title } : undefined,
        },
        consent
      );

      for (const provider of providers) {
        if (provider.page) {
          provider.page(pagePath, title);
        } else {
          provider.track(event);
        }
      }
    },

    trackError(error: unknown, context?: Record<string, string | number | boolean>) {
      const message =
        error instanceof Error
          ? sanitizeClientErrorMessage(error.message)
          : sanitizeClientErrorMessage(String(error));

      this.track('client_error', {
        message,
        ...context,
      });
    },

    onConsentChange(choice: ConsentChoice) {
      if (choice !== 'accepted') {
        clearSessionId();
      }
    },

    dispose() {
      for (const provider of deps.providers) {
        provider.dispose?.();
      }
    },
  };
}

function buildDefaultProviders(): TelemetryProvider[] {
  const config = getTelemetryConfig();
  if (!config.enabled) return [];

  const providers: TelemetryProvider[] = [];

  if (config.providers.includes('first-party') && config.ingestUrl && config.siteKey) {
    providers.push(
      createFirstPartyProvider({
        siteId: config.siteId,
        siteKey: config.siteKey,
        ingestUrl: config.ingestUrl,
      })
    );
  }

  if (config.providers.includes('ga4') && config.ga4MeasurementId) {
    providers.push(createGa4Provider({ measurementId: config.ga4MeasurementId }));
  }

  return providers;
}

let consentReader: () => ConsentState = readStoredConsent;
let singleton: ReturnType<typeof createTelemetryFacade> | null = null;

/** Lets React consent state drive routing without recreating providers. */
export function setTelemetryConsentReader(reader: () => ConsentState): void {
  consentReader = reader;
}

export function getTelemetry() {
  if (!singleton) {
    singleton = createTelemetryFacade({
      getConsent: () => consentReader(),
      getConfig: getTelemetryConfig,
      getPath: () => (typeof window !== 'undefined' ? window.location.pathname : '/'),
      providers: buildDefaultProviders(),
    });
  }

  return singleton;
}

export function resetTelemetryForTests(): void {
  singleton?.dispose();
  singleton = null;
}
