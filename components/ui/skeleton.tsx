import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-gray-d9 motion-reduce:animate-none', className)}
      aria-hidden
      {...props}
    />
  );
}

export { Skeleton };
