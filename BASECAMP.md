# Basecamp 🏔️

Basecamp is a small self-hosted environment for running personal web
applications.

The current setup hosts a Payload CMS / Next.js application called
`playground` at:

`https://praguescavengerhunt.cz`

The goal was not only to get the application online, but to build a
reasonably production-like setup that can later host multiple
independent applications.

------------------------------------------------------------------------

# 1. Architecture

Current architecture:

``` text
Internet
   │
   │ HTTPS :443
   ▼
┌─────────────────────────────────────────┐
│ Basecamp VPS                            │
│ Ubuntu 24.04                            │
│                                         │
│  Caddy                                  │
│    │                                    │
│    │ reverse proxy                      │
│    ▼                                    │
│  playground                             │
│  Next.js + Payload CMS                  │
│    │                                    │
│    │ PostgreSQL                         │
│    ▼                                    │
│  PostgreSQL                             │
│                                         │
│  Docker network: basecamp-network       │
└─────────────────────────────────────────┘
```

Publicly exposed ports:

-   `22` -- SSH
-   `80` -- HTTP, primarily for redirect / certificate handling
-   `443` -- HTTPS

The application port `3000` and PostgreSQL port `5432` are not exposed
publicly.

------------------------------------------------------------------------

# 2. VPS

Provider: FORPSI

Server:

``` text
Ubuntu 24.04
2 vCPU
4 GB RAM
40 GB SSD
```

The server is called **Basecamp**.

Applications live under:

``` text
/opt/apps/
```

Shared infrastructure lives under:

``` text
/opt/basecamp/
```

For example:

``` text
/opt/
├── basecamp/
│   ├── compose.yml
│   ├── Caddyfile
│   └── .env
│
└── apps/
    └── playground/
        ├── compose.yml
        └── .env
```

This separation allows Basecamp to host multiple applications while
keeping shared infrastructure independent.

The shared infrastructure configuration is also version-controlled in the
private Git repository:

```text
Jeniczech/basecamp-infra
```

It contains:
```text
compose.yml
Caddyfile
.env.example
README.md
```

The repository is the source of truth for the shared PostgreSQL and Caddy
configuration. `/opt/basecamp/` contains the deployed copy plus the real
production .env, which is intentionally not stored in Git.

Shared infrastructure is currently deployed manually rather than through
CI/CD. This is intentional because changes to PostgreSQL or Caddy have a
larger blast radius than changes to a single application.

------------------------------------------------------------------------

# 3. SSH and basic server security

A non-root user is used for administration:

``` text
jenda
```

Root login and password authentication over SSH are disabled.

SSH configuration:

``` text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Authentication therefore requires an SSH key.

UFW is enabled and only allows:

``` text
22
80
443
```

Fail2ban is enabled for SSH.

There are currently two SSH identities:

1.  personal SSH key used from the development machine
2.  dedicated SSH key used by GitHub Actions

The GitHub Actions key currently authenticates as `jenda`.

Important: `jenda` belongs to the Docker group. Docker group membership
effectively provides root-level control over the server. A future
improvement is to create a more restricted deployment user.

------------------------------------------------------------------------

# 4. Docker

Docker is used both locally and in production.

Why Docker:

-   reproducible environment
-   application dependencies are isolated from the VPS
-   easier deployments
-   easy replacement of application containers
-   straightforward rollback to an older application image
-   multiple applications can coexist on the same VPS

Applications communicate through a shared external Docker network:

``` text
basecamp-network
```

It was created with:

``` bash
docker network create basecamp-network
```

The network is external because it is shared by multiple independent
Docker Compose projects.

------------------------------------------------------------------------

# 5. PostgreSQL

Basecamp runs one shared PostgreSQL server.

Each application gets:

-   its own database
-   its own PostgreSQL user
-   its own password

For `playground`:

``` text
database: playground
user: playground
```

The application never connects as the PostgreSQL superuser.

Conceptually:

``` text
PostgreSQL
├── playground database
│   └── playground user
│
├── future-app database
│   └── future-app user
│
└── another-app database
    └── another-app user
