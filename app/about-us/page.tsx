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
import {
  getAchievements,
  getPage,
  getReferences,
  getTeam,
  listServices,
} from '@/lib/api/pinpoint-public';
import { mapServicesToSummaryCards, mapTeamMemberToSlide } from '@/lib/utils/cms-mappers';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPage('about-us');
    return metadataFromRouteSeo(page.content.seo, 'About Us');
  } catch {
    return { title: 'About Us' };
  }
}

export default async function AboutUsPage() {
  const [aboutPage, teamRes, references, achievements, { services }] = await Promise.all([
    getPage('about-us'),
    getTeam(),
    getReferences(),
    getAchievements(),
    listServices(),
  ]);

  const servicesSummary = mapServicesToSummaryCards(services);
  const ourStoryTexts = aboutPage.content.ourStoryTexts ?? [];
  const teamSlides = teamRes.team
    .filter(member => member.isFeatured === true)
    .sort((a, b) => a.order - b.order)
    .map(m => mapTeamMemberToSlide(m));
  const moreReferenceLogos = references.marquee.map(m => m.logo);

  return (
    <MainLayout pageName="About us">
      <CommonHero
        caption="Our Creative Agency"
        title="Creative by Nature, Strategic by Design"
        imageProps={{
          src: 'https://static.pinpoint.ng/images/about-page/hero-2.jpg',
          alt: 'Pinpoint team',
          priority: true,
        }}
      />
      <OurStory storyTexts={ourStoryTexts} />
      <Services servicesSummary={servicesSummary} />
      <MarqueeTextSection
        text="Repetition makes reputation, and reputation makes customers."
        wrapClassName="hidden md:block md:bg-white"
        scrollContainerClassName=""
      />
      <OurAchievements
        achievements={[...achievements.achievements]
          .sort((a, b) => a.order - b.order)
          .map(({ number, numberSuffix, desc, className, style }) => ({
            number,
            numberSuffix,
            desc,
            className,
            style,
          }))}
      />
      <Team team={teamSlides} />
      <OurReferences references={references.featured} moreReferences={moreReferenceLogos} />
      <CTA />
      <PageSideDecoration caption="About Us" />
    </MainLayout>
  );
}
