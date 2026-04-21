import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobsCTA } from '@/components/sections/jobs/JobsCTA';
import JobsFooter from '@/components/sections/jobs/JobsFooter';
import { CommonHero } from '@/components/sections/shared/CommonHero';
import { getPage, listJobs } from '@/lib/api/pinpoint-public';
import { mapJobToCard } from '@/lib/utils/cms-mappers';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Metadata } from 'next';

const heroDescription = (
  <>
    <p>Do you have tremendous creativity but don&apos;t know what to do with it? Do you still</p>
    <p>have the soul of a child and take real pleasure in transforming things into real</p>
    <p className="md:text-wrap">applications? Do you play FIFA a lot? Join Pinpoint Global!</p>
  </>
);
const mobileHeroDescription = (
  <>
    <p>
      Do you have tremendous creativity but don&apos;t know what to do with it? Do you still have
      the soul of a child and take real pleasure in transforming things into real applications? Do
      you play FIFA a lot? Join Pinpoint Global!
    </p>
  </>
);

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPage('jobs');
    return metadataFromRouteSeo(page.content.seo, 'Jobs');
  } catch {
    return { title: 'Jobs' };
  }
}

async function fetchAllJobCards() {
  const aggregated: ReturnType<typeof mapJobToCard>[] = [];
  let page = 1;
  while (true) {
    const res = await listJobs({ page, limit: 100 });
    for (const j of res.jobs) {
      aggregated.push(mapJobToCard(j));
    }
    if (page >= res.pagination.pages) break;
    page += 1;
  }
  return aggregated;
}

export default async function JobsPage() {
  const jobCards = await fetchAllJobCards();

  return (
    <MainLayout pageName="Jobs" className="pt-6 md:pt-20 lg:pt-0">
      <CommonHero
        caption="JOBS"
        title="Join Pinpoint Global!"
        description={heroDescription}
        videoURL="https://static.pinpoint.ng/videos/jobs-animation.webm"
        bottomStripBackground=""
      />

      <div className="block md:hidden max-w-[900px] text-[clamp(10px,_1.2vw,_17px)] sm:text-[clamp(1.55rem,_1.2vw,_2.25rem)] py-16 pb-0 px-8 sm:px-16 bg-gray-f2 font-light leading-9 sm:leading-12 relative z-[5]">
        {mobileHeroDescription}
      </div>

      <div className="pt-[clamp(65px,_4.551vw,_165px)] bg-gray-f2 relative z-[5]">
        {jobCards.length ? (
          <>
            {jobCards.map((card, index) => (
              <JobsCTA {...card} index={index} key={card.href} />
            ))}
          </>
        ) : (
          <div className="w-full py-10">
            <p className="typo-body-7 text-66 text-center">No open positions available</p>
          </div>
        )}
      </div>
      <JobsFooter />

      <PageSideDecoration caption="JOBS" />
    </MainLayout>
  );
}
