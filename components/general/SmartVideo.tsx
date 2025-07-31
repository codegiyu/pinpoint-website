'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type SmartVideoProps = {
  src: string;
  className?: string;
  wrapClassName?: string;
  poster?: string;
};

export function SmartVideo({ src, className, wrapClassName, poster }: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.25, // play only if at least 25% is visible
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
