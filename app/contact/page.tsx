import { MainLayout } from '@/components/layout/MainLayout';
import ContactPageContent from '@/components/sections/contact/ContactPageContent';
import { callApi } from '@/lib/services/callApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default async function ContactPage() {
  const { data } = await callApi('GET_CONTACT_PAGE_TITLE_MODIFIERS', {});

  return (
    <MainLayout
      pageName="Contact"
      headerProps={{
        whiteTextStart: true,
      }}>
      <ContactPageContent textsArray={data?.contactPageTitleModifiers ?? []} />
    </MainLayout>
  );
}
