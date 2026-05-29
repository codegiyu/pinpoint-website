import { getSiteShellData } from '@/lib/site-shell';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  await getSiteShellData();

  return children;
}
