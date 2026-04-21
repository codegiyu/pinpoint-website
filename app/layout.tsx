import type { Metadata, Viewport } from 'next';
import { ScrollRestorationHandler } from '@/components/general/ScrollRestorationHandler';
import './globals.css';
import { Providers } from './Providers';
import { getGlobalConfig, globalSeoToMetadata } from '@/lib/api/pinpoint-public';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { content } = await getGlobalConfig();
    return globalSeoToMetadata(content);
  } catch {
    const liveUrl = process.env.live_url || 'https://pinpoint.ng';
    return {
      title: {
        default: 'Pinpoint Global',
        template: '%s | Pinpoint Global',
      },
      description: 'Branding, marketing, and packaging.',
      metadataBase: new URL(liveUrl),
    };
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'only light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased m-0 p-0  relative`}>
        <ScrollRestorationHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
