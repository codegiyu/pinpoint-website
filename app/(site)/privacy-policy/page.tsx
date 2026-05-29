import { Article } from '@/components/general/Article';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';
import { getPage } from '@/lib/api/pinpoint-public';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPage('privacy-policy');
    return metadataFromRouteSeo(page.content.seo, 'Privacy Policy');
  } catch {
    return { title: 'Privacy Policy' };
  }
}

export default async function LegalNotice() {
  const page = await getPage('privacy-policy');
  const privacyPolicy = page.content.PRIVACY_POLICY ?? [];

  return (
    <MainLayout pageName="Privacy Policy">
      <FormPageHeadingSection caption="Policy" heading="Privacy Policy" texts={[]} />
      <section className="w-full pt-0 pb-24">
        <div className="form-page-container">
          <Article paragraphs={privacyPolicy} />
        </div>
      </section>
      <CTA variant="gray" />
      <PageSideDecoration caption="Privacy policy" />
    </MainLayout>
  );
}
