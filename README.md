## yegna ቡና – Coffee Shop Website & Mini CRM

This project is a React + Vite single-page application for **yegna ቡና**, an Ethiopian-inspired coffee and dessert brand.

It has two parts:

- A public, marketing-focused landing page for guests.
- A hidden **admin mini CRM** at `/admin` for managing incoming leads.

---

## Features

**Public site (/)**
- Hero section with brand story and background photography.
- "Our Story" / About section tailored to Ethiopian coffee.
- Curated menu cards for drinks and sweets with photography.
- Contact/info section with address, phone, email, and contact form UI.
- Footer with opening hours and quick navigation.
- Light/dark theme toggle that updates header, sections, and footer.

**Admin mini CRM (/admin)**
- Email/password login gate with a demo account.
- Lead dashboard with:
   - Top metrics: total leads, new, contacted, converted, and conversion rate.
   - Search box and status filters (All/New/Contacted/Converted).
   - Table view of leads (name, email, source, status, last updated, action).
- Lead detail modal (click a row or the **View** action):
   - Shows name, email, status, message, source, created date.
   - Notes history list and field to add follow-up notes.
- Analytics tab with simple charts and an overall conversion summary.

> Note: Lead data is currently in-memory mock data only (no database).

---

## Tech Stack

- **Framework:** React 19
- **Bundler/Dev server:** Vite 6
- **Language:** TypeScript
- **Routing:** React Router DOM
- **Icons:** lucide-react

---

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)

### Install dependencies

```bash
npm install
```

### Run the app in development

```bash
npm run dev
```

By default Vite runs on `http://localhost:5173` (or the next available port).

- Public site: `http://localhost:5173/`
- Admin CRM: `http://localhost:5173/admin`

### Demo admin login

- **Email:** `admin@gmail.com`
- **Password:** `demo1234`

These credentials are hard-coded and meant for local/demo use only.

### Build for production

```bash
npm run build
```

The compiled assets will be generated in the `dist` folder.

### Preview the production build

```bash
npm run preview
```

Vite will start a local server that serves the built files so you can verify the production build.

---

## Project Structure (top level)

- `App.tsx` – Public landing page layout and theme handling.
- `index.tsx` – React entry point and routing (`/` and `/admin`).
- `components/` – UI components for the public site (Header, Hero, About, Menu, Contact, Footer).
- `components/admin/` – Admin layout, lead dashboard, analytics view, login, and shell.
- `vite.config.ts` – Vite configuration.
- `tsconfig.json` – TypeScript configuration.

---

## Customization

- Update images, copy, and menu items in the components under `components/`.
- Adjust lead mock data and statuses in `components/admin/LeadDashboard.tsx`.
- Change the demo login credentials in `components/admin/AdminLogin.tsx` if needed.

This README describes the website and admin experience only; there is currently no backend or API layer.
