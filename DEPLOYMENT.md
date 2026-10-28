# Playground – Production Deployment

This document describes how `playground` runs in production and how it gets there.

Production URL:

`https://praguescavengerhunt.cz`

The application is hosted on **Basecamp**, a shared self-hosted VPS. The server itself — SSH and firewall setup, the shared Caddy reverse proxy, the shared PostgreSQL server, the `basecamp-network` Docker network and the procedure for adding applications — is documented in the private repository:

```text
Jeniczech/basecamp-infra
```

For local development, see [DEVELOPMENT.md](DEVELOPMENT.md).

---

# 1. Production layout

```text
Internet
   │ HTTPS :443
   ▼
Caddy (shared, basecamp-infra)
   │ reverse_proxy playground:3000
   ▼
playground (Next.js + Payload CMS)
   │ postgres:5432
   ▼
PostgreSQL (shared, basecamp-infra)
```

On the server, the application lives under:

```text
/opt/apps/playground/
├── compose.yml
├── compose.yml.previous
└── .env
```

The Compose service joins the external `basecamp-network` with the network alias `playground`, so Caddy can always reach `http://playground:3000` regardless of the generated container name. Port `3000` is not exposed publicly.

The application connects to its own database and user on the shared PostgreSQL server:

```text
database: playground
user: playground
```

It never connects as the PostgreSQL superuser.

The production Compose source of truth is `deploy/compose.yml` in this repository. The copy in `/opt/apps/playground/` is uploaded by the deployment workflow. Do not manually edit production application code or configuration on the VPS.

---

# 2. Docker images

The Dockerfile has two targets:

```text
runner      application runtime (Next.js standalone output)
migration   Payload migration environment
```

Both are built from the same commit, so the application and its migrations always correspond to exactly the same Git SHA.

Images are stored in GitHub Container Registry:

```text
ghcr.io/jeniczech/playground
```

Each build produces only SHA-tagged images:

```text
playground:<git-sha>
playground:migration-<git-sha>
```

Mutable tags such as `latest` are intentionally not published or used. Deployment and rollback accept the full 40-character Git SHA tag, so the release being started is always explicit. `IMAGE_TAG` is mandatory in `deploy/compose.yml`:

```yaml
image: "ghcr.io/jeniczech/playground:${IMAGE_TAG:?IMAGE_TAG must be set}"
```

---

# 3. CI/CD

Deployment is automated by `.github/workflows/deploy.yml`. A push to `main` starts:

```text
verify
  ├── PostgreSQL 18 service
  ├── run migrations
  ├── lint
  └── integration tests
       ↓
build
  ├── build runner image
  ├── build migration image
  └── push SHA-tagged images to GHCR
       ↓
deploy
  ├── upload and validate production Compose config
  ├── remember currently running application image
  ├── log in to GHCR with the run's GITHUB_TOKEN
  ├── pull migration-<SHA> and app:<SHA>
  ├── detect whether the release has pending DB migrations
  ├── run Payload migrations
  ├── preserve the previous Compose config
  ├── activate the new Compose config
  ├── start app:<SHA>
  └── wait for Docker health
          ├── healthy → success
          └── unhealthy/timeout
                  │
                  ├── migrations were applied
                  │       → refuse automatic rollback
                  │       → manual intervention
                  │
                  └── no migration was pending
                          → restore previous Compose config
                          → restore previous SHA image
                          → wait for rollback health
```

Do not confuse `deploy/compose.yml` (production Compose config) with `.github/workflows/deploy.yml` (the CI/CD workflow).

The workflow uses strict shell settings (`set -Eeuo pipefail`), a dedicated SSH key and a pinned server host key with `StrictHostKeyChecking=yes`.

Production deployments are serialized:

```yaml
concurrency:
  group: playground-production
  cancel-in-progress: false
```

Only one production workflow can run at a time. An in-progress deployment is not cancelled by a newer push, which prevents concurrent workflows from racing over `compose.yml.new`, `compose.yml.previous`, the running container, or rollback state.

---

# 4. Health checks

The application exposes `GET /api/health`. The endpoint performs a small Payload query against the `users` collection, so a healthy result verifies both the application and database connectivity. The production Compose service uses this endpoint as its Docker healthcheck.

