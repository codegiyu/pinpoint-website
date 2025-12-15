import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Color Picker | Pinpoint Global',
  description:
    'Pick colors in RGB, HEX, or CMYK format. Download your color palette as PDF or PNG, or share it on WhatsApp.',
  openGraph: {
    images: ['https://static.pinpoint.ng/color-picker-preview.png'],
  },
  twitter: {
    images: ['https://static.pinpoint.ng/color-picker-preview.png'],
  },
};

export default function ColorPickerLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<></>}>{children}</Suspense>;
}
