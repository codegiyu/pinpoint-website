import { MarqueeTextSection } from '@/components/general/MarqueeTextSection';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { OurAchievements } from '@/components/sections/about/Achievements';
import { OurStory } from '@/components/sections/about/OurStory';
import { OurReferences } from '@/components/sections/about/References';
import { Services } from '@/components/sections/about/Services';
import { Team } from '@/components/sections/about/Team';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';

export default function AboutUsPage() {
  return (
    <MainLayout pageName="About us">
      <CommonHero
        caption="Our Creative Agency"
        title="Creative by Nature, Strategic by Design"
        imageProps={{
          src: '/images/about-page/hero.webp',
          alt: 'Pinpoint design team',
          priority: true,
        }}
      />
      <OurStory />
      <Services />
      <MarqueeTextSection
        text="Repitition makes reputation and reputation makes customers."
        wrapClassName="hidden md:block md:bg-white"
        scrollContainerClassName=""
      />
      <OurAchievements />
      <Team />
      <OurReferences />
      <CTA />
      <PageSideDecoration caption="About Us" />
    </MainLayout>
  );
}
