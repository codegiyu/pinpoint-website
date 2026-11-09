import { cache } from 'react';
import { getGlobalConfig, listServices } from '@/lib/api/pinpoint-public';
import { buildNavlinks } from '@/lib/constants/routing';
import type { NavLinkGroupProps } from '@/components/layout/Header';
import type { GlobalConfigResponse, ServicesListResponse } from '@/lib/api/pinpoint-public-types';

export type SiteShellData = {
  content: GlobalConfigResponse['content'];
  services: ServicesListResponse['services'];
  navlinkGroups: NavLinkGroupProps[];
};

export const getSiteShellData = cache(async (): Promise<SiteShellData> => {
  const [{ content }, { services }] = await Promise.all([getGlobalConfig(), listServices()]);

  return {
    content,
    services,
    navlinkGroups: buildNavlinks(services),
  };
});
