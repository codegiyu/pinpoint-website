export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorData {
  hex: string;
  rgb: RGB;
  cmyk: CMYK;
}

/**
 * Converts HEX to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB to HEX
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB to CMYK
 */
export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Converts CMYK to RGB
 */
export function cmykToRgb(c: number, m: number, y: number, k: number): RGB {
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;

  const r = Math.round(255 * (1 - cNorm) * (1 - kNorm));
  const g = Math.round(255 * (1 - mNorm) * (1 - kNorm));
  const b = Math.round(255 * (1 - yNorm) * (1 - kNorm));

  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b)),
  };
}

/**
 * Parses a color string in various formats and returns ColorData
 */
export function parseColor(colorString: string): ColorData | null {
  // Try HEX format
  if (colorString.startsWith('#')) {
    const rgb = hexToRgb(colorString);
    if (rgb) {
      return {
        hex: colorString.toUpperCase(),
        rgb,
        cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
      };
    }
  }

  // Try RGB format: rgb(255, 255, 255) or 255, 255, 255
  const rgbMatch = colorString.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return {
        hex: rgbToHex(r, g, b),
        rgb: { r, g, b },
        cmyk: rgbToCmyk(r, g, b),
      };
    }
  }

  // Try CMYK format: cmyk(100, 50, 0, 0) or 100, 50, 0, 0
  const cmykMatch = colorString.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (cmykMatch) {
    const c = parseInt(cmykMatch[1], 10);
    const m = parseInt(cmykMatch[2], 10);
    const y = parseInt(cmykMatch[3], 10);
    const k = parseInt(cmykMatch[4], 10);
    if (c >= 0 && c <= 100 && m >= 0 && m <= 100 && y >= 0 && y <= 100 && k >= 0 && k <= 100) {
      const rgb = cmykToRgb(c, m, y, k);
      return {
        hex: rgbToHex(rgb.r, rgb.g, rgb.b),
        rgb,
        cmyk: { c, m, y, k },
      };
    }
  }

  return null;
}

/**
 * Formats color data for display
 */
export function formatColorDisplay(color: ColorData, format: 'hex' | 'rgb' | 'cmyk'): string {
  switch (format) {
    case 'hex':
      return color.hex;
    case 'rgb':
      return `RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    case 'cmyk':
      return `CMYK(${color.cmyk.c}, ${color.cmyk.m}, ${color.cmyk.y}, ${color.cmyk.k})`;
  }
}
