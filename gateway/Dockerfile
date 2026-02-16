FROM node:20-alpine AS dev
WORKDIR /app
COPY gateway/package*.json ./
RUN npm install
COPY gateway/ .
CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS builder
WORKDIR /app
COPY gateway/package*.json ./
RUN npm install
COPY gateway/ .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/main.js"]
