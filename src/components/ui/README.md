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
| `--color-cloud-blue`     | `#f5f8ff`              | (no variable; Prague experience background) |
| `--color-haze-blue`      | `#c4d2ea`              | (no variable; feature icon border) |

Sand `#f0efeb` only appears inside `golem.svg` (its hand-drawn details), so it has no token yet.
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
| `--text-display-cta-size` / `-line-height` | 56px (44px ≤768) / 1.03   | Download CTA heading (no style) |
| `--text-display-l-size` / `-line-height` | 48px (40px ≤768) / 1.08     | Prague experience title (no style) |
| `--text-display-m-size` / `-line-height` | 46px (38px ≤768) / normal   | How it works title (no style) |
| `--text-display-s-size` / `-line-height` | 44px (38px ≤768) / 1.08     | App preview heading (no style) |
| `--text-heading-l-size` / `-line-height` | 32px (26px ≤768) / 1.05     | Golem guide heading (no style) |
| `--text-heading-m-size` / `-line-height` | 28px / 1.15                 | Step and feature titles (no style) |
| `--text-heading-s-size` / `-line-height` | 26px / 1.15                 | Mobile feature titles (Figma 1.1, snapped) |
| `--text-body-m-size` / `-line-height`   | 16px / 1.25                  | Body M Regular (with 400)     |
| `--text-body-l-size` / `-line-height`   | 17px / 1.65                  | Hero description (no style)   |
| `--text-eyebrow-size` / `-line-height` / `-letter-spacing` | 11px / 14px / 0.12em | Section label, bold, uppercase (no style) |
| `--text-button-line-height`             | 22px                         | Button label                  |
| `--text-store-badge-caption-size`, `-name-size`, `-name-size-long` | 9px, 19px, 17px | Store badge texts |

Body S Regular (Figma) is `--text-body-s-*` with `--font-weight-regular`. Body M Semibold is `--text-body-m-*` with `--font-weight-semibold`.
Body S is 100% line height in Figma, but the text box renders at `normal` (18px), so the token uses `normal`.
Body M is also 100% in Figma, but its text box renders at 20px per line, while the browser's `normal` gives 21px, so the token pins 1.25.

### Spacing and layout

| Token             | Value                                   |
| ----------------- | --------------------------------------- |
| `--space-2`       | 8px                                     |
| `--space-3`       | 12px                                    |
| `--space-4`       | 16px                                    |
| `--space-5`       | 20px                                    |
| `--space-6`       | 24px                                    |
| `--space-7`       | 28px                                    |
| `--space-8`       | 32px                                    |
| `--space-10`      | 40px                                    |
| `--space-12`      | 48px                                    |
| `--space-14`      | 56px                                    |
| `--space-16`      | 64px                                    |
| `--space-18`      | 72px                                    |
| `--page-gutter`   | 88px (40 ≤1024, 24 ≤768)                |
| `--page-max-width` | 1264px (content width of the 1440px design) |
| `--page-padding-inline` | Gutter, growing to centre the content once the viewport is wider than 1440px. Use it for section side padding; backgrounds and borders stay full width |
| `--header-height` | 96px                                    |

The Prague experience section snaps Figma's 14px gaps to `--space-4`, 18px to `--space-4`, 6px to `--space-2`, the 44px divider padding to `--space-12`, the 13px icon radius to `--radius-lg` and the 28px/1.1 feature titles to `--text-heading-m-*` (decided with design). Its gallery hugs its content instead of Figma's fixed 660px height. On mobile, the same snapping applies to the How it works 44px top padding (`--space-12`), the 6px caption gap and the 18px gallery row gap.
The next adventure section snaps the 10px badge and contact gaps to `--space-2` and the mobile 44px guide-to-CTA gap to `--space-12`.
The hero snaps Figma's 10px/9px gaps to `--space-2`, its 54/52px vertical padding to `--space-12` and the adventure tag's 14px side padding to `--space-3` (decided with design).

### Radius

