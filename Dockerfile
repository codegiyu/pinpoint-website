# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Install dependencies (only production deps for speed)
RUN npm ci

# ---- Build Stage ----
FROM base AS builder
COPY . .
# Build Next.js app
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Copy only required output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./

# Next.js needs its standalone server
RUN npm install next

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "run", "start"]
