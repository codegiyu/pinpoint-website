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
};
const DEFAULT_THRESHOLD = 0.4;

export function SmartVideo({
  src,
  className,
  wrapClassName,
  poster,
  threshold = DEFAULT_THRESHOLD,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: threshold > 1 ? DEFAULT_THRESHOLD : threshold <= 0 ? DEFAULT_THRESHOLD : threshold, // play only if at least `${threshold}` is visible
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {}); // silently fail on autoplay restrictions
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className={cn('', wrapClassName)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        width="100%"
        className={cn('', className)}
        style={{ height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
