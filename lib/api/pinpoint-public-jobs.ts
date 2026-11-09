import { cache } from 'react';
import { listJobs } from '@/lib/api/pinpoint-public';
import type { JobsListResponse } from '@/lib/api/pinpoint-public-types';

/** Backend `parsePagination` caps `limit` at 100 per request. */
export const JOBS_LIST_PAGE_MAX = 100;

/**
 * Loads all active jobs for the jobs listing page.
 * Uses one request when total ≤ 100; otherwise fetches remaining pages in parallel.
 */
export const listAllActiveJobs = cache(async (): Promise<JobsListResponse> => {
  const first = await listJobs({ page: 1, limit: JOBS_LIST_PAGE_MAX });

  if (first.pagination.pages <= 1) {
    return first;
  }

  const restPages = await Promise.all(
    Array.from({ length: first.pagination.pages - 1 }, (_, index) =>
      listJobs({ page: index + 2, limit: JOBS_LIST_PAGE_MAX })
    )
  );

  return {
    jobs: [...first.jobs, ...restPages.flatMap(page => page.jobs)],
    pagination: first.pagination,
  };
});
