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
