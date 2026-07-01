# ☕ coffee-dev

A full-stack café management web application built for a coffee shop. Designed as a portfolio-grade project with real authentication, database security, and production deployment.

The app has two distinct layers: a **customer-facing landing site** and a **staff dashboard** for internal operations.

---

## 🔑 Live Demo — Try the Staff Dashboard

> **Recruiters / reviewers:** the fastest way to evaluate this project is to log into the staff dashboard directly.

**Live site:** [coffee-dev.vercel.app](#) *(replace with your actual Vercel URL)*

**Staff login:** `/staff/login`

| Field | Value |
|---|---|
| URL | `https://<your-deployed-url>/staff/login` |
| Email | `demo@coffeedev.app` *(replace with your demo account)* |
| Password | `••••••••` *(replace with your demo account password)* |

> ⚠️ **Note:** This is a read-only demo account seeded with sample data — no real business data is exposed. It has cashier/staff-level access so you can explore the POS, dashboard, and transactions table without needing admin permissions.

Once logged in, a good tour is:
1. **Sales Overview** (`/staff/dashboard`) — stat cards + weekly revenue chart
2. **POS** (`/staff/pos`) — try building an order and checking out
3. **Transactions** — filter by Today / This Week / This Month
4. **Menu Management** — CRUD demo (toggle an item's availability)

If you'd rather skip logging in, a full walkthrough with screenshots is below.

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom coffee-themed design tokens) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Auth | Supabase Auth with middleware route protection |
| Storage | Supabase Storage (public buckets) |
| Data Viz | [Recharts](https://recharts.org/) |
| Deployment | [Vercel](https://vercel.com/) |
| Version Control | GitHub |

### Design Tokens

A custom token system built around a coffee aesthetic: `espresso`, `foam`, `caramel`, `latte`.

---

## ✨ Features

### 🌐 Customer-Facing Site

- **Landing Page** — Full branded brochure site for the café
- **Featured Menu Section** — Dynamically fetches items marked `featured = true` from Supabase
- **Gallery** — Masonry layout with deterministic span patterns (hydration-safe), pulling images from Supabase Storage
- **Testimonials** — Customer review submission form with live data
- **Contact Form** — Powered by Next.js Server Actions

### 🧑‍💼 Staff Dashboard

> Protected via Supabase Auth — accessible only to authenticated employees. See [Live Demo](#-live-demo--try-the-staff-dashboard) above for access.

- **Login Page** — Secure staff login at a non-public route (`/staff/login`)
- **Sales Overview**
  - Stat cards: today's revenue, order count, average order value, top-selling item
  - Weekly revenue bar chart (Recharts)
- **Transactions Table** — Filterable by Today / This Week / This Month
- **Menu Management** — Full CRUD for menu items via modal UI, with availability and featured toggles
- **POS** — Menu grid + order cart, multiple payment methods (Cash, GCash, Card, Maya), writes directly to Supabase

---

## 🗄️ Database Schema

| Table | Description |
|---|---|
| `employees` | Staff accounts |
| `menu_items` | Product catalog |
| `transactions` | Sales records |
| `transaction_items` | Line items per transaction |
| `gallery_images` | Gallery photo references |

All tables use **Row Level Security (RLS)** policies and performance indexes.

---

## 🚀 Deployment

- Hosted on **Vercel** (production)
- Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) configured in Vercel's production environment settings
- Supabase project handles auth, database, and file storage

---

## 🔮 Future Features

### Customer-Facing

- [ ] **Online Ordering / Reservations** — Allow customers to pre-order or book a table
- [ ] **Loyalty Program Page** — Display points, rewards, and membership tiers
- [ ] **Seasonal Menu Announcements** — Highlight limited-time offerings with countdown timers
- [ ] **Newsletter Signup** — Email subscription with Supabase or a third-party provider (e.g. Resend, Mailchimp)
- [ ] **Multi-language Support** — Localization for Filipino (Tagalog) and English

### Staff Dashboard

- [ ] **Inventory Management** — Track stock levels, set low-stock alerts
- [ ] **Employee Management** — Add/remove staff accounts, assign roles and permissions
- [ ] **Order Management System** — Real-time order queue for kitchen/bar staff
- [ ] **Daily/Monthly Sales Reports** — Export-ready PDF or CSV reports
- [ ] **Shift Scheduling** — Calendar-based shift planner for staff
- [ ] **Customer Feedback Panel** — View and respond to submitted testimonials
- [ ] **RBAC Enforcement** — Cashiers scoped to POS only; admins get full dashboard access
- [ ] **Audit Logging** — Track sensitive actions (voids, refunds, discounts)

### Technical

- [ ] **Real-time Updates** — Supabase Realtime subscriptions for live order/sales updates
- [ ] **Push Notifications** — Alert staff of new orders or low inventory
- [ ] **Mobile App** — React Native or PWA version for on-the-go management
- [ ] **Dark Mode** — Theme toggle using Tailwind's dark mode utilities

---

## 📁 Project Structure

```
coffee-dev/
├── app/
│   ├── actions/          # Server Actions (mutations, form handling)
│   ├── staff/
│   │   ├── login/        # Staff login page
│   │   └── dashboard/    # Protected staff dashboard
│   └── ...               # Customer-facing pages
├── components/           # Shared UI components
├── utils/
│   └── supabase/         # Supabase client (client.ts + server utilities)
└── public/               # Static assets
```

---

## 👤 Author

**xAndr1e** — [github.com/xAndr1e](https://github.com/xAndr1e)
