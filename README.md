# VetConsult - Online Veterinary Consultation MVP

A modern, high-converting, mobile-first telemedicine platform designed to connect pet owners discovering the service through Instagram advertisements directly to licensed veterinarians via WhatsApp.

---

## 🚀 Key Features

- **Instagram-First Mobile UX:** Ultra-fast intake funnel designed for mobile viewports, minimal typing, zero login friction, and immediate WhatsApp handoff.
- **WhatsApp Click-to-Chat Integration:** Generates a structured case summary with consultation reference ID pre-filled for the attending doctor.
- **Supabase Backend:** Scalable Postgres table (`consultation_requests`) with Row Level Security (RLS) restricting customer records to authenticated veterinary staff.
- **Pet Photo Upload:** Optional client-validated (<5MB, JPG/PNG/WebP) image uploads directly stored in Supabase Storage.
- **Protected Doctor/Admin Desk (`/admin`):** Secure login, status tracking (`new`, `waiting`, `in_consultation`, `completed`, `cancelled`), and manual UPI payment tracking (`pending`, `paid`, `waived`).
- **UTM Campaign Attribution:** Automatically captures `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` to measure which Instagram ads drive paid consultations.
- **Medical Safety Disclaimers:** Transparent non-emergency guidance notices across home, form, and `/terms`.
- **Zero-Config Dev Fallback:** Works immediately in local preview even before Supabase credentials are plugged in.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database & Storage:** Supabase (PostgreSQL + Storage)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/             # Doctor / Admin Portal (/admin)
│   │   ├── api/
│   │   │   ├── admin/         # Login, logout, session verification
│   │   │   └── consultations/ # Intake creation & status update endpoints
│   │   ├── privacy/           # Privacy Policy page
│   │   ├── terms/             # Terms & Non-emergency disclaimer
│   │   ├── globals.css        # Tailwind styling & mobile viewport fixes
│   │   ├── layout.tsx         # OpenGraph & SEO metadata
│   │   └── page.tsx           # Mobile-first Landing Page & Confirmation
│   ├── components/
│   │   ├── Header.tsx         # Navigation & clinic branding
│   │   ├── Hero.tsx           # Value proposition, ₹100 highlight, mobile CTA
│   │   ├── HowItWorks.tsx     # 4-step clear visual journey
│   │   ├── PetConcernCards.tsx# Quick symptom shortcuts (vomiting, skin, etc.)
│   │   ├── ConsultationForm.tsx # Client-validated intake form & photo upload
│   │   ├── ConsultationConfirmation.tsx # Reference ID & WhatsApp redirect card
│   │   ├── WhatsAppButton.tsx # Pre-filled click-to-chat button
│   │   ├── AdminConsultationTable.tsx # Responsive table + drawer for doctors
│   │   ├── StatusBadge.tsx    # Lifecycle badge (new, in_consultation, etc.)
│   │   ├── PaymentBadge.tsx   # Payment badge (pending, paid, waived)
│   │   ├── EmergencyDisclaimer.tsx # Prominent safety warning
│   │   └── Footer.tsx         # Legal links & medical notices
│   ├── lib/
│   │   ├── auth.ts            # Admin session generation & cookie validation
│   │   ├── reference.ts       # Human-readable reference ID generator (VET-YYYYMMDD-XXXX)
│   │   ├── whatsapp.ts        # WhatsApp message builder & phone number formatter
│   │   └── supabase/          # Client, server, and dev fallback store
│   └── types/
│       └── consultation.ts    # TypeScript interfaces & enums
├── supabase/
│   └── schema.sql             # SQL table migration & RLS policies
├── .env.example               # Environment variables template
├── vercel.json                # Vercel deployment configuration
└── README.md
```

---

## ⚙️ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd vet_clinic
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your clinic parameters:
```env
# Supabase (Optional for local preview, required for production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clinic WhatsApp Phone Number (International format without '+' e.g., 919876543210 for India)
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=919876543210

# Admin Portal Credentials (/admin)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=vetadmin2026
ADMIN_SESSION_SECRET=choose-a-strong-secret-key
```

### 3. Setup Supabase Database
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Copy and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
4. Go to **Storage**, confirm bucket `consultation-photos` exists with public access.

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your browser (or use responsive device mode in DevTools to simulate an iPhone / Android screen).

---

## 📱 User Flow

```
Instagram Ad (with UTM tags)
       │
       ▼
Landing Page (Hero + ₹100 fee badge + Trust indicators)
       │
       ▼
Consultation Form (Owner info + Pet details + Concern + Photo upload)
       │
       ▼
Consultation Reference Generated (VET-YYYYMMDD-XXXX logged in Supabase)
       │
       ▼
"Continue on WhatsApp" Button
       │
       ▼
WhatsApp chat opens with attending veterinarian (message pre-filled)
       │
       ▼
Doctor conducts consultation & shares UPI QR / VPA
       │
       ▼
Doctor updates status to "Completed" & Payment to "Paid" in /admin
```

---

## 🩺 Admin Portal (`/admin`)

- Visit `/admin`
- Enter the credentials defined in `.env.local` (`admin` / `vetadmin2026` by default).
- Features:
  - View incoming consultation queue in real-time.
  - Filter by **All**, **New**, **Waiting**, **In Consultation**, **Completed**, **Payment Pending**, **Paid**.
  - One-click button to initiate a WhatsApp chat directly with the pet owner.
  - Detailed modal to view the pet's age, breed, main concern, and uploaded photos.
  - Update consultation status, mark manual UPI payment as Paid/Waived, and document clinical notes.

---

## 🚀 Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables in the Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
4. Click **Deploy**. Vercel will automatically build and host the application globally.

---

## 🛡️ License
Private & Proprietary - Built for Online Veterinary Telehealth.
