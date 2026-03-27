# ---------- FRONTEND ----------
FROM node:20-alpine AS frontend-builder

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ---------- BACKEND ----------
FROM node:20-alpine AS backend-deps

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev


# ---------- BUILD ----------
FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=backend-deps /app/node_modules ./node_modules
COPY backend/ ./

COPY --from=frontend-builder /frontend/build ./build

EXPOSE 5004

CMD ["node", "server.js"]