# ---------------------------
# Stage 1: Install dependencies
# ---------------------------
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev 



# ---------------------------
# Stage 2: Build application
# ---------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm prune --omit=dev


# ---------------------------
# Stage 3: Secure runtime
# ---------------------------
FROM cgr.dev/chainguard/node:latest

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["index.js"]
