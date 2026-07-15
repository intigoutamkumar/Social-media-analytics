# Social Pulse - Social Media Analytics Platform

Social Pulse is a full-stack social media analytics dashboard built with React, Vite, Django REST Framework, JWT authentication, and Recharts. It helps users explore demo multi-platform metrics for Instagram, Facebook, YouTube, and X through a polished portfolio-ready interface.

**Live demo:** Deployment URL pending. Configure the frontend and backend hosts with the production variables below before publishing this link.

![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)
![Django](https://img.shields.io/badge/Django-5.x-092e20?logo=django)
![Vite](https://img.shields.io/badge/Vite-8.x-646cff?logo=vite)
![DRF](https://img.shields.io/badge/DRF-3.x-red?logo=django)

![Social Pulse dashboard preview](frontend/src/assets/hero.png)

## Highlights

- Multi-platform analytics dashboard for Instagram, Facebook, YouTube, and X
- JWT authentication with register, login, profile, and protected routes
- Responsive React UI with dark/light theme support
- Recharts-based visual analytics and growth trends
- Django REST API with authenticated user-scoped data
- Server-side ownership protection for social account records
- Deterministic demo data so reviewers can explore without API keys
- Frontend linting, unit tests, production build, and backend tests
- GitHub Actions CI for frontend and backend quality gates

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7, Recharts, React Icons |
| Backend | Django 5, Django REST Framework, SimpleJWT, Gunicorn, WhiteNoise |
| Database | SQLite for local development, PostgreSQL for production |
| Styling | CSS custom properties, responsive layouts, theme tokens |
| Testing | Vitest, React Testing Library, Django TestCase |
| CI | GitHub Actions |

## Project Structure

```text
Social-media-analytics/
+-- backend/
|   +-- accounts/          # Authentication and user profile API
|   +-- analytics_app/     # Social accounts and dashboard analytics API
|   +-- core/              # Django settings, ASGI, WSGI, root URLs
|   +-- tests/             # Backend test coverage
|   +-- requirements.txt
+-- frontend/
|   +-- src/
|   |   +-- components/    # Reusable UI components
|   |   +-- context/       # Theme and notification providers
|   |   +-- layouts/       # Authenticated app shell
|   |   +-- pages/         # Route-level screens
|   |   +-- services/      # Axios API client
|   |   +-- utils/         # Auth helpers, validation, demo data
|   +-- package.json
|   +-- vite.config.ts
+-- .github/workflows/ci.yml
+-- DEPLOYMENT.md
+-- README.md
```

## Getting Started

### Prerequisites

- Node.js 22 or newer
- Python 3.10 or newer
- pip and venv

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

Backend API: `http://127.0.0.1:8000/api/`

### Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend app: `http://localhost:5173`

## Environment Variables

### Backend: `backend/.env`

| Variable | Purpose | Local default |
| --- | --- | --- |
| `DJANGO_SECRET_KEY` | Django secret key | `django-insecure-social-pulse-dev-only-key-please-change-in-production` |
| `DJANGO_DEBUG` | Enables development mode | `True` |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated backend hosts | `localhost,127.0.0.1` |
| `DJANGO_CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `http://localhost:5173,http://localhost:5174` |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Trusted HTTPS frontend origins for production | empty |
| `DATABASE_URL` | Production PostgreSQL connection URL | empty, falls back to SQLite |
| `SECURE_SSL_REDIRECT` | Redirect HTTP to HTTPS when debug is false | `True` |

### Frontend: `frontend/.env`

| Variable | Purpose | Local default |
| --- | --- | --- |
| `VITE_API_URL` | Backend API base URL | `http://127.0.0.1:8000/api/` |

## Quality Commands

```bash
# Frontend
cd frontend
npm run lint
npm test
npm run build

# Backend
cd backend
python manage.py check
python manage.py test
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production environment variables and hosting guidance.

Recommended portfolio deployment:

- Frontend: Vercel or Netlify
- Backend: Render, Railway, Fly.io, or another Python host
- Database: SQLite for local development, free PostgreSQL for production
- Backend start command: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`
- Frontend build variable: `VITE_API_URL=https://your-backend-domain.com/api/`

## Portfolio Notes

This project intentionally uses generated demo analytics instead of live social platform APIs. That keeps the app easy for recruiters and reviewers to run without OAuth setup, paid API access, or external accounts.

The dashboard includes a visible demo-data banner so reviewers know the analytics are generated and not live social account metrics.

Reviewers can register with any valid email-style address and a strong password. On first login, the backend creates demo social accounts for that user so the dashboard has data immediately.

The project demonstrates practical full-stack skills: authentication, API design, protected routing, reusable UI components, charting, responsive layout, environment configuration, testing, CI, and deployment documentation.

## Roadmap

- Replace demo data with real OAuth-based social integrations
- Add Docker Compose for one-command local setup
- Add Playwright end-to-end tests
- Add role-based access and team workspaces
- Add pagination and filtering for larger analytics datasets

## License

MIT
