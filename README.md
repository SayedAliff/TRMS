# TRMS - Tax Record Management System

Multi-role Tax Record Management System with:
- **Frontend**: React (TypeScript) (in `/TRMS-frontend`)
- **Backend**: FastAPI (Python) + MongoDB (in `/TRMS-backend`)
- Supports Taxpayer, Junior Officer, Senior Manager dashboards (auto-detect by login & rank)!

---

## 📦 Monorepo Structure

```
TRMS/
├── TRMS-frontend/    # React TypeScript frontend (Vite)
├── TRMS-backend/     # FastAPI + MongoDB backend
└── README.md
```

---

## 🚦 Quick Start

### 1. Backend Setup (FastAPI + MongoDB)
```bash
cd TRMS-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Make sure MongoDB is running (local or Atlas)
uvicorn app.main:app --reload
# API server at http://localhost:8000
# API docs at http://localhost:8000/docs
```
- **Dummy data**: Insert sample officers/taxpayers/returns/payments/tickets in MongoDB for demo.

### 2. Frontend Setup (React)
```bash
cd TRMS-frontend
npm install
npm run dev
# App will run at http://localhost:5173
```
- API requests proxied to backend at `/api/*`.

---

## 🔑 Authentication (How to Login)

**Login endpoint:** `POST /api/users/login/`

- Taxpayer:
  ```json
  { "tin": 5001, "password": "your_password" }
  ```
- Officer/Manager:
  ```json
  { "officer_id": 1001, "password": "your_password" }
  ```
  - **Dashboard auto-detected:** if rank = "Manager"/"Commissioner", you see SeniorManagerDashboard; else, JuniorOfficerDashboard.

**Registration:** `POST /api/users/register/` (Taxpayer only)

---

## 🛠️ API Endpoints (main ones)

| Entity     | Endpoint Prefix   | Methods (REST)           |
|------------|-------------------|--------------------------|
| Taxpayer   | `/api/taxpayers/` | GET, POST, PUT, DELETE   |
| Officer    | `/api/officers/`  | GET, POST, PUT, DELETE, promote, demote |
| Returns    | `/api/returns/`   | GET, POST, PUT, DELETE   |
| Payments   | `/api/payments/`  | GET, POST, PUT, DELETE   |
| Tickets    | `/api/tickets/`   | GET, POST, PUT, DELETE   |
| Auth/Login | `/api/users/login/` | POST                   |
| Registration | `/api/users/register/` | POST               |

_All requests/fields are snake_case and match frontend models._

---

## 📑 Integration Checklist

- [x] All endpoints/field names are **snake_case** and match frontend model and React interfaces
- [x] **user_type** is returned in login response for frontend dashboard switching
- [x] Officer rank determines dashboard (manager/officer)
- [x] All CRUD for Taxpayer, Officer, Payment, Return, Ticket is working and RESTful
- [x] No Django/DRF/legacy reference remains

---

## 👥 Credits

- Frontend/Backend: [SayedAliff](https://github.com/SayedAliff)

---

## License

This project is for academic/educational use only.