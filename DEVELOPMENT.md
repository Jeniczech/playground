# Playground – Development Setup

This document describes how to run the Playground project locally after cloning the repository.

## Stack

The project uses:

```text
Node.js 24.21.0
pnpm
Next.js
React
TypeScript
Payload CMS
PostgreSQL
Docker
```

The recommended local development workflow runs PostgreSQL in Docker while Next.js / Payload runs directly on the host. This gives the application the normal Next.js development experience while keeping the database isolated and reproducible.

The local Docker Compose configuration can also run the application container, so the entire stack can be started in Docker when testing the containerized setup. This is useful for verification, but it is not the primary development workflow.

---

# 1. Requirements

Install:

- Git
- Docker
- Node.js
- Corepack

The repository contains:

```text
.nvmrc
```

with the expected Node.js version.

If using NVM:

```bash
nvm install
nvm use
```

Enable Corepack:

```bash
corepack enable
```

The project declares the expected pnpm version in `package.json`.

Verify:

```bash
node --version
pnpm --version
docker --version
```

---

# 2. Clone repository

```bash
git clone git@github.com:Jeniczech/playground.git
cd playground
```

---

# 3. Install dependencies

```bash
pnpm install
```

Use pnpm rather than npm/yarn so the existing lockfile remains authoritative.

---

# 4. Environment variables

Create:

```text
.env
```

The application requires at least:

```env
DATABASE_URL=postgres://playground:playground@127.0.0.1:5432/playground
PAYLOAD_SECRET=<your-local-secret>
```

Generate your own Payload secret.

Do not copy production secrets into the local environment.

Do not commit `.env`.

---

# 5. Start PostgreSQL

The repository contains a Docker Compose configuration for local PostgreSQL.

Start it with:

```bash
docker compose up -d postgres
```

Check:

```bash
docker compose ps
```

Local PostgreSQL is available at:

```text
localhost:5432
```

with:

```text
database: playground
user: playground
```

These credentials are development-only.

---

# 6. Run database migrations

After cloning into a fresh environment, initialize the database:

```bash
pnpm payload migrate
```

Migration files are stored under:

```text
src/migrations/
```

Do not manually recreate the production schema.

The migration files are the source of truth for schema evolution.

---

# 7. Start the application

## Recommended development workflow

With PostgreSQL running in Docker, start Next.js / Payload directly on the host:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

In this mode the application uses the host-side `.env`, where PostgreSQL is available at `127.0.0.1:5432`. This is the primary workflow for day-to-day development.

Payload Admin is available through the Payload admin route configured by the application.

On a completely fresh database, create the first Payload user through the admin interface when prompted.

## Full Docker stack

The local Compose configuration can also run both the application and PostgreSQL:

```bash
docker compose up
```

In this mode both services run inside Docker and the application connects to PostgreSQL using the Compose service hostname `postgres` rather than `127.0.0.1`.

This mode is useful for testing the containerized application locally, but it is not the primary development workflow.

---

# 8. Payload collections

Current collections:

```text
Users
```

Collection definitions live under:

```text
src/collections/
```

For example:

```text
src/collections/Users.ts
```

Payload configuration:

```text
src/payload.config.ts
```

Generated Payload TypeScript types:

```text
src/payload-types.ts
```

`Users` currently supports `admin` and `editor` roles. New users default to `editor`. Admins can manage users and roles; editors can read/update only themselves and cannot promote themselves, create users, or delete users.

When testing access rules through the Payload Local API, remember that Local API calls are trusted by default. Authorization tests should explicitly enable access enforcement (for example with `overrideAccess: false`) and provide the user whose permissions are being tested.

---

# 9. Changing Payload schema

When changing collections or fields:

1.  modify the Payload collection/config
2.  generate/update Payload types as needed
3.  create a database migration
4.  inspect the generated migration
5.  test it locally
6.  commit the migration together with the code change

Do not make production database schema changes manually.

A code change and its required migration should belong to the same Git commit/release.

For significant schema evolution, prefer backward-compatible expand/contract migrations. Production never automatically rolls the database schema back, and a release that applied a migration is not rolled back automatically — see [DEPLOYMENT.md](DEPLOYMENT.md#6-database-migrations).

---

# 10. Payload Local API

Server-side Next.js code can access Payload directly.

Example:

```ts
const payload = await getPayload({ config })

const users = await payload.find({
  collection: 'users',
})
```

This avoids unnecessary HTTP calls from the server to its own REST API.

Be aware that Local API access-control behavior differs from an anonymous REST request.

Public queries should therefore explicitly enforce the intended business rules where appropriate.

For example, the public homepage explicitly queries only:

```text
published = true
```

---

# 11. Docker production build

The Dockerfile contains multiple targets.

Application runtime:

```text
runner
```

Database migration environment:

```text
migration
```

Build application image:

```bash
docker build --target runner -t playground:local .
```

Build migration image:

```bash
docker build --target migration -t playground:migration .
```

The production target uses Next.js standalone output.

---

# 11.1 Local quality checks

Before pushing a significant change, run:

```bash
pnpm lint
pnpm test:int
```

CI also applies migrations to a fresh PostgreSQL service before running the integration tests.

Playwright E2E tests exist in the repository but are not currently executed by the GitHub Actions verification job.

---

# 12. Deployment

Normal production deployment does not need to be performed manually.

Push to:

```text
main
```

GitHub Actions runs:

```text
verify
→ build
→ deploy
```

Every push to `main` deploys to production, including documentation-only changes.

Images, the CI/CD pipeline, health checks, rollback behavior and production secrets are documented in [DEPLOYMENT.md](DEPLOYMENT.md).

---

# 13. Important production differences

Recommended local development:

```text
PostgreSQL → Docker, exposed at localhost:5432
Next.js    → host via pnpm dev
```

Optional full Docker stack:

```text
PostgreSQL → Docker service `postgres`
Next.js    → Docker service `app`
```

Production:

```text
PostgreSQL → shared Basecamp server, reached as `postgres` on basecamp-network
Next.js    → SHA-tagged Docker image
HTTPS      → Caddy
Deployment → GitHub Actions
```

Production secrets live on Basecamp and must not be copied into Git. See [DEPLOYMENT.md](DEPLOYMENT.md).

---

# 14. Quick start

For an existing developer environment, the usual startup is simply:

```bash
nvm use
pnpm install
docker compose up -d postgres
pnpm payload migrate
pnpm dev
```

Then open:

```text
http://localhost:3000
```
