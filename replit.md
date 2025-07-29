# Replit.md

## Overview

This is a full-stack palm reading application that analyzes uploaded palm images and provides mystical readings about love, money, and health. The app features a React frontend with modern UI components and an Express.js backend that handles image uploads and mock palm analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage currently)
- **Styling**: Tailwind CSS with shadcn/ui components
- **File Uploads**: Multer for handling palm image uploads

## Key Components

### Frontend Architecture
- **React SPA**: Single-page application with wouter for routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom mystical theme variables
- **File Upload**: Custom FileUpload component with drag-and-drop support

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: Abstract storage interface with in-memory implementation
- **File Handling**: Multer middleware for image uploads with validation
- **Mock Analysis**: Simulated palm reading analysis with randomized results

### Database Schema
Two main entities defined in Drizzle schema:
- **Users**: Basic user management (id, username, password)
- **Palm Readings**: Stores analysis results with scores, readings, features, and advice

## Data Flow

1. **Image Upload**: User uploads palm image through FileUpload component
2. **API Processing**: Express server receives image via multer middleware
3. **Mock Analysis**: Server generates random palm reading results
4. **Data Storage**: Results stored in memory (configured for PostgreSQL)
5. **Response Display**: Frontend shows mystical analysis with scores and advice

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, wouter for routing
- **UI Framework**: Radix UI primitives, shadcn/ui components
- **State Management**: TanStack Query for API calls
- **Styling**: Tailwind CSS, clsx for conditional classes
- **Forms**: React Hook Form with Zod validation

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, PostgreSQL driver (@neondatabase/serverless)
- **File Upload**: Multer for multipart form handling
- **Development**: tsx for TypeScript execution, Vite plugins

### Build Tools
- **Bundling**: Vite for frontend, esbuild for backend
- **Development**: Hot reload with Vite dev server
- **TypeScript**: Shared configuration across client/server/shared

## Deployment Strategy

### Development Setup
- Single command (`npm run dev`) starts both frontend and backend
- Vite dev server proxies API requests to Express backend
- Hot reload enabled for both frontend and backend code

### Production Build
- Frontend builds to `dist/public` directory
- Backend bundles to `dist/index.js` with esbuild
- Static files served by Express in production
- Environment variables required: `DATABASE_URL`, `NODE_ENV`

### Database Configuration
- Drizzle configured for PostgreSQL with migrations
- Current implementation uses in-memory storage for development
- Production requires PostgreSQL database provisioning
- Schema migrations handled via `drizzle-kit push`

### File Storage
- Uploads stored locally in `uploads/` directory
- Files served statically via Express middleware
- Production deployment needs persistent file storage solution