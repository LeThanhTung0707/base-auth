FROM node:20-alpine AS dev
WORKDIR /app
COPY booking/package*.json ./
COPY booking/prisma ./prisma/
COPY proto ./proto
RUN npm install
COPY booking/ .
CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY booking/package*.json ./
COPY booking/prisma ./prisma/
COPY proto ./proto

RUN npm install

COPY booking/ .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/proto ./proto

EXPOSE 4001

CMD [ "node", "dist/main.js" ]
