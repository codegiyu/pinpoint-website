import type { Metadata } from 'next';
import { ScrollRestorationHandler } from '@/components/general/ScrollRestorationHandler';
import './globals.css';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Your Branding, Marketing, and Packaging Solution | Pinpoint Global Limited',
  description:
    "We are a creative brand consultancy into design, branding and packaging. \
    We've been collaborating with leading organizations to solve brand and \
    business challenges since 2019. Our team across different locations uses \
    the power of creativity to transform businesses for the better.",
  icons: '/favicon.png',
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
