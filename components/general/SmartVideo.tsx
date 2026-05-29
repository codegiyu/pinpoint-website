'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type SmartVideoProps = {
  src: string;
  className?: string;
  wrapClassName?: string;
  poster?: string;
  threshold?: number;
  preload?: 'none' | 'metadata' | 'auto';
  deferSrcUntilInView?: boolean;
};
const DEFAULT_THRESHOLD = 0.4;

export function SmartVideo({
  src,
  className,
  wrapClassName,
  poster,
  threshold = DEFAULT_THRESHOLD,
  preload = 'metadata',
  deferSrcUntilInView = false,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: threshold > 1 ? DEFAULT_THRESHOLD : threshold <= 0 ? DEFAULT_THRESHOLD : threshold,
  });
  const resolvedSrc = deferSrcUntilInView && !inView ? undefined : src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !resolvedSrc) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, resolvedSrc]);

  return (
    <div ref={ref} className={cn('', wrapClassName)}>
      <video
        ref={videoRef}
        src={resolvedSrc}
        poster={poster}
        muted
        playsInline
        loop
        preload={preload}
        width="100%"
        className={cn('', className)}
        style={{ height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
