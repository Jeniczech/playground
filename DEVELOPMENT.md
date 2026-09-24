# Playground – Development Setup

This document describes how to run the Playground project locally after cloning the repository.

## Stack

The project uses:

```text
Node.js 22.17.0
pnpm
Next.js
React
TypeScript
Payload CMS
PostgreSQL
Docker
```

Docker is used locally for PostgreSQL.

The Next.js application can be run directly on the host during development.

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

# 7. Start development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

Payload Admin is available through the Payload admin route configured by the application.

On a completely fresh database, create the first Payload user through the admin interface when prompted.

---

# 8. Payload collections

Current collections:

```text
Users
Media
Posts
```

Collection definitions live under:

```text
src/collections/
```

For example:

```text
src/collections/Posts.ts
```

Payload configuration:

```text
src/payload.config.ts
```

Generated Payload TypeScript types:

```text
src/payload-types.ts
```

---

# 9. Changing Payload schema

When changing collections or fields:

1. modify the Payload collection/config
2. generate/update Payload types as needed
3. create a database migration
4. inspect the generated migration
5. test it locally
6. commit the migration together with the code change

Do not make production database schema changes manually.

A code change and its required migration should belong to the same Git commit/release.

---

# 10. Payload Local API

Server-side Next.js code can access Payload directly.

Example:

```ts
const payload = await getPayload({ config })

const posts = await payload.find({
  collection: 'posts',
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

# 12. Deployment

Normal production deployment does not need to be performed manually.

Push to:

```text
main
```

GitHub Actions will:

```text
build Docker images
→ push to GHCR
→ connect to Basecamp
→ run migrations
→ deploy application
```

Production images are identified by the Git commit SHA.

Do not manually edit production application code on the VPS.

The Git repository should remain the source of truth.

---

# 13. Important production differences

Local development:

```text
PostgreSQL → localhost:5432
Next.js    → pnpm dev
```

Production:

```text
PostgreSQL → shared Docker network
Next.js    → Docker image
HTTPS      → Caddy
Deployment → GitHub Actions
```

Production secrets live on Basecamp and must not be copied into Git.

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