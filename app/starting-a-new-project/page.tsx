import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import Footer from '@/components/layout/Footer';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { newProjectTexts } from '@/lib/constants/texts';
import { getAllIndividualServices, getPackagedServicesList } from '@/lib/utils/transform';
import { Metadata } from 'next';
import { FormSwitches } from '@/components/sections/forms/FormSwitches';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{
    service?: string;
    package?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Starting A New Project?',
};

export default function StartingANewProject({}: Props) {
  const servicesList = getAllIndividualServices();
  const packagesServicesList = getPackagedServicesList();

  return (
    <MainLayout pageName="Starting a new project?">
      <FormPageHeadingSection heading="Let us discover your project" texts={newProjectTexts} />
      <Suspense fallback={null}>
        <FormSwitches servicesList={packagesServicesList} />
      </Suspense>
      <ProjectRequestForm servicesList={servicesList} />
      <Footer />
      <PageSideDecoration caption="Starting a new project?" />
    </MainLayout>
  );
}
