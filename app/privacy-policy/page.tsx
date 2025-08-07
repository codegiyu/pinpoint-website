import { Article } from '@/components/general/Article';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';
import { PRIVACY_POLICY } from '@/lib/constants/texts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function LegalNotice() {
  return (
    <MainLayout pageName="Privacy Policy">
      <FormPageHeadingSection caption="Policy" heading="Privacy Policy" texts={[]} />
      <section className="w-full pt-0 pb-24">
        <div className="form-page-container">
          <Article paragraphs={PRIVACY_POLICY} />
        </div>
      </section>
      <CTA variant="gray" />
      <PageSideDecoration caption="Privacy policy" />
    </MainLayout>
  );
}
