# Deployment Guide

Social Pulse is split into two deployable apps:

- `frontend/`: React + Vite static app
- `backend/`: Django REST API

## Recommended Portfolio Deployment

For a clean portfolio setup:

1. Deploy the backend to Render, Railway, Fly.io, or another Python host.
2. Attach a free PostgreSQL database to the backend and expose its `DATABASE_URL`.
3. Deploy the frontend to Vercel or Netlify.
4. Set `VITE_API_URL` in the frontend host before the production build runs.
5. Set backend CORS and host variables to allow the deployed frontend URL.

## Backend Start Command

The root `Procfile` is ready for platforms that detect it:

```Procfile
web: gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
```

## Backend Environment

Required for production:

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-secret
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=your-backend-domain.com
DJANGO_CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.com
DATABASE_URL=postgres://user:password@host:5432/database
SECURE_SSL_REDIRECT=True
```

Local development defaults are intentionally simple and use SQLite. Production should use PostgreSQL through `DATABASE_URL`; Render and Railway both provide this automatically when you attach a managed Postgres instance.

Static files are served with WhiteNoise when `DEBUG=False`; run `python manage.py collectstatic --noinput` during the backend build.

## Frontend Environment

```env
VITE_API_URL=https://your-backend-domain.com/api/
```

Set this on the frontend host, not only in a local `.env`, because Vite bakes `VITE_*` variables into the built static files.

## Local Verification Before Deploy

Run these from the project root:

```bash
cd frontend
npm ci
npm run lint
npm test
npm run build

cd ../backend
pip install -r requirements.txt
python manage.py check
python manage.py test
```

## GitHub Checklist

- Do not commit `.env`, databases, `node_modules`, `dist`, cache folders, or Lighthouse temp files.
- Keep `.env.example` files committed.
- Confirm GitHub Actions CI passes after pushing.
- Add screenshots or a demo video to the README for best recruiter impact.
