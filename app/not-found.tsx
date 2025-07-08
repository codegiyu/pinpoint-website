import { MainLayout } from '@/components/layout/MainLayout';
import { CTA } from '@/components/sections/shared/Cta';
import { MoveDown } from 'lucide-react';

export default function NoPage() {
  return (
    <MainLayout>
      <section className="min-h-screen w-full bg-gray-f2">
        <PageNotFound />
        <CTA variant="gray" />
        <MoveDown className="hidden lg:block size-9 text-dark stroke-1 fixed bottom-[3.75rem] left-[2.27vw] z-[20]" />
      </section>
    </MainLayout>
  );
}

const PageNotFound = () => {
  return (
    <section className="w-full bg-white">
      <div className="pinpoint-container grid gap-6 md:gap-10 lg:gap-14 pt-[7.5rem] pb-[6rem]">
        <p
          className="w-fit relative typo-caption-small uppercase opacity-80 before:w-full 
          before:h-[1px] before:absolute before:left-0 before:-bottom-2 before:bg-dark/60">
          Error 404
        </p>
        <h1 className="typo-h1">Page not found</h1>
        <p className="typo-body-4 pt-10">
          Sorry, we can&apos;t seem to find the page you are looking for ...
        </p>
      </div>
    </section>
  );
};
