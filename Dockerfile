FROM node:22.17.0-alpine AS base

# pnpm via Corepack
RUN npm install -g corepack@0.36.0
RUN corepack enable


# ----------------------------
# Dependencies
# ----------------------------

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile


# ----------------------------
# Build
# ----------------------------

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build


# ----------------------------
# Database migrations
# ----------------------------

FROM builder AS migration

CMD ["pnpm", "payload", "migrate"]


# ----------------------------
# Production runtime
# ----------------------------

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]