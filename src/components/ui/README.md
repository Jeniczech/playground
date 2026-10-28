# Design system inventory

Source of truth for what already exists. Check this file before adding tokens or components, and update it in the same change.

Figma file: [Prague Scavenger Hunt App – Resources](https://www.figma.com/design/ZsIvVrmybvzNRbobciwMZu/Prague-Scavenger-Hunt-App---Resources--Copy-)

## Tokens (`src/styles/tokens.css`)

### Color

| Token                    | Value                  | Figma variable |
| ------------------------ | ---------------------- | -------------- |
| `--color-night-blue`     | `#153465`              | Night Blue     |
| `--color-night-blue-10`  | `rgb(21 52 101 / 0.1)` | Night Blue 10  |
| `--color-morning-blue`   | `#dae5ff`              | Morning Blue   |

Semantic aliases: `--color-text` (Night Blue), `--color-background` (Morning Blue), `--color-divider` (Night Blue 10).

### Typography

| Token                            | Value                               | Figma                         |
| -------------------------------- | ----------------------------------- | ----------------------------- |
| `--font-display`                 | Instrument Serif (next/font)        | Instrument Serif Regular      |
| `--font-body`                    | Plus Jakarta Sans (next/font)       | Plus Jakarta Sans             |
| `--font-weight-regular`          | 400                                 |                               |
| `--font-weight-semibold`         | 600                                 |                               |
| `--text-body-s-size` / `-line-height`   | 14px / normal                | Body S Semibold (with 600)    |
| `--text-wordmark-size` / `-line-height` | 22px / 22px                  | Wordmark text (no style)      |

Body S is 100% line height in Figma, but the text box renders at `normal` (18px), so the token uses `normal`.

### Spacing and layout

| Token             | Value                                   |
| ----------------- | --------------------------------------- |
| `--space-2`       | 8px                                     |
| `--space-3`       | 12px                                    |
| `--space-4`       | 16px                                    |
| `--space-5`       | 20px                                    |
| `--space-6`       | 24px                                    |
| `--space-8`       | 32px                                    |
| `--page-gutter`   | 88px (40 ≤1024, 24 ≤768)                |
| `--header-height` | 96px                                    |

The 40px tablet gutter is an assumption; there is no tablet design yet. Mobile (24px) comes from the mobile header `11502:18975`.

## Components (`src/components/ui/`)

| Component | Props               | Figma node                                         | Notes                                   |
| --------- | ------------------- | -------------------------------------------------- | --------------------------------------- |
| `Logo`    | none                | Prague Scavenger Hunt wordmark `11502:18468`       | Emblem `public/brand/emblem.svg` + wordmark, links to `/`. Emblem is 44px to match the wordmark height (Figma: 38px) |
| `NavLink` | `href`, `children`  | Navigation link `11502:18477`                      | Body S Semibold, underline on hover     |

## Site sections (`src/components/site/`)

| Section      | Figma node            | CMS                                     |
| ------------ | --------------------- | --------------------------------------- |
| `SiteHeader` | Desktop `11502:18467`, mobile (≤560px) `11502:18975` | None, nav links are hard-coded            |

## Assets (`public/brand/`)

| File         | Figma node                     | Notes                                                   |
| ------------ | ------------------------------ | ------------------------------------------------------- |
| `emblem.svg` | Brand emblem `11502:18469`     | SVG export; the page background and header border from the export were removed |
