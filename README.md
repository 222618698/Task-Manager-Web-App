# Task Manager Web App

A full-stack task management application built with **Angular** (frontend) and **Flask** (backend REST API).

---

## Project Structure

```
task-manager/
├── app.py                        # Flask REST API
├── requirements.txt              # Python dependencies
├── README.md
└── frontend/                     # Angular project
    ├── src/
    │   ├── app/
    │   │   ├── app.module.ts
    │   │   ├── app.component.ts / .html
    │   │   ├── models/task.model.ts
    │   │   ├── services/task.service.ts
    │   │   └── components/
    │   │       ├── task-list/
    │   │       ├── task-form/
    │   │       └── task-stats/
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## Features

- **Create** tasks with title, description, and priority (low / medium / high)
- **View** all tasks with filtering (All, Pending, Completed)
- **Toggle** task status between pending and completed
- **Delete** tasks
- **Dashboard** with live statistics and completion progress bar
- Auto-refreshing UI (polls every 3 seconds)

---

## API Endpoints

| Method | Endpoint               | Description           |
|--------|------------------------|-----------------------|
| GET    | `/api/tasks`           | List all tasks        |
| GET    | `/api/tasks?status=`   | Filter by status      |
| GET    | `/api/tasks/<id>`      | Get a single task     |
| POST   | `/api/tasks`           | Create a new task     |
| PUT    | `/api/tasks/<id>`      | Update a task         |
| DELETE | `/api/tasks/<id>`      | Delete a task         |
| GET    | `/api/tasks/stats`     | Get task statistics   |

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+ & npm

### Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server (runs on http://localhost:5000)
python app.py
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the Angular dev server (runs on http://localhost:4200)
npm start
```

Open **http://localhost:4200** in your browser. The Angular app communicates with the Flask API at `http://localhost:5000`.

---

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | Angular 17        |
| Backend  | Flask 3 (Python)  |
| Styling  | Custom CSS        |
| Icons    | Font Awesome 6    |