# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24.21.0
ARG NGINX_VERSION=1.30.4

#########################################################################
# Stage 1: install locked dependencies with cached npm downloads
#########################################################################
FROM node:${NODE_VERSION}-bookworm-slim AS deps

WORKDIR /app

# Reuse the dependency layer until package manifests change.
COPY package.json package-lock.json ./

RUN --mount=type=cache,id=banao-fe-npm,target=/root/.npm,sharing=locked \
    npm ci --no-audit --no-fund

#########################################################################
# Stage 2: compile the Vite application into static assets
#########################################################################
FROM node:${NODE_VERSION}-bookworm-slim AS build

WORKDIR /app

# Reuse installed dependencies from the previous stage.
COPY --from=deps /app/node_modules ./node_modules

# Copy application files allowed by .dockerignore.
COPY . .

# public build-time values.
# ARG VITE_API_URL
# ARG VITE_CHATBOT_SCRIPT_URL

# Build in production mode with a 4 GB Node heap ceiling.
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096

# Unset empty optional values, build, and verify the entry page exists.
RUN if [ -z "$VITE_API_URL" ]; then unset VITE_API_URL; fi \
    && if [ -z "$VITE_CHATBOT_SCRIPT_URL" ]; then unset VITE_CHATBOT_SCRIPT_URL; fi \
    && npm run build \
    && test -s dist/index.html

#########################################################################
# Stage 3: serve only the compiled assets with unprivileged Nginx
#########################################################################
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}-alpine3.24 AS runner

# Temporarily use root to replace the image's default files.
USER root

RUN rm -f /etc/nginx/conf.d/default.conf \
    && rm -rf /usr/share/nginx/html/*

# Install the SPA server configuration and compiled assets.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/

# Run Nginx without root privileges.
USER nginx

EXPOSE 8080

# Request graceful Nginx shutdown when Docker stops the container.
STOPSIGNAL SIGQUIT

# Check that Nginx responds to the health endpoint.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -T 3 -O /dev/null http://127.0.0.1:8080/healthz || exit 1

# Start Nginx in the foreground through the inherited entrypoint.
CMD ["nginx", "-g", "daemon off;"]
