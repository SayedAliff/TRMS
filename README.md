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



## Backend API Design & Developer Guide

### Authentication

- **Taxpayer Login:**  
  - Endpoint: `POST /api/login/`
  - Payload: `{ userType: "Taxpayer", username: "<TIN>", password: "<password>" }`
  - Authenticates taxpayer using TIN and password.

- **Officer/Manager Login:**  
  - Endpoint: `POST /api/login/`
  - Payload: `{ userType: "JuniorOfficer", username: "<officer_id>", password: "<password>" }`
  - Authenticates officer/manager using Officer ID and password.

### Registration

- **Taxpayer Registration:**  
  - Endpoint: `POST /api/register/`
  - Payload: taxpayer details (see frontend form)
  - Generates TIN and creates taxpayer account.

### CRUD APIs

- **Taxpayer Profile:**  
  - `GET /api/taxpayer/profile/` - Get taxpayer profile by TIN (auth required)
  - `PUT /api/taxpayer/profile/` - Update taxpayer profile
  - `DELETE /api/taxpayer/profile/` - Delete taxpayer account

- **Officer Profile:**  
  - `GET /api/officer/profile/` - Get officer profile by Officer ID
  - `PUT /api/officer/profile/` - Update officer profile
  - `DELETE /api/officer/profile/` - Delete officer account

- **Senior Manager Profile:**  
  - `GET /api/manager/profile/` - Get manager profile by Officer ID
  - `PUT /api/manager/profile/` - Update manager profile

- **Tax Returns:**  
  - `GET /api/taxpayer/returns/` - List taxpayer's returns
  - `POST /api/taxpayer/returns/` - File new return
  - `GET /api/officer/taxdata/` - List all returns (officer view)
  - `PUT /api/officer/taxdata/<return_id>/` - Update/confirm/reject return

- **Payments:**  
  - `GET /api/taxpayer/payments/` - List taxpayer's payments
  - `POST /api/taxpayer/pay/` - Make payment
  - `GET /api/officer/payments/` - List all payments (officer view)
  - `PUT /api/officer/payments/<payment_id>/` - Confirm/reject payment

- **Support Tickets:**  
  - `GET /api/support/tickets/` - List tickets (taxpayer/officer)
  - `POST /api/support/tickets/` - Create ticket (taxpayer)
  - `PUT /api/support/tickets/<ticket_id>/` - Update ticket status (officer)
  - `DELETE /api/support/tickets/<ticket_id>/` - Delete ticket

- **Officer Management (Manager only):**  
  - `GET /api/manager/officers/` - List all officers
  - `POST /api/manager/officers/` - Add officer
  - `PUT /api/manager/officers/<officer_id>/` - Edit officer
  - `DELETE /api/manager/officers/<officer_id>/` - Delete officer

- **Taxpayer Management (Manager/Officer):**  
  - `GET /api/manager/taxpayers/` - List all taxpayers
  - `POST /api/manager/taxpayers/` - Add taxpayer
  - `PUT /api/manager/taxpayers/<tin>/` - Edit taxpayer
  - `DELETE /api/manager/taxpayers/<tin>/` - Delete taxpayer

- **Audit Logs (Manager only):**  
  - `GET /api/manager/auditlogs/` - List audit logs (profile changes, password changes, ticket replies, etc.)

### Notes for Backend Developer

- Use Django REST Framework for API endpoints.
- Use Oracle 10g for database (see settings above).
- Implement authentication and authorization for each role.
- Ensure proper validation and error handling.
- Use appropriate permissions for CRUD operations (see Oracle role/privilege SQL in prompt).
- All endpoints should return JSON responses.
- Frontend expects standard RESTful API patterns.

