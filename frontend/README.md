# The Flow

The Flow is an AI-powered career growth workspace that helps users plan learning, manage daily execution, improve interview readiness from one connected dashboard with the roadmap feature.

The frontend is built with React and Vite, and connects to a deployed backend(node.js) API for authentication, tasks, study planning, interview analysis, and career roadmap data.

## What the App Does

The product combines productivity and career-prep workflows in a single system:

- Smart dashboard with quick actions, profile strength, and roadmap preview
- Task management for creating, prioritizing, and tracking progress
- Study planner to generate and view structured study plans
- Career hub for resume matching and interview report workflows
- Roadmap viewer for stage-wise career growth and skill milestones

The unauthenticated experience introduces users to these modules and routes them to sign up or log in.

## Key User Flows

1. Create an account or log in
2. Set a target role and explore roadmap direction
3. Convert goals into tasks and study plans
4. Use interview reports to identify gaps and improve readiness
5. Track progress over time from the home dashboard

## Tech Stack

### Frontend
- React 19
- Vite 8
- React Router DOM
- Axios
- Tailwind CSS 4
- React Icons

### Backend
- Mongodb
- Node.js
- Express.js
- JWT based authentication
- Gemini API Key
- ZOD for structured output

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install Frontend

```bash
npm install
```

### Run Frontend in Development

```bash
npm run dev
```

This starts the Vite dev server (typically at `http://localhost:5173`).

### Start Backend Server

Open a second terminal, move to the backend folder, install dependencies, and start the server:

```bash
cd ../backend
npm install
npm start
```

The backend currently exposes a `start` script (`node server.js`).

### Run Frontend + Backend Together (Local)

1. Terminal 1 (backend):

```bash
cd backend
npm install
npm start
```

2. Terminal 2 (frontend):

```bash
cd frontend
npm install
npm run dev
```

If you want frontend requests to hit your local backend instead of the deployed Render API, update API links in `src/links.js`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## API Integration Notes

- API endpoints are currently centralized in `src/links.js`.
- The current configuration points to a hosted backend (`the-flow-2qgb.onrender.com`).
- Auth requests use credentials (`withCredentials: true`) in the auth context.

If you run your own backend, update the endpoint constants in `src/links.js` to match your server URLs.

## Authentication Behavior

- Global auth state is managed via `AuthProvider` in `src/auth/Authcontext.jsx`.
- On app load, the frontend calls the `get-me` endpoint to restore user session state.
- Protected pages such as home depend on available user context.

## Deployment

- Frontend is compatible with Vercel/static hosting providers.
- Ensure backend CORS and cookie settings allow credentialed cross-site requests in production.

## Vision

The Flow is designed to reduce overwhelm in career preparation by connecting roadmap, planning, and execution into one continuous loop.
