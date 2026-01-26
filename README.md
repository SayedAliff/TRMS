# TRMS-backend (FastAPI + MongoDB)

🚩 Tax Record Management System backend — RESTful API, FastAPI + MongoDB  
Supports multiple roles (taxpayer, junior officer, senior manager), modern authentication, 100% compatible with TRMS frontend.

---

## ✨ Features

- Taxpayer, Officer, Manager (Commissioner/Boss) login — rank-based dashboard resolve
- Taxpayer registration, taxpayer CRUD
- Officer CRUD, promote/demote officer rank (affects dashboard type)
- Tax return create/list/update/delete
- Payment create/list/update/delete
- Support ticket create/list/update/delete (for taxpayer and officer)
- All endpoints: JSON, snake_case, compatible with modern SPAs
- Fully asynchronous Python, production-ready style

---

## 🚦 Quick Start (Local Dev)

### 1. Requirements

- Python 3.8+  
- MongoDB (local or Atlas cloud; tested with v6/7)
- Node.js only for frontend, not needed for backend

### 2. Install Dependencies

```bash
cd TRMS-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. (First time) MongoDB Dummy Data

```bash
mongosh
use trms
# Insert zones/users/officers/taxpayers/returns/payments/tickets, e.g.:
# db.taxpayer.insertOne({ tin: 5000, first_name: "Abul", ... })
```
— পরামর্শ: backend/models.py, বা উপরের গাইডের structure অনুযায়ী field রাখো।

### 4. Run Server

```bash
cd TRMS-backend
uvicorn app.main:app --reload
# Open: http://localhost:8000/docs (Swagger)
```

### 5. Test API (with Postman/Fronend)

- Login:  
  - Taxpayer: `POST /api/users/login/ { "tin": 5001, "password": "xxxx" }`
  - Officer/Manager: `POST /api/users/login/ { "officer_id": 1001, "password": "xxxx" }`
- Officer rank: (Commissioner/Manager/Boss → SeniorManagerDashboard, else JuniorOfficerDashboard)

---

## 🛠️ Main API Endpoints

| Entity           | List         | Get           | Create         | Update        | Delete        | Extras                               |
|------------------|--------------|---------------|----------------|---------------|---------------|--------------------------------------|
| Taxpayer         | GET `/api/taxpayers/`    | GET `/api/taxpayers/{tin}`  | POST `/api/taxpayers/`  | PUT `/api/taxpayers/{tin}`   | DELETE `/api/taxpayers/{tin}`   |                                      |
| Officer          | GET `/api/officers/`     | GET `/api/officers/{id}`    | POST `/api/officers/`   | PUT `/api/officers/{id}`      | DELETE `/api/officers/{id}`      | `/promote`, `/demote`                |
| Tax return       | GET `/api/returns/`      | GET `/api/returns/{id}`     | POST `/api/returns/`    | PUT `/api/returns/{id}`        | DELETE `/api/returns/{id}`        |                                      |
| Payment          | GET `/api/payments/`     | GET `/api/payments/{id}`    | POST `/api/payments/`   | PUT `/api/payments/{id}`       | DELETE `/api/payments/{id}`       |                                      |
| Support Ticket   | GET `/api/tickets/`      | GET `/api/tickets/{id}`     | POST `/api/tickets/`    | PUT `/api/tickets/{id}`        | DELETE `/api/tickets/{id}`        |                                      |
| User Login       |                  |               | POST `/api/users/login/`  |               |               | Provides user_type (taxpayer/officer/manager) for dashboard |

---

## 🧩 Code Structure

```
TRMS-backend/
├── app/
│   ├── db.py
│   ├── main.py
│   ├── models.py
│   └── routes/
│        ├── user.py
│        ├── taxpayer.py
│        ├── officer.py
│        ├── returns.py
│        ├── payments.py
│        └── tickets.py
├── requirements.txt
├── README.md
└── ...
```

---

## 🧑‍💻 Conventions

- All fields in snake_case
- All endpoints follow REST-style naming
- All responses: JSON only
- Passwords stored plaintext (for demo; use hash in production)
- Promote/demote endpoints for officer management

---

## 🔐 Role-based Dashboard Switch

- Officer login returns `user_type: "manager"` (if rank in [Commissioner, Manager, Boss]), otherwise `user_type: "officer"`
- Login/deserialization is **frontend-compatible**: `/api/users/login/` response always gives the correct dashboard
- Taxpayer login returns `user_type: "taxpayer"`

---

## 🚧 Improvements (for Production)

- Secure passwords (hash)
- JWT authentication for all endpoints (currently token is dummy)
- Add validation, pagination, filter to endpoints
- Add proper error responses

---

## 👥 Credits

- Backend/Architecture: [SayedAliff](https://github.com/SayedAliff)
- Frontend (React): [SayedAliff](https://github.com/SayedAliff)

---

## License

Educational and learning use only.