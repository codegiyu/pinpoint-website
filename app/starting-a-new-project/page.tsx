import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectRequestForm } from '@/components/sections/forms/ProjectRequestForm';
import { CommonHeroTextSection } from '@/components/sections/shared/CommonHero';

export default function StartingANewProject() {
  return (
    <MainLayout pageName="Starting a new project?">
      <CommonHeroTextSection caption="" title="Let us discover your project" />
      <ProjectRequestForm />
    </MainLayout>
  );
}
