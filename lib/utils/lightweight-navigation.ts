export function shouldDisableHeavyRouteTransitions(): boolean {
  if (typeof window === 'undefined') return false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  if (window.matchMedia('(max-width: 767px)').matches) return true;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

  if (connection?.saveData) return true;

  return false;
}
