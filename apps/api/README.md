# DailyOS API

Express.js backend with TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

## API Routes

### Health Check
- `GET /health` - Returns `{ status: "OK" }`

## Project Structure

- `src/index.ts` - Express server setup
- `src/routes/` - API route definitions
- `src/controllers/` - Request handlers
- `src/services/` - Business logic
- `src/utils/` - Utility functions

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint
