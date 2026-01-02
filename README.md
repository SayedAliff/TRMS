# TRMS - Tax Record Management System

A modern web application for managing taxpayer records, returns, payments, and support, built with React (Vite), Django REST API, and Oracle 10g.

## Features

- Taxpayer, Officer, and Senior Manager portals
- Registration, login, and profile management
- File tax returns, pay taxes, view payment history
- Support ticket system
- Officer and manager dashboards
- Oracle 10g database integration

## Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS
- **Backend:** Django REST Framework
- **Database:** Oracle 10g

## Setup

### 1. Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

- The frontend runs on [http://localhost:5173](http://localhost:5173).
- API requests to `/api/...` are proxied to the backend (`http://localhost:8000`).

### 2. Backend (Django)

- Create a Django project and app.
- Install dependencies:
  ```bash
  pip install django djangorestframework cx_Oracle
  ```
- Configure `settings.py` for Oracle 10g:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.oracle',
          'NAME': 'your_oracle_sid',
          'USER': 'your_oracle_user',
          'PASSWORD': 'your_oracle_password',
          'HOST': 'localhost',
          'PORT': '1521',
      }
  }
  ```
- Create models for users, taxpayers, officers, returns, payments, tickets, etc.
- Build REST API endpoints for login, registration, dashboard data, etc.
- Run the backend:
  ```bash
  python manage.py runserver 8000
  ```

### 3. Connecting Frontend & Backend

- Frontend fetches data from `/api/...` endpoints.
- Example API call in React:
  ```tsx
  fetch('/api/login/', { method: 'POST', body: JSON.stringify({ ... }) })
  ```
- Ensure Django CORS is configured if accessing from a different origin.

### 4. Oracle 10g

- Make sure Oracle 10g is running and accessible.
- Use `cx_Oracle` for Python/Django database connectivity.

## Development Notes

- All frontend API calls are marked with `TODO` for backend integration.
- Replace mock logic with real API calls as backend endpoints are implemented.
- Use Vite proxy for seamless local development.

## Scripts

- `npm run dev` - Start frontend dev server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT

