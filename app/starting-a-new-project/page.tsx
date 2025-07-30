import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import Footer from '@/components/layout/Footer';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { newProjectTexts } from '@/lib/constants/texts';

export default function StartingANewProject() {
  return (
    <MainLayout pageName="Starting a new project?">
      <FormPageHeadingSection heading="Let us discover your project" texts={newProjectTexts} />
      <ProjectRequestForm />
      <Footer />
      <PageSideDecoration caption="Starting a new project?" />
    </MainLayout>
  );
}
