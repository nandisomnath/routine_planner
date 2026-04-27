# Routine Planner

A full-stack web application template to track syllabus completion, manage study routines, monitor academic progress, and keep notes.

## Features

- **Routine Planner**: Create a daily/weekly study schedule.
- **Progress Tracker**: Track completion percentage for subjects or topics.
- **Academic Events**: Add and view upcoming academic events.
- **Notes**: Add date-based notes.
- **Dashboard**: Overview of events, recent notes, and overall progress.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Data Storage**: In-memory (easily replaceable with a database)

## Project Structure

```
routine_planner/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── api/       # API request helpers
│   │   ├── components/# Reusable components
│   │   ├── pages/     # Page components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/           # Express backend
│   ├── routes/        # API route handlers
│   ├── server.js
│   └── package.json
├── README.md
└── TODO.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Quick Start (Single Command)

You can install all dependencies and run both servers using the root `package.json`:

```bash
# Install dependencies for root, frontend, and backend
npm run install:all

# Run both backend and frontend in development mode
npm run dev
```

The backend will run on `http://localhost:3000` and the frontend on `http://localhost:5173`.

### Manual Setup

If you prefer to start them separately:

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2. Start the Backend Server

```bash
npm start
```

The backend will run on `http://localhost:3000`.

#### 3. Install Frontend Dependencies

Open a new terminal and run:

```bash
cd frontend
npm install
```

#### 4. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and is configured to proxy API requests to the backend.

## API Endpoints

| Endpoint        | Method | Description          |
|-----------------|--------|----------------------|
| `/api/routines` | GET    | List all routines    |
| `/api/routines` | POST   | Create a new routine |
| `/api/progress` | GET    | List all progress    |
| `/api/progress` | POST   | Add progress entry   |
| `/api/events`   | GET    | List all events      |
| `/api/events`   | POST   | Create a new event   |
| `/api/notes`    | GET    | List all notes       |
| `/api/notes`    | POST   | Create a new note    |

## Next Steps

- Replace in-memory storage with a persistent database (e.g., MongoDB, PostgreSQL).
- Add user authentication.
- Enhance the routine planner with automatic schedule generation.
- Add edit/delete functionality for routines, events, and notes.