```

We chose one shared PostgreSQL container instead of one PostgreSQL
container per application mainly because Basecamp has only 4 GB RAM.

This keeps resource usage lower while still providing logical isolation
between applications.

PostgreSQL data is stored in a Docker volume, so recreating the
PostgreSQL container does not delete the database.

------------------------------------------------------------------------

# 6. Reverse proxy and HTTPS

Caddy is used as the reverse proxy.

Current configuration:

``` caddy
praguescavengerhunt.cz {
    reverse_proxy playground:3000
}

www.praguescavengerhunt.cz {
    redir https://praguescavengerhunt.cz{uri} permanent
}
```

Caddy automatically obtains and renews TLS certificates.

DNS:

``` text
praguescavengerhunt.cz → 81.2.239.212
```

The application itself does not expose port `3000` to the internet.

Caddy communicates with it over:

``` text
basecamp-network
```

The `playground` Compose service has the network alias:

``` text
playground
```

Therefore Caddy can always reach:

``` text
http://playground:3000
```

regardless of the generated Docker container name.

------------------------------------------------------------------------

# 7. Playground application

The application consists of:

``` text
Next.js
Payload CMS
PostgreSQL
TypeScript
```

Payload is integrated directly into the Next.js application rather than
running as a separate backend service.

This means the architecture is essentially:

``` text
Next.js
├── frontend
├── Payload Admin
├── Payload API
└── Payload Local API
        │
        ▼
    PostgreSQL
```

Server Components can use the Payload Local API directly without making
an HTTP request to the application's own REST API.

Example:

``` ts
const payload = await getPayload({ config })

const posts = await payload.find({
  collection: 'posts',
})
```

------------------------------------------------------------------------

# 8. Payload collections

The playground currently contains:

``` text
Users
Media
Posts
```

`Posts` contains fields such as:

``` text
title
slug
content
published
author
```

Anonymous users can only read published posts.

`Users` has two roles: `admin` and `editor`. New users default to
`editor`. Admins can manage users and roles; editors can read/update
only themselves and cannot promote themselves, create users, or delete
users. These authorization rules are covered by integration tests.

The homepage additionally explicitly queries:

``` text
published = true
```

This is intentional because Payload Local API can bypass access control
depending on how it is invoked.

------------------------------------------------------------------------

# 9. Database migrations

Payload database schema changes are managed through migrations.

Migrations live under:

``` text
src/migrations/
```

The initial migration creates the current Payload schema.

A migration image is built separately from the production runtime image.

Dockerfile targets:

``` text
runner
migration
```

This allows the same source code to produce:

``` text
application image
migration image
```

Both therefore correspond to exactly the same Git commit.

Production deployment runs the migration before starting the new
application version.

If migration execution fails, deployment stops and the new application
image is not started.

Important limitation:

This does NOT currently provide a complete database rollback strategy.

A failed or successful schema migration can potentially make an older
application version incompatible with the database.

Future production migrations should therefore preferably follow
backward-compatible patterns such as expand/contract migrations.

------------------------------------------------------------------------

# 10. Docker images

Images are stored in GitHub Container Registry:

``` text
ghcr.io/jeniczech/playground
```

Each build produces only SHA-tagged application images:

``` text
playground:<git-sha>
```

and SHA-tagged migration images:

``` text
playground:migration-<git-sha>
```

Mutable deployment tags such as `latest` are intentionally not published
or used by the deployment workflow. Production deployment and automatic
rollback accept the full 40-character Git SHA tag, so the release being
started is explicit.

------------------------------------------------------------------------

# 11. CI/CD

Deployment is automated using GitHub Actions. A push to `main` starts:

``` text
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

The production Compose configuration is versioned in the application
repository under `deploy/compose.yml`. `IMAGE_TAG` is mandatory:

``` yaml
image: "ghcr.io/jeniczech/playground:${IMAGE_TAG:?IMAGE_TAG must be set}"
```

There is deliberately no `latest` fallback.

Before replacing `compose.yml`, the workflow copies the current file to
`compose.yml.previous`. If an application rollback is safe and required,
both the previous Compose configuration and the previous SHA-tagged
image are restored. On a successful deployment the temporary previous
Compose file is removed.

The application exposes `GET /api/health`. The endpoint performs a small
Payload query against the `users` collection, so a healthy result
verifies both the application and database connectivity. The production
Compose service uses this endpoint as its Docker healthcheck.

