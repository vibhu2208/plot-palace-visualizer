# 🏡 Home Hunts - Plot Booking System

A modern, full-stack web-based platform for browsing, filtering, and booking residential plots. This interactive system offers real-time plot visualization, automated booking flows, and live email notifications — designed to streamline the plot selection and booking experience.

---

## 🔧 Tech Stack

### Frontend
- **React 18.3.1** – Modern JavaScript library for building user interfaces
- **TypeScript** – Type-safe development
- **Vite** – Lightning-fast build tool and development server
- **Tailwind CSS** – Utility-first CSS for responsive styling
- **shadcn/ui** – Accessible UI components using Radix primitives

### Backend & Database
- **Supabase** – Backend-as-a-Service providing:
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - File storage
  - Edge Functions for serverless APIs

### Key Libraries
- `react-router-dom` – Routing
- `react-hook-form` + `zod` – Form management and validation
- `@tanstack/react-query` – Server state and caching
- `lucide-react` – Icon library
- `date-fns`, `react-day-picker` – Date utilities and calendar UI
- `recharts` – Data visualization
- `resend` – Email dispatch service

---

## 📁 Project Structure

src/
├── components/
│ ├── Layout.tsx
│ ├── PlotGrid.tsx
│ ├── Plot.tsx
│ ├── PlotInfoCard.tsx
│ ├── BookingModal.tsx
│ ├── BlockFilter.tsx
│ └── ui/
├── pages/
│ ├── Index.tsx
│ ├── Plots.tsx
│ ├── Contact.tsx
│ └── Home.tsx
├── types/
│ └── index.ts
├── data/
│ └── plotData.ts
└── integrations/
└── supabase/

---

## 🧩 Features

### 1. Interactive Plot Visualization
- Color-coded grid by availability
- Real-time updates using Supabase
- Responsive layout for all devices

### 2. Advanced Filtering
- Block-level filtering (A, B, C…)
- Booked/available status filters
- Instant search support

### 3. Booking System
- Multi-step form with validation
- Contact, ID upload, visit scheduling
- Government ID upload with Supabase storage

### 4. Notifications
- Email confirmations via **Resend**
- Admin alerts on new bookings
- HTML email templates for clarity

### 5. Clean UI/UX
- Mobile-first design
- Accessible components (WCAG-compliant)
- Smooth loading states and error handling

---

## 🛠 Technical Details

### State Management
- `react-hook-form` + `zod` for input handling
- `react-query` for async/server state
- Supabase subscriptions for live updates

### Data Flow
- Static data: Configuration in `plotData.ts`
- Bookings: Dynamic via Supabase queries
- Emails: Triggered using Edge Functions

---

## 🧾 Database Schema

```sql
CREATE TABLE public.plot_bookings (
  id INTEGER PRIMARY KEY,
  plot_id TEXT NOT NULL,
  block_id TEXT NOT NULL,
  plot_number INTEGER NOT NULL,
  booked_by TEXT NOT NULL,
  contact_info TEXT,
  phone TEXT,
  visit_date TIMESTAMP WITH TIME ZONE,
  booked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  note TEXT
);


