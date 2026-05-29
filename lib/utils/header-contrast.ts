export type HeaderContrastMode = 'solid' | 'blend';

/** When any dark zone intersects the header band, use solid white chrome. */
export function resolveHeaderContrast(zoneIntersections: boolean[]): HeaderContrastMode {
  return zoneIntersections.some(Boolean) ? 'solid' : 'blend';
}

export const DEFAULT_HEADER_CONTRAST_ROOT_MARGIN = '0px 0px -85% 0px';

export interface HeaderContrastConfig {
  solidZones: string[];
  rootMargin?: string;
}
