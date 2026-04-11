FROM node:20-alpine AS base
WORKDIR /app

# ── Dependency layer (cached unless package.json changes) ─────────────────────
FROM base AS deps
COPY package.json ./
RUN npm install

# ── Development image ─────────────────────────────────────────────────────────
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ── Production build ──────────────────────────────────────────────────────────
# TODO: Use this stage in compose.yaml once the app is production-ready.
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS prod
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
