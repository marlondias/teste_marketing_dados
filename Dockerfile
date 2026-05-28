FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable pnpm

# Force pnpm to allow build scripts
RUN pnpm config set dangerously-allow-all-builds true

WORKDIR /app
COPY package.json pnpm-lock.yaml ./


# STAGE 2: Development
FROM base AS development
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
COPY . .
EXPOSE 3000


# STAGE 3: Production Build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
# Instantly drop devDependencies to minimize image footprint
RUN pnpm prune --prod


# STAGE 4: Final Lean Runtime
FROM node:24-slim AS production
ENV NODE_ENV=production
WORKDIR /app

# Safely copy only the transpiled NestJS bundle and production modules
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Run as non-root for security compliance
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
