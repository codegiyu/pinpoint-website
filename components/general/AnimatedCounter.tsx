'use client';
import { useCountUpOnInView } from '@/lib/hooks/use-countup-on-inview';

export interface AnimatedCounterProps {
  to: number;
  duration?: number;
}

export const AnimatedCounter = ({ to, duration = 1000 }: AnimatedCounterProps) => {
  const { ref, count } = useCountUpOnInView(to, duration);

  return <span ref={ref}>{count}</span>;
};
