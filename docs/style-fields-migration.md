# Pinpoint Global Style Fields Migration

## What changed

Pinpoint Global CMS content is moving from runtime Tailwind class strings to structured style fields.

New fields:

- `stylePreset?: string`
- `style?: PinpointGlobalStyleSpec`
- `styleAdvanced?: Record<string, unknown>`

Legacy fields are still temporarily present for compatibility:

- `className`
- `textColorClass`

## Why this changed

Tailwind utilities delivered via CMS at runtime are not always compiled in the frontend bundle.
Structured style data allows deterministic rendering without depending on Tailwind class extraction.

## Responsive model

`style.responsive` supports:

- `base`
- `sm`
- `md`
- `lg`
- `xl`
- `2xl`

Example:

```ts
{
  stylePreset: 'mediaThreeColumnAtLg',
  style: {
    responsive: {
      base: { width: '100%' },
      md: { width: '50%' },
      lg: { width: '33.333%' }
    }
  }
}
```

## Recommended frontend usage

1. Prefer `style` / `stylePreset` fields when present.
2. Use `styleAdvanced` only for exceptional cases.
3. Fall back to legacy `className` / `textColorClass` only when style fields are absent.

Pseudo-flow:

```ts
const effective = item.style ?? deriveStyleFromLegacy(item.className);
```

## Affected payload areas

- Project root text styles (`textStyle*` + legacy `textColorClass`)
- Rendered service text styles (`textStyle*` + legacy `textColorClass`)
- Rendered service image styles (`style*` + legacy `className`)
- Service expertise breakdown styles (`style*` + legacy `className`)
- Service menu tile styles (`style*` + legacy `className`)
- Achievement block styles (`style*` + legacy `className`)

## Backend compatibility behavior

Backend now normalizes legacy class fields into style fields for:

- validation paths (admin create/patch)
- public payload shaping
- one-time seed migration for existing records

This allows gradual migration without immediate frontend breakage.
