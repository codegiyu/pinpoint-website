import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import JobsDetailsFooter from '@/components/sections/jobs/JobsDetailsFooter';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { newProjectTexts } from '@/lib/constants/texts';

export default function StartingANewProject() {
  return (
    <MainLayout pageName="Starting a new project?">
      <FormPageHeadingSection heading="Let us discover your project" texts={newProjectTexts} />
      <ProjectRequestForm />
      <JobsDetailsFooter />
      <PageSideDecoration caption="Starting a new project?" />
    </MainLayout>
  );
}
