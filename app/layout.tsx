import type { Metadata, Viewport } from 'next';
import { ScrollRestorationHandler } from '@/components/general/ScrollRestorationHandler';
import './globals.css';
import { Providers } from './Providers';
import { SEO_DETAILS } from '@/lib/constants/texts';

export const metadata: Metadata = {
  ...SEO_DETAILS,
  openGraph: {
    title: SEO_DETAILS.title,
    description: SEO_DETAILS.description,
    type: 'website',
    url: SEO_DETAILS.metadataBase.toString(),
    siteName: 'Pinpoint Global',
    images: [{ url: SEO_DETAILS.image }],
  },
  twitter: {
    card: 'summary_large_image',
    // site: '@site',
    creator: '@TheLonerider20',
    images: SEO_DETAILS.image,
  },
};

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
      <body className={`antialiased m-0 p-0 load-animation-open relative`}>
        <ScrollRestorationHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
