---
name: design-system
description: Use when the user shares a Figma link (figma.com/design/...) for a piece of the Prague Scavenger Hunt landing page, or asks to build or change a frontend section, component or design token. Reuses the existing tokens and components and extends the design system only where the design needs something new.
---

# Design system workflow

The design system lives in code:

- Tokens: `src/styles/tokens.css` (CSS custom properties, named after the Figma variables)
- Primitive components: `src/components/ui/<Name>/<Name>.tsx` + `<Name>.module.css`
- Page sections: `src/components/site/<Name>/<Name>.tsx` + `<Name>.module.css`
- Brand assets: `public/brand/`
- Inventory: `src/components/ui/README.md` lists every token, component, section and asset with its Figma source. **Read it first.**

Plain CSS Modules + custom properties. No Tailwind, no CSS-in-JS. Fonts come from `next/font/google` in `src/app/(frontend)/layout.tsx`.

## For each Figma link

1. **Read the design.** Load `figma:figma-design-to-code`, then `create_session`, `get_design_context` (with screenshot), `get_variable_defs` and `get_metadata` (exact frame geometry) for the node.
2. **Diff against the inventory.** For every color, font, text style, spacing value, radius and repeated element, look it up in `src/components/ui/README.md`:
   - Exact match: reuse the token or component.
   - Near match (e.g. a color a few % off, 30px vs 32px spacing): do not add a new token silently. Ask the user if the design is intentional or should snap to the existing token.
   - Missing: add a token named after the Figma variable (or a semantic name if the value has no variable), or a new `ui/` component if the element is reusable.
3. **Decide what is CMS-editable.** Most landing page content is CMS-editable, but confirm per section with the user (the header nav links are hard-coded by choice). Content that editors will change goes into Payload (a global for site-wide sections, fields on a collection/global for landing content). Layout and styling stay in code. Every schema change needs a migration (see CLAUDE.md); seed design copy in the migration with `payload.updateGlobal(..., req)` so the page isn't empty after deploy. The dev DB is built by migrations only (`push: false`), so apply the new migration with `pnpm payload migrate`; if you need to regenerate a migration that is already applied locally, run `pnpm payload migrate:down` first.
4. **Build.** Only tokens and design-system components, no hard-coded colors, fonts or spacing in section CSS. Translate absolute positioning into flex/grid. Use semantic HTML (`header`, `nav`, `ul`, `section`, headings in order). Static assets: download from the Figma export, strip export artifacts (page backgrounds, parent borders), and never use the temporary Figma URLs.
5. **Responsive.** If there is no mobile design, pick a sensible fallback, comment it in the CSS and tell the user it is an assumption.
6. **Verify.** Render with the dev server and Playwright (system Chrome: `chromium.launch({ channel: 'chrome' })`), compare the bounding boxes to the Figma metadata (within ±1px) and the screenshot to the Figma render, at 1440px and 375px.
7. **Update the inventory** (`src/components/ui/README.md`) with new tokens, components, sections and assets, including Figma node ids.
8. **Checks.** `pnpm generate:types` (if the schema changed), `pnpm lint`, `pnpm test:int`.
