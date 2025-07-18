import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';

export default function AboutUsPage() {
  return (
    <MainLayout>
      <CommonHero
        caption="Our Communication Agency"
        title="Creative Minds for Impactful Communications"
        imageProps={{
          src: '/images/about-page/hero.webp',
          alt: 'Atelier design team',
          priority: true,
        }}
      />
      <CTA variant="gray" />
      <PageSideDecoration caption="About Us" />
    </MainLayout>
  );
}
