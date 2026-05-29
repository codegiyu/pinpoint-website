import type { ProjectPagination } from '@/lib/api/pinpoint-public-types';
import type { WorkCardProps } from '@/components/sections/works/WorksDisplay';

export type OurWorksProjectsClientResponse = {
  projects: WorkCardProps[];
  pagination: ProjectPagination;
};

export async function fetchOurWorksProjects(params: {
  page: number;
  limit: number;
  sector?: string;
  service?: string;
}): Promise<OurWorksProjectsClientResponse> {
  const query = new URLSearchParams();
  query.set('page', String(params.page));
  query.set('limit', String(params.limit));
  if (params.sector) query.set('sector', params.sector);
  if (params.service) query.set('service', params.service);

  const res = await fetch(`/api/our-works/projects?${query.toString()}`);

  if (!res.ok) {
    throw new Error('Failed to load projects');
  }

  return res.json() as Promise<OurWorksProjectsClientResponse>;
}

export function appendWorkCards(
  existing: WorkCardProps[],
  incoming: WorkCardProps[]
): WorkCardProps[] {
  const seen = new Set(existing.map(item => item.id));
  const merged = [...existing];

  for (const item of incoming) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    merged.push(item);
  }

  return merged;
}
