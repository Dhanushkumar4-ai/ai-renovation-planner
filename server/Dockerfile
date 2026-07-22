# ── Renov-AI Express Backend ──────────────────────────────────────────────────
# Multi-stage: install → prune devDeps → run
FROM node:20-alpine AS base

WORKDIR /app

# Copy dependency manifests first (layer-cache friendly)
COPY package.json package-lock.json* ./

# Install ALL deps (including dev) for any potential build step
RUN npm ci --omit=dev

# Copy source
COPY . .

# Expose the port Express listens on
EXPOSE 3001

# Health check so Render marks the container healthy
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

# Start the server
CMD ["node", "index.js"]