Docker health uses a 10-second start period, 10-second interval and six retries. The deployment and rollback wait loops allow up to 24 checks at five-second intervals (roughly two minutes), giving the Docker healthcheck enough time to move out of `starting`. Both loops exit early when Docker reports `healthy` or `unhealthy`.

---

# 5. Rollback

Before replacing `compose.yml`, the workflow copies the current file to `compose.yml.previous`. If an application rollback is safe and required, both the previous Compose configuration and the previous SHA-tagged image are restored. The previous configuration is intentionally retained after a successful deployment as one generation of last-known-good configuration for manual recovery. Before the next deployment it is replaced with the then-current production configuration.

A successful rollback restores production, but the workflow still exits as failed because the requested release was not deployed.

The rollback path has been deliberately tested with a release whose health endpoint returned HTTP `503`; the previous Compose configuration and previous application image were restored and became healthy.

---

# 6. Database migrations

Migrations live under `src/migrations/` and are applied by the migration image before the new application version starts. If migration execution fails, deployment stops and the new application image is not started.

Before running `payload migrate`, the workflow compares the migration files contained in the release image with the names recorded in production's `payload_migrations` table. If the release had a pending migration and the migration step completed, automatic application rollback is refused after a failed health check. This avoids unattended startup of an older application against a newly migrated schema. That guard has also been deliberately tested.

This is a safety guard, not a complete database rollback strategy:

- production never automatically rolls the database schema back
- database down migrations are not run during rollback
- a migration can make an older application version incompatible with the database

Production migrations should therefore follow backward-compatible expand/contract patterns wherever practical.

---

# 7. Secrets

Production secrets live in:

```text
/opt/apps/playground/.env
```

It contains values such as:

```text
DATABASE_URL
PAYLOAD_SECRET
```

Its permissions are restricted. GitHub Actions additionally stores SSH-related secrets.

Basecamp does not store a GHCR credential for this application. The deploy job logs the server in to GHCR with the workflow run's short-lived `GITHUB_TOKEN` (`packages: read`), pulls the release images, and logs out when the deploy script exits. Rollback uses the previous image that is already present on the server, so it needs no registry access.

`.env` files are excluded from Git and from the Docker build context. Secrets must never be committed into the repository or baked into Docker images.

---

# 8. What is still missing

Server-wide items (PostgreSQL backups, deployment user hardening, server monitoring) are tracked in `Jeniczech/basecamp-infra`.

## Payload Media persistence — high priority before using uploads

Files written only inside the application container are ephemeral and can be lost when the container is recreated.

Before relying on Payload Media uploads, configure either a persistent Docker volume or, preferably, S3-compatible object storage.

## Database migration conventions

Still define and enforce conventions for:

- failed/partially applied migrations
- backward-compatible expand/contract migrations
- destructive migrations
- manual recovery after a migrated release fails

## E2E tests in CI

Playwright E2E tests exist but are not executed by the `verify` job. A future improvement is to build/start the application in CI and run `test:e2e` before allowing deployment.

## Application error tracking

There is currently no error tracking for the application.

## Email

Payload has no production email adapter configured. This will matter for password reset, transactional email and notifications.

## GitHub Actions on Node 20

GitHub has deprecated Node 20 for JavaScript actions, so the runner forces these actions in `.github/workflows/deploy.yml` onto Node 24 and logs a warning:

- `actions/checkout@v4`
- `docker/setup-buildx-action@v3`
- `docker/login-action@v3`
- `docker/build-push-action@v6`

Upgrade them to releases that target Node 24.

---

# 9. Current status

Working:

```text
✅ Docker production build
✅ optimized migration Docker target
✅ GHCR with immutable SHA images
✅ CI quality gate (migrations + lint + integration tests)
✅ automatic migrations
✅ automatic deployment
✅ pinned SSH host verification
✅ database-aware health endpoint
✅ Docker healthcheck
✅ automatic application + Compose rollback
✅ rollback refused after applied DB migration
✅ tested healthy, rollback, and migration-guard paths
✅ serialized production deployments
```

Still to do:

```text
⬜ persistent/object storage for Payload Media
⬜ further migration strategy hardening
⬜ E2E tests in CI
⬜ application error tracking
⬜ production email
⬜ GitHub Actions upgrade off Node 20
```
