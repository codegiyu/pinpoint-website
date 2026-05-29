export type HeaderChromeColor = 'white' | 'black';

export type HeaderZoneKind = 'dark' | 'dark-from-md';

/** White chrome on dark sections; black chrome elsewhere. */
export function resolveHeaderChromeColor(darkZoneIntersections: boolean[]): HeaderChromeColor {
  return darkZoneIntersections.some(Boolean) ? 'white' : 'black';
}

export const DEFAULT_HEADER_CHROME_ROOT_MARGIN = '0px 0px -85% 0px';

export const HEADER_DARK_ZONE_SELECTOR =
  '[data-header-zone="dark"], [data-header-zone="dark-from-md"]';

const MD_BREAKPOINT = '(min-width: 768px)';

/** Whether an intersecting element should force white header chrome. */
export function shouldUseWhiteHeaderChrome(
  element: Element,
  isIntersecting: boolean,
  legacyDarkZoneIds: ReadonlySet<string>
): boolean {
  if (!isIntersecting) return false;

  const zone = element.getAttribute('data-header-zone') as HeaderZoneKind | null;

  if (zone === 'dark') return true;

  if (zone === 'dark-from-md') {
    return typeof window !== 'undefined' && window.matchMedia(MD_BREAKPOINT).matches;
  }

  if (element instanceof HTMLElement && element.id && legacyDarkZoneIds.has(element.id)) {
    return true;
  }

  return false;
}

export interface HeaderContrastConfig {
  /** Extra element ids for dark sections (in addition to [data-header-zone]). */
  solidZones: string[];
  rootMargin?: string;
}
