import type { Metadata } from 'next';
import { ScrollRestorationHandler } from '@/components/general/ScrollRestorationHandler';
import './globals.css';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Creative communication agency based in Brussels | Atelier design | Atelier Design',
  description:
    'Atelier Design is a Brussels-based creative communications agency specialising in website design, branding, digital, print and strategy.',
  icons: '/favicon.webp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased m-0 p-0 relative`}>
        <ScrollRestorationHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