Docker health uses a 10-second start period, 10-second interval and six
retries. The deployment and rollback wait loops allow up to 24 checks at
five-second intervals, giving the Docker healthcheck enough time to move
out of `starting`. Both loops exit early when Docker reports `healthy`
or `unhealthy`.

The normal unhealthy-release rollback path has been deliberately tested
with a release whose health endpoint returned HTTP `503`; the previous
Compose configuration and previous application image were restored and
became healthy. The workflow still exits as failed because the requested
release was not deployed.

Database migrations are different. Before running `payload migrate`, the
workflow compares migration files contained in the release image with
the names recorded in production's `payload_migrations` table. If the
release had a pending migration and the migration step completed,
automatic application rollback is refused after a failed health check.
This avoids unattended startup of an older application against a newly
migrated schema. That guard has also been deliberately tested.

This is a safety guard, not a complete database rollback strategy.
Production migrations should still follow backward-compatible
expand/contract patterns wherever practical. Database down migrations
are not run automatically during rollback.

The workflow uses strict shell settings (`set -Eeuo pipefail`), a
dedicated SSH key and a pinned server host key with
`StrictHostKeyChecking=yes`.

GitHub Actions also uses workflow-level concurrency for production:

``` yaml
concurrency:
  group: playground-production
  cancel-in-progress: false
```

Only one production workflow can run at a time. An in-progress
deployment is not cancelled by a newer push, which prevents concurrent
workflows from racing over `compose.yml.new`, `compose.yml.previous`,
the running container, or rollback state.

------------------------------------------------------------------------

# 12. Secrets

Secrets are intentionally kept outside Git.

Local development uses:

``` text
.env
```

Production uses:

``` text
/opt/apps/playground/.env
```

It contains values such as:

``` text
DATABASE_URL
PAYLOAD_SECRET
```

Production `.env` permissions are restricted.

GitHub Actions additionally stores SSH-related secrets.

`.env` files are excluded from Docker build context and Git.

Secrets must never be committed into the repository or baked into Docker
images.

------------------------------------------------------------------------

# 13. Creating another application on Basecamp

A new application does NOT require another VPS, Caddy instance, or
PostgreSQL server.

The rough procedure is:

## 13.1 Create PostgreSQL credentials

Create a dedicated PostgreSQL role:

``` sql
CREATE USER myapp WITH PASSWORD '<password>';
```

Create its database:

``` sql
CREATE DATABASE myapp OWNER myapp;
```

Do not use the PostgreSQL superuser from the application.

## 13.2 Create application directory

``` bash
sudo mkdir -p /opt/apps/myapp
sudo chown jenda:jenda /opt/apps/myapp
```

Create:

``` text
/opt/apps/myapp/
├── compose.yml
└── .env
```

## 13.3 Connect to shared Docker network

The application's Compose configuration should use:

``` yaml
networks:
  basecamp-network:
    external: true
```

Give the application a unique network alias, for example:

``` yaml
networks:
  basecamp-network:
    aliases:
      - myapp
```

## 13.4 Configure database

Production connection:

``` text
postgres://myapp:<password>@postgres:5432/myapp
```

`postgres` is the Docker network hostname of the shared PostgreSQL
service.

## 13.5 Add Caddy configuration

For example:

``` caddy
example.com {
    reverse_proxy myapp:3000
}
```

Reload/restart Caddy after validating the configuration.

## 13.6 Configure DNS

Point the domain's A record to:

``` text
81.2.239.212
```

Do not unnecessarily modify unrelated MX, SPF, DKIM or other mail
records.

## 13.7 Configure GHCR

Build application and migration images and publish them to GitHub
Container Registry.

Prefer immutable Git SHA tags for production deployments.

## 13.8 Configure GitHub Actions

Add the required repository secrets and create a workflow that:

``` text
build
→ push
→ SSH
→ migrate
→ deploy
```

## 13.9 First deployment

Run the initial Payload migration before expecting the application to
work against an empty database.

Verify both:

``` text
internal Docker connectivity
public HTTPS endpoint
```

------------------------------------------------------------------------

# 14. What is still missing

