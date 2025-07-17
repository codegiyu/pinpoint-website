import { MainLayout } from '@/components/layout/MainLayout';
import ContactPageContent from '@/components/sections/contact/ContactPageContent';

export default function ContactPage() {
  return (
    <>
      <MainLayout
        headerProps={{
          whiteTextStart: true,
        }}>
        <ContactPageContent />
      </MainLayout>
    </>
  );
}
