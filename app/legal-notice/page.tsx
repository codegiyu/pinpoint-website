import { Article } from '@/components/general/Article';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';

export default function LegalNotice() {
  return (
    <MainLayout>
      <CommonHeroTextSection caption="Notice" title="Legal Notice" />
      <section className="w-full py-16">
        <div className="pinpoint-container">
          <Article paragraphs={paragraphs} />
        </div>
      </section>
      <CTA variant="gray" />
      <PageSideDecoration caption="Legal Notice" />
    </MainLayout>
  );
}

const paragraphs: string[][] = [];
