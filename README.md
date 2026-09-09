# DevTrack

A full-stack task tracker built to demonstrate end-to-end software engineering — from database design to CI/CD-ready deployment.

**Live app:** https://devtrack-smoky.vercel.app/
**API:** https://devtrack-x2xl.onrender.com


## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS — deployed on Vercel
- **Backend:** Node.js + Express — deployed on Render
- **Database:** PostgreSQL — hosted on Supabase
- **CI/CD:** GitHub Actions (lint checks on every push)

## Features

- Create, read, update, and delete tasks
- Task status workflow: To Do → In Progress → Done
- Priority levels (low/medium/high)
- Fully responsive UI with Tailwind CSS
  
## Architecture

```
React (Vercel) → Express API (Render) → PostgreSQL (Supabase)
```

## Local Development

### Backend
```bash
cd server
npm install
# Add DATABASE_URL to a .env file
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## What This Project Demonstrates

- RESTful API design with Express
- Relational database schema design and query writing
- Frontend state management and API integration in React
- Cloud deployment across multiple free-tier providers
- CI/CD pipeline configuration with GitHub Actions