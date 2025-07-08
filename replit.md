# ContentFlow AI - Waitlist Application

## Overview

This is a modern full-stack web application for collecting waitlist signups for ContentFlow AI, a content repurposing tool. The application features a landing page with an integrated waitlist form, built with React on the frontend and Express.js on the backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Validation**: Zod for runtime type checking
- **Session Management**: Express sessions with PostgreSQL store

### Key Design Decisions

1. **Monorepo Structure**: The application uses a monorepo with separate client and server directories, plus a shared directory for common types and schemas.

2. **Database Choice**: PostgreSQL was chosen for data consistency and ACID compliance, important for waitlist management. Drizzle ORM provides type-safe database operations.

3. **UI Component System**: Shadcn/ui provides a consistent, accessible component library that can be customized while maintaining design system coherence.

4. **Memory Storage Fallback**: The application includes an in-memory storage implementation as a fallback, allowing development without database setup.

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: For potential user management (id, username, password)
- **Waitlist Signups Table**: Core functionality (id, email, name, creatorType, createdAt)
- **Validation Schemas**: Zod schemas for runtime validation

### API Routes (`server/routes.ts`)
- `POST /api/waitlist`: Create new waitlist signup with validation
- `GET /api/waitlist/count`: Retrieve current waitlist count

### Frontend Pages
- **Landing Page**: Hero section, features, pricing, testimonials, and waitlist form
- **Thank You Page**: Confirmation page after successful signup
- **404 Page**: Error handling for unknown routes

### Core Components
- **WaitlistForm**: Main signup form with validation and error handling
- **UI Components**: Complete shadcn/ui component library implementation

## Data Flow

1. **User Interaction**: User fills out waitlist form on landing page
2. **Client Validation**: React Hook Form + Zod validates input client-side
3. **API Request**: Form submission sends POST request to `/api/waitlist`
4. **Server Validation**: Backend validates data using shared Zod schemas
5. **Database Operation**: Drizzle ORM creates new waitlist entry
6. **Response Handling**: Success redirects to thank you page, errors show toast notifications
7. **State Update**: TanStack Query invalidates and refetches waitlist count

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: React Hook Form validation resolvers
- **zod**: Runtime schema validation
- **wouter**: Lightweight routing library

### UI Dependencies
- **@radix-ui/***: Accessible primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle migrations applied via `db:push` command

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment designation (development/production)

### Production Deployment
- Built for Node.js runtime with ES modules
- Static assets served from Express server
- Database hosted on Neon (serverless PostgreSQL)
- Optimized for Replit deployment environment

## Changelog
- July 08, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.