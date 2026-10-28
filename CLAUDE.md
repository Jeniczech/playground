# Claude Code

Next.js + Payload CMS + PostgreSQL app, deployed to `https://praguescavengerhunt.cz` on the self-hosted Basecamp VPS.

- [DEVELOPMENT.md](DEVELOPMENT.md) – local setup, schema changes, testing
- [DEPLOYMENT.md](DEPLOYMENT.md) – production images, CI/CD, migrations, rollback
- Server-wide infrastructure (Caddy, shared PostgreSQL, SSH) lives in `Jeniczech/basecamp-infra`, not here.

## Payload

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

- Collections live in `src/collections/`, config in `src/payload.config.ts`, generated types in `src/payload-types.ts` (`pnpm generate:types`).
- The Local API skips access control by default. Public queries must enforce business rules explicitly (e.g. `published = true`), and access-control tests must pass `overrideAccess: false` plus the user being tested.

## Schema changes

- Every schema change ships with a migration in `src/migrations/`, in the same commit as the code change (`pnpm payload migrate:create`, then review the generated file).
- Prefer backward-compatible expand/contract migrations. Production never rolls the schema back, and a release that applied a migration is not rolled back automatically.
- Never change the production database schema manually.

## Before finishing a change

```bash
pnpm lint
pnpm test:int
```

## Git and deployment

- Never push directly to `main`. Every push to `main` deploys to production, including docs-only changes.
- Work on a branch and open a pull request with `gh pr create`.
- CI does not run on pull requests; lint, migrations and integration tests only run after merging to `main`, right before deployment. Run the checks above locally before opening a PR.
- Never commit `.env` files or secrets.
