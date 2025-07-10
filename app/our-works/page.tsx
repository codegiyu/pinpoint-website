import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';

export default function OurWorksPage() {
  return (
    <MainLayout>
      <CommonHeroTextSection
        caption="Our Case Studies"
        title="When our achievements speak for themselves"
      />
      <PageSideDecoration caption="Our Case Studies" />
    </MainLayout>
  );
}
