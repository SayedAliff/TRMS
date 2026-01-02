# TRMS (Tax Return Management System) Frontend

## Overview

**TRMS** is a tax management system frontend built with React + TypeScript. This project acts as the user interface for taxpayers, junior tax officers, and senior managers.

**Backend/Database not included in this repo:**  
- The backend will be developed by your team using **Django**.
- The live database will be in **Oracle 10g**.
- All real data will come from backend API endpoints.  
- **Currently, all data and authentication in this frontend is dummy/mock.**

---

## Features

- **Taxpayer Portal:**  
  - File tax returns  
  - Payment history  
  - Raise support tickets  
  - Edit profile & password

- **Junior Officer Portal:**  
  - Dashboard overview  
  - Manage taxpayers  
  - Tax list & verification  
  - Support ticket status  
  - Edit officer profile & password

- **Senior Manager Portal:**  
  - All officers dashboard  
  - All taxpayers management  
  - Manage/Promote/Demote officers  
  - Tax list/payments overview  
  - Complete audit and profile controls

---

## Setup Instructions

1. **Clone the repo**
   ```
   git clone https://github.com/SayedAliff/TRMS.git
   cd TRMS
   ```

2. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```
   npm start
   # or
   yarn start
   ```

4. **Login**  
   - Use dummy credentials (since there's no backend).
   - After backend is connected, use your assigned credentials.

---

## Clean Up for Backend Connection

> **IMPORTANT:**  
> This repo uses dummy/mock data everywhere (table rows, user objects, status).  
> Before going live, _all dummy/mock data arrays/objects must be removed_ from:
> - `components/TaxpayerDashboard.tsx`
> - `components/JuniorOfficerDashboard.tsx`
> - `components/SeniorManagerDashboard.tsx`
> - `components/Login.tsx`
> - `components/PaymentHistory.tsx`
> - `components/SupportTickets.tsx`
>
> Replace with fetch/API calls to your Django backend.
>
> See the [lib/api.ts](./lib/api.ts) file for how API calls can work.

---

## Backend Interface Guidelines

Your backend team will:
- Build API endpoints with Django (or Django REST Framework)
- Connect to Oracle 10g for all data.
- Implement user authentication (JWT or session-based)
- Connect these routes:
  - `/api/auth/taxpayer/login/`
  - `/api/auth/officer/login/`
  - `/api/auth/taxpayer/register/`
  - `/api/taxpayers/`, `/api/payments/`, `/api/tickets/`, etc.

**No hardcoded data should remain after backend integration!**

---

## Documentation

A full system documentation with detailed workflow, database schema, and user roles  
is available in the project directory as `Oracle 10g .pdf`.

---

## Contributors

- **Frontend:** [SayedAliff](https://github.com/SayedAliff)
- **Backend & Database:** Your team (Django + Oracle 10g)

---

## License

This project is for academic and instructional use only.