The current setup works, but it is not the end of the production
hardening process.

## Database backups --- high priority

Automated PostgreSQL backups are not configured yet.

We need:

``` text
scheduled pg_dump
        ↓
off-server storage
        ↓
retention policy
        ↓
periodic restore test
```

A backup that has never been restored is not yet a proven backup.

## Payload Media persistence --- high priority before using uploads

Files written only inside the application container are ephemeral.

Recreating the container can remove them.

Before relying on Payload Media uploads, configure either:

``` text
persistent Docker volume
```

or preferably:

``` text
S3-compatible object storage
```

for long-term production use.

## Deployment health checks and rollback --- completed

Production has a database-aware `/api/health` endpoint, Docker
healthcheck, deploy-time health waiting, rollback of both the previous
Compose configuration and previous SHA-tagged application image, and a
guard that refuses automatic rollback when the release applied a
database migration.

The healthy deployment path, the automatic rollback path for an application
that fails its health check, and the migration rollback-refusal path have
been tested with controlled failure scenarios.

These tests verify the intended behavior for those specific failure modes;
they do not guarantee automatic recovery from every possible deployment,
Docker, infrastructure, or migration failure.

## Database migration strategy

The workflow now detects pending Payload migrations before applying them
and refuses unattended application rollback after a migration was
applied.

This reduces the risk of starting an older application against a newer
schema, but it is not a complete database migration strategy.

Still define and enforce conventions for:

-   failed/partially applied migrations
-   backward-compatible expand/contract migrations
-   destructive migrations
-   manual recovery after a migrated release fails

Do not automatically run database down migrations during application
rollback.

## Deployment user hardening

GitHub Actions currently connects as `jenda`.

Because `jenda` belongs to the Docker group, this effectively provides
very powerful server access.

A more mature setup could use:

``` text
dedicated deploy user
+
restricted SSH permissions
+
restricted deployment command/script
```

## GHCR credentials on Basecamp

Use a dedicated read-only credential for production image pulls rather
than a broader personal credential.

## Monitoring

There is currently no proper monitoring/alerting.

Potential future additions:

``` text
uptime monitoring
application error tracking
CPU/RAM/disk monitoring
disk-space alerts
database monitoring
```

## E2E tests in CI

Playwright E2E tests exist in the repository but are not currently executed
by the GitHub Actions verification job.

The current CI gate covers:

- migrations against a fresh PostgreSQL database
- lint
- integration tests

A future improvement is to build/start the application in CI and run
`test:e2e` before allowing deployment.

## Email

Payload currently has no production email adapter configured.

This will matter for features such as:

``` text
password reset
transactional email
notifications
```

# 15. Current status

Working:

``` text
✅ VPS
✅ SSH hardening
✅ pinned SSH host verification
✅ firewall
✅ fail2ban
✅ Docker
✅ shared Docker network
✅ shared infrastructure configuration versioned in Git (`Jeniczech/basecamp-infra`)
✅ PostgreSQL
✅ separate application DB/user
✅ Caddy
✅ HTTPS
✅ DNS
✅ Next.js
✅ Payload CMS
✅ Payload migrations
✅ user roles and access control
✅ access-control integration tests
✅ optimized migration Docker target
✅ Docker production build
✅ GHCR
✅ immutable SHA images
✅ CI quality gate (migrations + lint + integration tests)
   * Playwright end-to-end tests (`test:e2e`) are currently not part of the CI
   quality gate. The repository contains E2E coverage, but CI currently runs
   only migrations, lint, and integration tests. Adding E2E execution to CI
   requires building/starting the application and is a future improvement.
✅ GitHub Actions build
✅ automatic migrations
✅ automatic deployment
✅ database-aware health endpoint
✅ Docker healthcheck
✅ automatic application + Compose rollback
✅ rollback refused after applied DB migration
✅ tested healthy, rollback, and migration-guard paths
✅ serialized production deployments (GitHub Actions concurrency)
```

Still to do:

``` text
⬜ PostgreSQL backups + restore testing
⬜ persistent/object storage for Payload Media
⬜ further migration strategy hardening
⬜ restricted deployment user
⬜ dedicated read-only GHCR credentials
⬜ monitoring / alerts
⬜ production email
```
