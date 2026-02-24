# Copilot Instructions

This is a full-stack portfolio builder application with:

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js, Prisma ORM
- **Database**: SQLite (configurable)

## Quick Start

1. Install all dependencies: `npm run install-all`
2. Set up database: `npm run prisma:migrate -w backend`
3. Start development: `npm run dev`

## Development

- Frontend runs on `http://localhost:3001`
- Backend API runs on `http://localhost:5001`
- Frontend proxy automatically forwards `/api/*` requests to the backend

## File Structure

- `frontend/` - React application with Tailwind CSS
- `backend/` - Express API with Prisma ORM
- `backend/prisma/schema.prisma` - Database schema
- `.env` files - Environment configuration

## Running Commands

Use the `-w` flag for workspace commands:

- `npm run dev -w frontend` - Frontend only
- `npm run dev -w backend` - Backend only
- `npm run prisma:migrate -w backend` - Database migrations
- `npm run prisma:studio -w backend` - Prisma Studio

For more information, see README.md in the project root.
