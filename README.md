# Playground

A Next.js + Payload CMS application backed by PostgreSQL.

Production: `https://praguescavengerhunt.cz`

## Stack

```text
Node.js 24 · pnpm · Next.js · React · TypeScript · Payload CMS · PostgreSQL · Docker
```

Payload is embedded in the Next.js app: the same process serves the frontend, the Payload admin, the REST API and the Local API used by Server Components.

Collections: `Users` (roles `admin` / `editor`).

## Quick start

```bash
nvm use
pnpm install
docker compose up -d postgres
pnpm payload migrate
pnpm dev
```

Then open `http://localhost:3000`. A `.env` with `DATABASE_URL` and `PAYLOAD_SECRET` is required — see `.env.example`.

## Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md) – local setup, schema changes, testing
- [DEPLOYMENT.md](DEPLOYMENT.md) – production images, CI/CD, migrations, rollback
- [ROADMAP.md](ROADMAP.md) – open items
- `Jeniczech/basecamp-infra` – the Basecamp server: SSH, Caddy, shared PostgreSQL, adding new apps
