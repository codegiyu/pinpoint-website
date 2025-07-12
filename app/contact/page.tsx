import { MainLayout } from '@/components/layout/MainLayout';
import ContentPageContent from '@/components/sections/contact/ContactPageContent';

export default function ContactPage() {
  return (
    <>
      <MainLayout
        headerProps={{
          whiteTextStart: true,
        }}>
        <ContentPageContent />
      </MainLayout>
    </>
  );
}
