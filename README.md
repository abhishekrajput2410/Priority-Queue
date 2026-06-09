# Request Prioritization Queue System

A production-grade distributed request processing platform with priority routing, SLA monitoring, aging escalation, AI-prioritized workloads, real-time monitoring, and enterprise UI.

## Architecture

- Frontend: React + Vite + TailwindCSS + React Query + Socket.IO
- Backend: Node.js + Express + MongoDB + Redis + BullMQ + Prometheus + Socket.IO
- AI Service: Python + Flask + Scikit-Learn
- DevOps: Docker Compose + Nginx + PM2 + GitHub Actions

## Folder Structure

- `backend/` — API gateway, queue integration, worker cluster, real-time sockets, metrics, authentication
- `frontend/` — admin dashboard, charts, tables, role-based UI
- `ai-service/` — ML service for predicted request priority
- `docker-compose.yml` — orchestrates backend, frontend, Redis, MongoDB, AI service
- `.github/workflows/ci-cd.yml` — CI pipeline for install, lint, test, build

## Getting Started

1. Copy `.env.example` to `.env` and adjust values.
2. `docker-compose up --build`
3. Backend: `http://localhost:5000`
4. Frontend: `http://localhost:3000`
5. AI service: `http://localhost:8000`

Default admin credentials are seeded automatically on first backend startup:
- Email: `admin@priorityqueue.local`
- Password: `AdminPass123!`

## Local Development

```bash
cd backend
npm install
npm run dev

# If you start the backend for the first time, it will auto-create a default admin user.
# Use the credentials above to sign in.

cd ../frontend
npm install
npm run dev

cd ../ai-service
pip install -r requirements.txt
python train.py
python app.py
```

## Features

- JWT auth, role-based access control (Admin / Operator / Viewer)
- Request queueing with BullMQ, priority, retries, DLQ
- SLA breach detection, aging escalation, AI predicted priority
- Real-time dashboard with Socket.IO and live analytics
- Prometheus-compatible metrics endpoint
- Containerized deployment with Docker Compose
- Push-button CI/CD via GitHub Actions
