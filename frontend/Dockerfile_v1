FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM alpine:3.19

WORKDIR /app

COPY --from=builder /app/build ./build

CMD ["sh", "-c", "ls -la /app/build && echo 'Build de React listo'"]
