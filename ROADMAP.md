# Roadmap

Open items for the Prague Scavenger Hunt website. Remove an item once it ships.

## SEO

The SEO basics shipped in #11 (metadata, canonical URL, Open Graph image, robots.txt, sitemap.xml, icons).

### Launch

- [ ] **Store links.** The App Store and Google Play badges still link to `#`. Set the real URLs in the Hero global in the admin.
- [ ] **Privacy policy page.** The header and footer links were removed because `/privacy` returned 404. Add the page and restore the links. Both app stores require a privacy policy.
- [ ] **Google Search Console.** Verify the domain and submit `https://praguescavengerhunt.cz/sitemap.xml`.

### Next

- [ ] **Structured data (JSON-LD).** `MobileApplication` with the store URLs, and `Organization` with the logo and contact email.
- [ ] **App store integration.** Once the apps are published, add the iOS Smart App Banner (`itunes: { appId }` in the metadata) and link the store listings back to the site.
- [ ] **Caching.** The homepage is `force-dynamic` and served with `no-store`. Use time-based revalidation, or revalidate from Payload `afterChange` hooks, since content only changes when it is edited.

### Later

- [ ] **How it works step titles.** The steps render as "1.", "2.", "3." with no title. Fill them in the admin.
- [ ] **Keyword content.** Make the H1 or a subheading say what the product is (a scavenger hunt app). Add a short FAQ section with `FAQPage` structured data.
- [ ] **Screenshot alt text.** Give app screenshots descriptive alt text once they replace the empty phone frames.
- [ ] **Czech version.** Add `cs` alongside `en`, with `hreflang` alternates.
- [ ] **`x-powered-by` header.** Set `poweredByHeader: false` in `next.config.ts`.
