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
EXPOSE 8080
CMD ["npm", "run", "dev"]

# ── Production build ──────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