| Token           | Value |
| --------------- | ----- |
| `--radius-md`   | 10px  |
| `--radius-lg`   | 16px  |
| `--radius-xl`   | 24px  |
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
| `NavLink` | `href`, `weight` (`semibold` default \| `regular`), `children` | Navigation link `11502:18477`, footer link `11502:18970` | Body S Semibold (header) or Body S Regular (footer), underline on hover |
| `ButtonLink` | `href`, `children` | How it works action `11513:4091`                 | Outline pill, 46px high, min 174px wide. Fills Night Blue on hover (hover state is an assumption) |
| `PhoneFrame` | `className`, `children` (screen content) | Actual app phone preview `11502:18522` | Night Blue 3px frame with Morning Blue screen. Size with `--phone-width` (default 270px) and optionally `--phone-aspect-ratio`; the radius scales with the width |
| `Eyebrow` | `className`, `children` | Section labels `11502:18647`, `11502:18710`, hero eyebrow | Bold uppercase 11px label               |
| `StoreBadge` | `store` (`app-store` \| `google-play`), `href` | Store badge `11513:4077`, `11513:4082` | 54px dark badge with store icon and label. Fills its slot (StoreBadges sets the width) |
| `StoreBadges` | `appStoreUrl`, `googlePlayUrl`, `stretchOnMobile` | Download the app `11502:18945`, mobile `11502:19452` | Side by side from 375px up: 180px each, shrinking equally when the row is narrower. Stacked at full width below 375px (decided with design). `stretchOnMobile` fills the row at ≤768px (mobile CTA design) |

## Site sections (`src/components/site/`)

| Section      | Figma node            | CMS                                     |
| ------------ | --------------------- | --------------------------------------- |
| `SiteHeader` | Desktop `11502:18467`, mobile (≤560px) `11502:18975` | None, nav links are hard-coded            |
| `Hero`       | Discover Prague differently `11502:18480` (text `11513:4071`, illustration `11502:18504`; desktop only; ≤1024px the illustration stacks below the text, centered) | `hero` global: eyebrow, heading, description, store URLs, note, illustration tag. The "How it works" button is hard-coded |
| `PragueExperience` | The Prague experience: desktop `11502:18676` (features `11502:18679`, app preview `11502:18708`), mobile (≤768px) `11502:19183`. No tablet design: features go to 2 columns ≤1024px, the gallery to 2 columns of desktop phones ≤1340px. On mobile the phones are 162px and shrink with the column. Each phone shows the app screen picked in its `screen` field (files in `public/brand/screens/`), or stays empty | `prague-experience` global: title, features (icon, title, description), gallery label and heading, screenshots (screen, caption title and description) |
| `NextAdventure` | The next adventure: desktop `11502:18921`, mobile (≤768px) `11502:19428`. No tablet design: the guide and CTA stack ≤1024px. Contact block is the `#contact` anchor | `next-adventure` global: guide heading and description, CTA heading and description, contact heading and email. Store links come from the `hero` global |
| `SiteFooter` | Site footer: desktop `11502:18959`, mobile (≤768px) `11502:19466`. Uses `Logo` (the header emblem) instead of the footer's map emblem (decided with design) | None, links and copyright are hard-coded |
| `HowItWorks` | How it works: desktop `11502:18644`, mobile (≤768px, label hidden) `11502:19152`. Anchor `#how-it-works` | `how-it-works` global: title, label, steps (icon, title, description). Steps are numbered from their order |

## Assets (`public/brand/`)

| File         | Figma node                     | Notes                                                   |
| ------------ | ------------------------------ | ------------------------------------------------------- |
| `emblem.svg` | Brand emblem `11502:18469`     | SVG export; the page background and header border from the export were removed |
| `app-store.svg` | Apple symbol `11513:4078`   | White, 24×27                                             |
| `google-play.svg` | Google Play symbol `11513:4083` | White, 24×27                                      |
| `golem.svg`  | Original Golem guide `11502:18506` | 152×177.3. Silhouette recolored from Brown `#5f5350` to Night Blue (decided with design). Used in the hero and the next adventure section (`11502:18924`, 158px; 100px on mobile) |
| `wandering-route.png` | Wandering route `11502:18642` | Dashed route, 2× PNG export (1001×1123) of a 500×561 layer |
| `steps/flag.svg`, `steps/map.svg`, `steps/question.svg` | Adventure motif `11502:18651`, `11502:18659`, `11502:18668` | 25×25 Streamline icons. Strokes recolored from Figma's #373737 to Night Blue (decided with design); export backgrounds removed |
| `features/eye.svg`, `features/flag.svg`, `features/key.svg`, `features/diamond.svg` | scan-eye `11502:19691`, Checkpoint `11502:18687`, key-round `11502:19694`, Points `11502:18700` | 21×21. Eye and key are Lucide (1.4px stroke), flag and diamond Streamline (1px stroke, recolored from #373737 to Night Blue); export backgrounds removed |
| `screens/live-hunt.webp`, `screens/explore-hunts.webp` | — | App screenshots for the Prague experience gallery, picked per phone with the `screen` select. iPhone screenshots resized to 600px wide WebP; `next/image` serves them resized |
| `footprints.svg` | footprints `11513:4088`    | Night Blue stroke, 18×18                                 |
