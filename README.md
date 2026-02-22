# ThanhTungAllInOne - Fullstack Room Booking Platform

A comprehensive, scalable microservices-based room booking and property management platform. Built with modern enterprise-grade technologies for maximum performance, security, and developer experience.

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router), React Query, TailwindCSS, Zustand, Shadcn UI
- **Backend Architecture:** API Gateway + Microservices (NestJS)
- **Services:** Auth/Users, Booking, Address/Location
- **Communication:** gRPC for internal microservice communication
- **Database ORM:** PostgreSQL + Prisma
- **Caching & Sessions:** Redis
- **Storage:** LocalStack (S3) for local AWS compatible object storage
- **Infrastructure:** Docker & Docker Compose for rapid local development

## ✨ Key Features

- **Authentication:** JWT-based auth (Access/Refresh tokens) with secure HTTP-only cookies and robust session management.
- **Microservices:** Clean separation of concerns with dedicated Address, Booking, and User microservices.
- **Roles:** Support for Guests (seeking rooms), Hosts (managing listings), and Admins (dashboard).
- **Booking Engine:** Stateful real-time date picking, booking status lifecycle (Pending, Completed, Cancelled).
- **Payment Simulation:** Fake MoMo payment integration flow for checkouts.
- **Reviews:** Dynamic user rating and comment system for completed stays.
- **Optimized UI:** Next.js Server Components mixed with Client-side caching via React Query for instant tab switching (SPA).

## 🛠️ Quick Start (Docker)

The easiest way to spin up the entire ecosystem (Databases, Redis, LocalStack, backend services, and frontend) is via Docker Compose:

```bash
# 1. Clone the repository and configure environments
# Make sure to copy .env variables mimicking the examples
# cp .env.example .env

# 2. Build and start all services using Docker Compose
docker compose -f docker-compose.dev.yml up -d --build
```

### Manual Development (Non-Docker)

If you prefer to run the Node.js apps manually on your host machine without Docker:

```bash
# Start required databases via docker-compose (Postgres, Redis, LocalStack):
docker compose up -d postgres redis localstack

# Start Microservices (each in a separate terminal window):
cd backend && npm run start:dev
cd booking && npm run start:dev
cd address && npm run start:dev
cd gateway && npm run start:dev

# Start Frontend:
cd frontend && npm run dev
```

## 🌐 Endpoints & Ports

- **Frontend App:** `http://localhost:3000`
- **API Gateway:** `http://localhost:8080`
- **User/Auth Microservice:** `4000`
- **Booking Microservice:** `4001`
- **Address Microservice:** `4002`
- **PostgreSQL:** `5432` / `5433`
- **Redis:** `6379`
- **LocalStack (S3):** `4566`
