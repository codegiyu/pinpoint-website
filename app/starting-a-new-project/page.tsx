import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { FormSwitches } from '@/components/sections/forms/FormSwitches';
import { Suspense } from 'react';
import { getPage, listServices } from '@/lib/api/pinpoint-public';
import {
  getAllIndividualServicesFromCatalog,
  getPackagedServicesListFromAllowed,
} from '@/lib/utils/cms-mappers';
import { metadataFromRouteSeo } from '@/lib/utils/route-metadata';
import { Metadata } from 'next';
import { isAvailablePackagedService } from '@/lib/utils/typechecks';

interface Props {
  searchParams: Promise<{
    service?: string;
    package?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPage('starting-a-new-project');
    return metadataFromRouteSeo(page.content.seo, 'Starting A New Project?');
  } catch {
    return { title: 'Starting A New Project?' };
  }
}

export default async function StartingANewProject({ searchParams }: Props) {
  const [{ services }, startPage] = await Promise.all([
    listServices(),
    getPage('starting-a-new-project'),
  ]);

  const servicesList = getAllIndividualServicesFromCatalog(services);

  const cmsPackaged = startPage.content.AVAILABLE_PACKAGED_SERVICE_IDS ?? [];

  const packagesServicesList = getPackagedServicesListFromAllowed(cmsPackaged);

  const allowedPackaged = [
    ...new Set([...cmsPackaged, 'make_a_custom_request', 'make_an_enquiry']),
  ];

  const newProjectTexts = startPage.content.newProjectTexts ?? [];

  const { service = 'make_an_enquiry', package: selectedPackage } = await searchParams;

  return (
    <MainLayout pageName="Starting a new project?">
      <FormPageHeadingSection heading="Let us discover your project" texts={newProjectTexts} />
      <Suspense fallback={null}>
        <FormSwitches servicesList={packagesServicesList} allowedPackagedServiceIds={cmsPackaged} />
      </Suspense>
      {service && isAvailablePackagedService(service, allowedPackaged) && (
        <ProjectRequestForm
          servicesList={servicesList}
          service={service}
          selectedPackage={selectedPackage ?? ''}
          servicesCatalog={services}
        />
      )}
      <PageSideDecoration caption="Starting a new project?" />
    </MainLayout>
  );
}
