# TRMS - Tax Record Management System (Frontend)

This is the React (TypeScript) frontend for the Tax Record Management System, designed for seamless integration with the Django backend ([wasikahmed/tax-record-management-system-backend](https://github.com/wasikahmed/tax-record-management-system-backend)).

---

## 🚦 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/SayedAliff/TRMS.git
cd TRMS
npm install
```

_Note: Requires Node.js (v18+) and npm/yarn_

---

### 2. Backend Setup (Run in a separate terminal)

Please make sure the backend (Django) is running locally on [http://localhost:8000](http://localhost:8000):

- Clone & install Python dependencies  
- Set up Oracle/SQLite DB as per backend readme  
- Migrate DB and create admin user:  
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  python manage.py createsuperuser
  python manage.py runserver
  ```

Backend repo: [wasikahmed/tax-record-management-system-backend](https://github.com/wasikahmed/tax-record-management-system-backend)

---

### 3. Start the Frontend Dev Server

```bash
npm run dev
```

The app will open at [http://localhost:5173](http://localhost:5173/)  
All API requests are seamlessly proxied to the backend at `/api/*` via Vite's config.

---

## 🔑 Authentication

- Login via `/api/users/auth/login/`
  - Taxpayer: `{ "tin": <TIN>, "password": "..." }`
  - Officer: `{ "officer_id": <ID>, "password": "..." }`
- After login, JWT access token is stored and attached to all API requests as an `Authorization: Bearer ...` header.
- Logout clears all sessions/tokens.

---

## 🛠️ API & Models Integration

- All frontend API endpoints, field & payload naming (`snake_case`), and data models are 100% matched to the backend serializers and routes:
    - `/api/users/taxpayers/`
    - `/api/users/officers/`
    - `/api/taxes/returns/`
    - `/api/taxes/payments/`
    - `/api/support/tickets/`
- **Only backend-provided data is shown; no mock data in the UI.**
- All errors handled per DRF standard: `{ "detail": "..." }`
- All date fields exchanged and displayed as `YYYY-MM-DD`.

---

## 📦 Key Files & Structure

```
├── components/          # UI components (dashboard, login, registration)
├── lib/api.ts           # All backend API functions, models and fetch helpers
├── lib/utils.ts         # Utility functions (date, format)
├── styles/              # TailwindCSS + global styles
├── App.tsx              # Main app, user context
├── vite.config.ts       # API / proxy config
└── ...
```

---

## 📑 Developer Checklist for Backend API Integration

- [x] All data interfaces and API payloads in `snake_case`, strictly matching backend serializers and models.
- [x] API endpoint paths match backend routing (`/api/users/..`, `/api/taxes/..`, `/api/support/..`)
- [x] JWT token used and sent in all requests after login.
- [x] No camelCase, mock data or unused/legacy field left anywhere.
- [x] All frontend data is fetched live from backend.
- [x] Error handling mimics DRF (`{ detail: ... }`).
- [x] Code is ready for direct handover—Wasik just needs to run backend and everything will work!

---

## 🙋 For Troubleshooting / Developers

- For any field/endpoint mismatch, check backend **serializers.py**, **models.py**, and route URLs.
- For new backend fields, adjust frontend model/interface.
- For proxy/API issues, validate `vite.config.ts` for `/api` → `http://localhost:8000`
- For authentication/permission/API errors, check backend permissions or JWT token flow.

---

## 👥 Credits

- Frontend: [SayedAliff](https://github.com/SayedAliff)
- Backend: [wasikahmed](https://github.com/wasikahmed)

---

## License

This project is for academic/educational use.
