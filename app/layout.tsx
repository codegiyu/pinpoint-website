import type { Metadata, Viewport } from 'next';
import { ScrollRestorationHandler } from '@/components/general/ScrollRestorationHandler';
import './globals.css';
import { Providers } from './Providers';
import { getGlobalConfig, globalSeoToMetadata } from '@/lib/api/pinpoint-public';
import localFont from 'next/font/local';

const rubikFont = localFont({
  src: [
    { path: '../public/fonts/rubik/Rubik-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/rubik/Rubik-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../public/fonts/rubik/Rubik-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/rubik/Rubik-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/rubik/Rubik-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/rubik/Rubik-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../public/fonts/rubik/Rubik-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/rubik/Rubik-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  display: 'swap',
});

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
      <body className={`${rubikFont.className} antialiased m-0 p-0  relative`}>
        <ScrollRestorationHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
