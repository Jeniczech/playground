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
| `--color-white`          | `#ffffff`              | White          |
| `--color-slate-blue`     | `#4c6489`              | (no variable; hero description) |
| `--color-ink`            | `#101c30`              | (no variable; store badge background) |
| `--color-sun-yellow`     | `#ffc33a`              | Sun Yellow     |
| `--color-mist-blue`      | `#e5edff`              | (no variable; hero halo) |

Brown `#5f5350` and Sand `#f0efeb` only appear inside `golem.svg`, so they have no tokens yet.
Semantic aliases: `--color-text` (Night Blue), `--color-background` (Morning Blue), `--color-divider` (Night Blue 10), `--color-text-muted` (Slate Blue).

### Typography

| Token                            | Value                               | Figma                         |
| -------------------------------- | ----------------------------------- | ----------------------------- |
| `--font-display`                 | Instrument Serif (next/font)        | Instrument Serif Regular      |
| `--font-body`                    | Plus Jakarta Sans (next/font)       | Plus Jakarta Sans             |
| `--font-weight-regular`          | 400                                 |                               |
| `--font-weight-semibold`         | 600                                 |                               |
| `--font-weight-bold`             | 700                                 |                               |
| `--text-body-s-size` / `-line-height`   | 14px / normal                | Body S Semibold (with 600)    |
| `--text-body-xs-size` / `-line-height`  | 12px / normal                | Body XS Semibold (with 600)   |
| `--text-wordmark-size` / `-line-height` | 22px / 22px                  | Wordmark text (no style)      |
| `--text-display-xl-size` / `-line-height` / `-letter-spacing` | 92px (52px ≤768) / 0.97 / -0.02em | Hero heading (no style) |
| `--text-body-l-size` / `-line-height`   | 17px / 1.65                  | Hero description (no style)   |
| `--text-eyebrow-size` / `-line-height` / `-letter-spacing` | 11px / 14px / 0.12em | Section label, bold, uppercase (no style) |
| `--text-button-line-height`             | 22px                         | Button label                  |
| `--text-store-badge-caption-size`, `-name-size`, `-name-size-long` | 9px, 19px, 17px | Store badge texts |

Body S Regular (Figma) is `--text-body-s-*` with `--font-weight-regular`.
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
| `--space-12`      | 48px                                    |
| `--space-16`      | 64px                                    |
| `--page-gutter`   | 88px (40 ≤1024, 24 ≤768)                |
| `--header-height` | 96px                                    |

The hero snaps Figma's 10px/9px gaps to `--space-2`, its 54/52px vertical padding to `--space-12` and the adventure tag's 14px side padding to `--space-3` (decided with design).

### Radius

| Token           | Value |
| --------------- | ----- |
| `--radius-md`   | 10px  |
| `--radius-pill` | 999px |

### Shadow

| Token            | Value                               |
| ---------------- | ----------------------------------- |
| `--shadow-phone` | `0 12px 24px rgb(21 52 101 / 0.09)` |

The 40px tablet gutter is an assumption; there is no tablet design yet. Mobile (24px) comes from the mobile header `11502:18975`.

## Components (`src/components/ui/`)

| Component | Props               | Figma node                                         | Notes                                   |
| --------- | ------------------- | -------------------------------------------------- | --------------------------------------- |
| `Logo`    | none                | Prague Scavenger Hunt wordmark `11502:18468`       | Emblem `public/brand/emblem.svg` + wordmark, links to `/`. Emblem is 44px to match the wordmark height (Figma: 38px) |
| `NavLink` | `href`, `children`  | Navigation link `11502:18477`                      | Body S Semibold, underline on hover     |
| `ButtonLink` | `href`, `children` | How it works action `11513:4091`                 | Outline pill, 46px high, min 174px wide. Fills Night Blue on hover (hover state is an assumption) |
| `PhoneFrame` | `className`, `children` (screen content) | Actual app phone preview `11502:18522` | Night Blue 3px frame with Morning Blue screen. Size with `--phone-width` (default 270px) and optionally `--phone-aspect-ratio`; the radius scales with the width |
| `StoreBadge` | `store` (`app-store` \| `google-play`), `href` | Store badge `11513:4077`, `11513:4082` | 180×54 dark badge with store icon and label |

## Site sections (`src/components/site/`)

| Section      | Figma node            | CMS                                     |
| ------------ | --------------------- | --------------------------------------- |
| `SiteHeader` | Desktop `11502:18467`, mobile (≤560px) `11502:18975` | None, nav links are hard-coded            |
| `Hero`       | Discover Prague differently `11502:18480` (text `11513:4071`, illustration `11502:18504`; desktop only; ≤1024px the illustration stacks below the text, centered) | `hero` global: eyebrow, heading, description, store URLs, note, illustration tag. The "How it works" button is hard-coded |

## Assets (`public/brand/`)

| File         | Figma node                     | Notes                                                   |
| ------------ | ------------------------------ | ------------------------------------------------------- |
| `emblem.svg` | Brand emblem `11502:18469`     | SVG export; the page background and header border from the export were removed |
| `app-store.svg` | Apple symbol `11513:4078`   | White, 24×27                                             |
| `google-play.svg` | Google Play symbol `11513:4083` | White, 24×27                                      |
| `golem.svg`  | Original Golem guide `11502:18506` | 152×177.3                                      |
| `wandering-route.png` | Wandering route `11502:18642` | Dashed route, 2× PNG export (1001×1123) of a 500×561 layer |
| `footprints.svg` | footprints `11513:4088`    | Night Blue stroke, 18×18                                 |
