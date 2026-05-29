export type HeaderChromeColor = 'white' | 'black';

/** White chrome on dark sections; black chrome elsewhere. */
export function resolveHeaderChromeColor(darkZoneIntersections: boolean[]): HeaderChromeColor {
  return darkZoneIntersections.some(Boolean) ? 'white' : 'black';
}

export const DEFAULT_HEADER_CHROME_ROOT_MARGIN = '0px 0px -85% 0px';

export interface HeaderContrastConfig {
  /** Element ids for dark sections under the header (hero, video, etc.). */
  solidZones: string[];
  rootMargin?: string;
}
