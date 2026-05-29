import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectPageSkeleton } from '@/components/sections/works/ProjectPageSkeleton';

export default async function ProjectLoading() {
  return (
    <MainLayout pageName="Loading...">
      <ProjectPageSkeleton />
    </MainLayout>
  );
}
