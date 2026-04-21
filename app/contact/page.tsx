import { MainLayout } from '@/components/layout/MainLayout';
import ContactPageContent from '@/components/sections/contact/ContactPageContent';
import { getGlobalConfig, getPage } from '@/lib/api/pinpoint-public';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPage('contact');
    return metadataFromRouteSeo(page.content.seo, 'Contact');
  } catch {
    return { title: 'Contact' };
  }
}

export default async function ContactPage() {
  const [{ content }, contactPage] = await Promise.all([getGlobalConfig(), getPage('contact')]);
  const modifiers = contactPage.content.changingContactTitleModifiers ?? [];

  return (
    <MainLayout
      pageName="Contact"
      headerProps={{
        whiteTextStart: true,
      }}
      hideFooter>
      <ContactPageContent
        changingContactTitleModifiers={modifiers}
        contactInformation={content.contactInformation}
        pinpointSocials={content.pinpointSocials}
      />
    </MainLayout>
  );
}
