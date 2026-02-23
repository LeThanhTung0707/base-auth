FROM node:20-alpine AS builder

WORKDIR /app

COPY notification/package*.json ./
COPY notification/prisma ./prisma/

RUN npm install

COPY notification/ .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS dev

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run start:dev"]
