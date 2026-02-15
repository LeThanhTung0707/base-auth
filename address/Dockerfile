FROM node:20-alpine AS dev
WORKDIR /app
COPY address/package*.json ./
COPY address/prisma ./prisma/
COPY proto /proto
RUN npm install
COPY address/ .
CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY address/package*.json ./
COPY address/prisma ./prisma/
COPY proto /proto

RUN npm install

COPY address/ .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /proto /proto

EXPOSE 4002

CMD [ "node", "dist/src/main.js" ]
