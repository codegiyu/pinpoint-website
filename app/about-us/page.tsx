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
import { OUR_ACHIEVEMENTS, OUR_REFERENCES, OUR_TEAM, ourStoryTexts } from '@/lib/constants/texts';
import { getServicesSummary } from '@/lib/utils/transform';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function AboutUsPage() {
  const servicesSummary = getServicesSummary();

  return (
    <MainLayout pageName="About us">
      <CommonHero
        caption="Our Creative Agency"
        title="Creative by Nature, Strategic by Design"
        imageProps={{
          src: 'https://static.pinpoint.ng/images/about-page/hero.webp',
          alt: 'Pinpoint design team',
          priority: true,
        }}
      />
      <OurStory storyTexts={ourStoryTexts} />
      <Services servicesSummary={servicesSummary} />
      <MarqueeTextSection
        text="Repitition makes reputation and reputation makes customers."
        wrapClassName="hidden md:block md:bg-white"
        scrollContainerClassName=""
      />
      <OurAchievements achievements={OUR_ACHIEVEMENTS} />
      <Team team={OUR_TEAM} />
      <OurReferences references={OUR_REFERENCES} />
      <CTA />
      <PageSideDecoration caption="About Us" />
    </MainLayout>
  );
}
