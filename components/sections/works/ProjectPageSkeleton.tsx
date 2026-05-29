import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function ProjectHeroSkeleton() {
  return (
    <section className="w-full relative" aria-hidden>
      <div
        className="pinpoint-container xl:w-[61.875rem] 2xl:w-[70rem] lg:h-[70vh] lg:flex items-center
        pt-[7.5rem] pb-[6.25rem] md:pb-[10rem] lg:py-0
        xl:ml-[calc((100vw_-_794px)_/_2)] 2xl:ml-[calc((100vw_-_968px)_/_2)] relative">
        <div className="w-full max-h-[47.5rem] lg:max-h-none grid gap-[1.875rem] lg:ml-[4.375rem] xl:ml-0 relative">
          <Skeleton className="h-3 w-28 md:w-36" />
          <div className="grid gap-4 min-h-[34vh] md:min-h-0">
            <Skeleton className="h-10 md:h-14 w-full max-w-[18rem] md:max-w-[28rem]" />
            <Skeleton className="h-10 md:h-14 w-[92%] max-w-[22rem] md:max-w-[32rem]" />
            <Skeleton className="h-10 md:h-14 w-[75%] max-w-[16rem] md:max-w-[24rem] hidden sm:block" />
          </div>
        </div>
      </div>

      <div
        className="img-container w-full md:w-[calc(595px_+_((100%_-_595px)_/_2))]
        lg:w-[88vw] h-[30rem] lg:h-[clamp(500px,_65vh,_650px)]
        xl:w-[88vw] xl:h-[75vh] xl:min-h-[40.625rem] md:ml-auto">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      <div className="w-full h-[21.875rem] hidden md:block absolute -bottom-[15rem] z-0">
        <div className="w-full h-[150%] bg-gray-f2" />
      </div>
    </section>
  );
}

function ProjectIntroductionSkeleton() {
  return (
    <section className="w-full relative z-[2] bg-gray-f2" aria-hidden>
      <div className="pinpoint-container py-[3.75rem] md:py-[6.75rem] lg:py-[8.375rem] xl:[9.375rem]">
        <div className="w-full grid lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="text-section xl:pl-24 2xl:pl-32 3xl:pl-40">
            <div className="w-full grid gap-8">
              <Skeleton className="h-5 w-full max-w-3xl" />
              <Skeleton className="h-5 w-full max-w-2xl" />
              <Skeleton className="h-5 w-[94%] max-w-2xl" />
              <Skeleton className="h-5 w-[88%] max-w-xl hidden md:block" />
            </div>
          </div>

          <div className="w-fit h-fit grid pt-[3.75rem] md:pt-20 lg:pt-0 min-w-[12rem]">
            <div className="w-fit h-fit grid mb-6 xl:mb-[clamp(32px,_2.388vw,_42px)] gap-3">
              <Skeleton className="h-3 w-32" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
            <div className="w-fit h-fit grid gap-3">
              <Skeleton className="h-3 w-24" />
              <div className="grid gap-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
            <Skeleton className="h-5 w-36 mt-[3.125rem]" />
          </div>
        </div>
      </div>

      <Skeleton className="w-full h-[42vw] min-h-[14rem] md:h-[28rem] lg:h-[32rem] rounded-none" />
    </section>
  );
}

function RenderedServiceSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn('w-full relative z-[2] bg-white', className)} aria-hidden>
      <div className="pinpoint-container py-[12vw] md:py-[6.75rem] lg:py-[8.375rem] xl:py-[9.375rem]">
        <div className="w-full max-w-[75ch] mx-auto">
          <div className="w-full relative mb-[30px]">
            <Skeleton className="h-4 w-28 md:w-36" />
            <div className="w-fit h-fit hidden md:flex items-center gap-2 absolute top-1/2 right-full -translate-y-1/2 pr-4">
              <Skeleton className="h-3 w-5 rounded-none" />
              <Skeleton className="h-px w-6 rounded-none" />
            </div>
          </div>
          <Skeleton className="h-8 md:h-10 w-full max-w-xl mb-[28px] md:mb-[45px]" />
          <div className="grid gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[96%]" />
            <Skeleton className="h-4 w-[90%] hidden md:block" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap">
        <Skeleton className="w-full h-[50vw] min-h-[16rem] md:h-[22rem] lg:h-[28rem] rounded-none" />
      </div>
    </section>
  );
}

function RelatedProjectsSkeleton() {
  return (
    <section
      className="w-full bg-gray-f2 py-[3.75rem] md:py-[6.75rem] lg:py-[8.375rem] xl:[9.375rem]"
      aria-hidden>
      <div className="pinpoint-container pb-9 md:pb-14 flex justify-center">
        <Skeleton className="h-9 w-48 md:w-56" />
      </div>

      <div className="pinpoint-container md:hidden mb-10">
        <div className="flex gap-2 overflow-hidden">
          <ProjectCardSkeleton className="!w-[85vw] max-w-[450px] shrink-0" />
          <ProjectCardSkeleton className="!w-[70vw] max-w-[380px] shrink-0 opacity-60" />
        </div>
      </div>

      <div className="pinpoint-container h-fit hidden md:grid gap-16">
        <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
        <div className="w-full flex justify-center">
          <Skeleton className="h-12 w-56 md:w-64" />
        </div>
      </div>
    </section>
  );
}

function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('w-full', className)}>
      <Skeleton className="w-full h-[60vw] md:h-[200px] lg:h-[280px] xl:h-[clamp(354px,_26.418vw,_442px)] rounded-none" />
      <div className="w-full min-h-[200px] p-[26px_6.875vw_36px] md:p-[30px_28px_58px] grid gap-3">
        <Skeleton className="h-6 w-3/4 md:hidden" />
        <Skeleton className="h-4 w-2/3 hidden md:block" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </div>
  );
}

export function ProjectPageSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading project page" className="w-full">
      <span className="sr-only">Loading project page</span>
      <ProjectHeroSkeleton />
      <ProjectIntroductionSkeleton />
      <RenderedServiceSkeleton />
      <RenderedServiceSkeleton className="bg-gray-f2" />
      <RelatedProjectsSkeleton />
    </div>
  );
}
