import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { newProjectTexts } from '@/lib/constants/texts';
import { getAllIndividualServices, getPackagedServicesList } from '@/lib/utils/transform';
import { Metadata } from 'next';
import { FormSwitches } from '@/components/sections/forms/FormSwitches';
import { Suspense } from 'react';
import { isAvailablePackagedService } from '@/lib/utils/typechecks';

interface Props {
  searchParams: Promise<{
    service?: string;
    package?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Starting A New Project?',
};

export default async function StartingANewProject({ searchParams }: Props) {
  const servicesList = getAllIndividualServices();
  const packagesServicesList = getPackagedServicesList();
  const { service, package: selectedPackage } = await searchParams;

  return (
    <MainLayout pageName="Starting a new project?">
      <FormPageHeadingSection heading="Let us discover your project" texts={newProjectTexts} />
      <Suspense fallback={null}>
        <FormSwitches servicesList={packagesServicesList} />
      </Suspense>
      {service && isAvailablePackagedService(service) && (
        <ProjectRequestForm
          servicesList={servicesList}
          service={service}
          selectedPackage={selectedPackage ?? ''}
        />
      )}
      <PageSideDecoration caption="Starting a new project?" />
    </MainLayout>
  );
}
