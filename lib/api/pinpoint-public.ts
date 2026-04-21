import { cache } from 'react';
import type { Metadata } from 'next';
import type {
  AchievementsResponse,
  GlobalConfigResponse,
  JobsListResponse,
  PageKey,
  PageResponse,
  ProjectsListResponse,
  PublicJob,
  PublicProject,
  PublicServiceDetail,
  ReferencesResponse,
  ServicesListResponse,
  TeamResponse,
} from './pinpoint-public-types';

export class PinpointApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'PinpointApiError';
  }
}

function getBackendBase(): string {
  const base = process.env.NEXT_PUBLIC_PINPOINT_BACKEND_URL?.replace(/\/$/, '');
  if (!base) {
    throw new PinpointApiError('NEXT_PUBLIC_PINPOINT_BACKEND_URL is not set', 500);
  }
  return base;
}

async function pinpointGet<T>(path: string): Promise<T> {
  const url = `${getBackendBase()}/api/v1/public/pinpoint-global${path}`;
  const res = await fetch(url, { cache: 'no-store' });
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new PinpointApiError('Invalid JSON from Pinpoint API', res.status || 502);
  }
  const envelope = body as { success?: boolean; message?: string; data?: T };
  if (!res.ok || envelope.success !== true) {
    throw new PinpointApiError(
      typeof envelope.message === 'string' ? envelope.message : res.statusText,
      res.status
    );
  }
  return envelope.data as T;
}

export const getGlobalConfig = cache(async (): Promise<GlobalConfigResponse> => {
  return pinpointGet<GlobalConfigResponse>('/global-config');
});

export const getPage = cache(async (pageKey: PageKey): Promise<PageResponse> => {
  return pinpointGet<PageResponse>(`/pages/${pageKey}`);
});

export const getProjectBySlug = cache(async (slug: string): Promise<PublicProject> => {
  return pinpointGet<PublicProject>(`/projects/${encodeURIComponent(slug)}`);
});

export async function getProjectBySlugOrNull(slug: string): Promise<PublicProject | null> {
  try {
    return await getProjectBySlug(slug);
  } catch (e) {
    if (e instanceof PinpointApiError && e.status === 404) return null;
    throw e;
  }
}

export const listProjects = cache(
  async (query: {
    page?: number;
    limit?: number;
    sectors?: string[];
    services?: string[];
  }): Promise<ProjectsListResponse> => {
    const q = new URLSearchParams();
    if (query.page != null) q.set('page', String(query.page));
    if (query.limit != null) q.set('limit', String(query.limit));
    for (const s of query.sectors ?? []) {
      if (s) q.append('sectors', s);
    }
    for (const s of query.services ?? []) {
      if (s) q.append('services', s);
    }
    const qs = q.toString();
    return pinpointGet<ProjectsListResponse>(`/projects${qs ? `?${qs}` : ''}`);
  }
);

export const listServices = cache(async (): Promise<ServicesListResponse> => {
  return pinpointGet<ServicesListResponse>('/services');
});

export const getServiceBySlug = cache(async (slug: string): Promise<PublicServiceDetail> => {
  return pinpointGet<PublicServiceDetail>(`/services/${encodeURIComponent(slug)}`);
});

export async function getServiceBySlugOrNull(slug: string): Promise<PublicServiceDetail | null> {
  try {
    return await getServiceBySlug(slug);
  } catch (e) {
    if (e instanceof PinpointApiError && e.status === 404) return null;
    throw e;
  }
}

export const listJobs = cache(
  async (query: { page?: number; limit?: number } = {}): Promise<JobsListResponse> => {
    const q = new URLSearchParams();
    if (query.page != null) q.set('page', String(query.page));
    if (query.limit != null) q.set('limit', String(query.limit));
    const qs = q.toString();
    return pinpointGet<JobsListResponse>(`/jobs${qs ? `?${qs}` : ''}`);
  }
);

export const getJobBySlug = cache(async (slug: string): Promise<PublicJob> => {
  return pinpointGet<PublicJob>(`/jobs/${encodeURIComponent(slug)}`);
});

export async function getJobBySlugOrNull(slug: string): Promise<PublicJob | null> {
  try {
    return await getJobBySlug(slug);
  } catch (e) {
    if (e instanceof PinpointApiError && e.status === 404) return null;
    throw e;
  }
}

export const getTeam = cache(async (): Promise<TeamResponse> => {
  return pinpointGet<TeamResponse>('/team');
});

export const getReferences = cache(async (): Promise<ReferencesResponse> => {
  return pinpointGet<ReferencesResponse>('/references');
});

export const getAchievements = cache(async (): Promise<AchievementsResponse> => {
  return pinpointGet<AchievementsResponse>('/achievements');
});

/** Map global-config SEO to Next.js Metadata (root layout). */
export function globalSeoToMetadata(content: GlobalConfigResponse['content']): Metadata {
  const s = content.SEO_DETAILS;
  const base = s.metadataBase.replace(/\/$/, '');
  return {
    title: {
      default: s.title.default,
      template: s.title.template,
    },
    description: s.description,
    metadataBase: new URL(base.endsWith('/') ? base : `${base}/`),
    alternates: {
      canonical: s.alternates.canonical,
    },
    icons: s.icons,
    robots: {
      index: s.robots.index,
      follow: s.robots.follow,
      nocache: s.robots.nocache,
      googleBot: s.robots.googleBot,
    },
    authors: s.authors,
    keywords: s.keywords,
    generator: s.generator,
    openGraph: {
      title: s.title.default,
      description: s.description,
      type: 'website',
      url: base,
      siteName: 'Pinpoint Global',
      images: [{ url: s.image }],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@TheLonerider20',
      images: [s.image],
    },
    other: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      Pragma: 'no-cache',
      Expires: '0',
    },
  };
}
