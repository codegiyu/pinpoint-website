import type { CSSProperties } from 'react';
import type { PublicStyleRules, PublicStyleSpec } from '@/lib/api/pinpoint-public-types';

type StyleVars = CSSProperties & Record<string, string>;
type BreakpointKey = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const CSS_COLOR_PREFIXES = ['#', 'rgb(', 'rgba(', 'hsl(', 'hsla(', 'oklch(', 'var('];

function toColorValue(token: string): string {
  if (CSS_COLOR_PREFIXES.some(prefix => token.startsWith(prefix))) {
    return token;
  }
  return `var(--color-${token})`;
}

function setStyleVar(style: StyleVars, key: string, value?: string | number) {
  if (value == null || value === '') return;
  style[key] = String(value);
}

function setRuleVars(style: StyleVars, bp: BreakpointKey, rules?: PublicStyleRules) {
  if (!rules) return;
  const prefix = `--cms-${bp}`;

  setStyleVar(style, `${prefix}-width`, rules.width);
  setStyleVar(style, `${prefix}-max-height`, rules.maxHeight);
  setStyleVar(style, `${prefix}-display`, rules.display);
  setStyleVar(
    style,
    `${prefix}-color`,
    rules.textColorToken ? toColorValue(rules.textColorToken) : undefined
  );
  setStyleVar(
    style,
    `${prefix}-background-color`,
    rules.backgroundToken ? toColorValue(rules.backgroundToken) : undefined
  );
  setStyleVar(
    style,
    `${prefix}-rotate`,
    typeof rules.rotateDeg === 'number' ? `${rules.rotateDeg}deg` : undefined
  );
  setStyleVar(style, `${prefix}-grid-column-start`, rules.gridColumnStart);
  setStyleVar(style, `${prefix}-grid-column-end`, rules.gridColumnEnd);
  setStyleVar(style, `${prefix}-grid-row-start`, rules.gridRowStart);
  setStyleVar(style, `${prefix}-grid-row-end`, rules.gridRowEnd);
  setStyleVar(
    style,
    '--cms-peer-hover-rotate',
    typeof rules.peerHoverRotateDeg === 'number' ? `${rules.peerHoverRotateDeg}deg` : undefined
  );
}

export function hasStructuredStyle(style?: PublicStyleSpec): boolean {
  return Boolean(style?.responsive && Object.keys(style.responsive).length > 0);
}

export function getStyleVars(spec?: PublicStyleSpec): CSSProperties | undefined {
  if (!spec?.responsive) return undefined;

  const styleVars: StyleVars = {};
  setRuleVars(styleVars, 'base', spec.responsive.base);
  setRuleVars(styleVars, 'sm', spec.responsive.sm);
  setRuleVars(styleVars, 'md', spec.responsive.md);
  setRuleVars(styleVars, 'lg', spec.responsive.lg);
  setRuleVars(styleVars, 'xl', spec.responsive.xl);
  setRuleVars(styleVars, '2xl', spec.responsive['2xl']);

  return Object.keys(styleVars).length ? styleVars : undefined;
}
