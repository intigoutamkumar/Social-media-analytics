#!/bin/bash
# Local verification script for Social Pulse.

set -e

echo "Building Social Pulse..."

echo "Building frontend..."
cd frontend
npm ci
npm run lint
npm test
npm run build
echo "Frontend checks completed."
echo ""

echo "Checking backend..."
cd ../backend

if [ ! -d "venv" ]; then
  python -m venv venv
fi

if [ -f "venv/Scripts/activate" ]; then
  source venv/Scripts/activate
else
  source venv/bin/activate
fi

pip install -r requirements.txt
python manage.py check
python manage.py test
python manage.py collectstatic --noinput

echo "Backend checks completed."
echo ""
echo "Build complete."
echo ""
echo "Local run commands:"
echo "  Backend:  cd backend && python manage.py runserver"
echo "  Frontend: cd frontend && npm run dev"
