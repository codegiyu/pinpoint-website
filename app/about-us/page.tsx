import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { OurStory } from '@/components/sections/about/OurStory';
import { OurReferences } from '@/components/sections/about/References';
import { Services } from '@/components/sections/about/Services';
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
      <OurStory />
      <Services />
      <OurReferences />
      <CTA />
      <PageSideDecoration caption="About Us" />
    </MainLayout>
  );
}
