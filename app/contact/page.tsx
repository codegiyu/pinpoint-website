import { MainLayout } from '@/components/layout/MainLayout';
import ContactPageContent from '@/components/sections/contact/ContactPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <MainLayout
      pageName="Contact"
      headerProps={{
        whiteTextStart: true,
      }}>
      <ContactPageContent />
    </MainLayout>
  );
}
