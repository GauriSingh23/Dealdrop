# 🛒 DealDrop - Smart Product Price Tracker

> Paste a product URL. We'll watch the price and alert you when it drops.

A full-stack price tracking app that monitors e-commerce product prices daily and sends email alerts on price drops.

---

## ✨ Features

- 🔍 **Track Any Product** — Works with Amazon, Zara, Walmart, and more
- 📊 **Price History Charts** — Interactive graphs showing price trends over time
- 🎯 **Optional Target Price** — Set a target and get alerted only when the price drops to it; leave it empty to get alerts on any drop
- 🔐 **Google Authentication** — Secure sign-in with Google OAuth
- 🔄 **Automated Daily Checks** — Scheduled cron jobs check prices automatically
- 📧 **Email Alerts** — Get notified when prices drop via Nodemailer (Gmail SMTP)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, Tailwind CSS, shadcn/ui, Recharts |
| Database | Supabase (PostgreSQL + RLS + pg_cron) |
| Auth | Supabase Google OAuth |
| Web Scraping | Firecrawl API |
| Email | Nodemailer (Gmail SMTP) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase and Firecrawl accounts
- Google OAuth credentials from Google Cloud Console
- A Gmail account with 2-Step Verification on and an [App Password](https://myaccount.google.com/apppasswords) for sending emails

### Installation

1. Clone the repository

```bash
git clone https://github.com/GauriSingh23/Dealdrop.git
cd Dealdrop
npm install
```

2. Create `.env.local` in the root directory and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_16_digit_gmail_app_password
CRON_SECRET=your_generated_cron_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: For `GMAIL_APP_PASSWORD`, you need to generate an "App Password" from your Google Account settings (2-Step Verification must be on). Your standard Gmail password won't work.

3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔍 How It Works

1. User pastes any e-commerce product URL
2. Firecrawl scrapes name, price, currency, and image instantly
3. Product is saved to Supabase with Row Level Security
4. User can optionally set a target price for the product
5. Daily cron job re-scrapes all products at 9 AM UTC
6. If the price drops (and reaches the target, when one is set), Nodemailer sends an email alert to the user


### Automated Price Checking

1. **Supabase pg_cron** - Runs daily at 9 AM UTC
2. **Triggers API endpoint** - Makes secure POST request to `/api/cron/check-prices`
3. **Firecrawl scrapes all products** - Updates prices for all tracked products
4. **Updates database** - Saves new prices and adds to history if changed
5. **Sends email alerts** - Notifies users via Nodemailer when prices drop (or hit their target price)


### Why Firecrawl?
- Handles JavaScript-rendered pages
- Built-in anti-bot bypass and rotating proxies
- AI-powered structured data extraction
- Works across different e-commerce platforms without site-specific scrapers

---

## 📁 Project Structure

```
Dealdrop/
├── app/
│   ├── page.js                    # Landing page with product input
│   ├── actions.js                 # Server actions for DB operations
│   ├── auth/
│   │   └── callback/
│   │       └── route.js           # OAuth callback handler
│   └── api/
│       └── cron/
│           └── check-prices/
│               └── route.js       # Cron endpoint for price checks
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── AddProductForm.js          # Product URL input with auth modal
│   ├── ProductCard.js             # Product display with chart and target price
│   ├── PriceChart.js              # Recharts price history graph
│   └── AuthModal.js               # Google sign-in modal
├── lib/
│   ├── firecrawl.js               # Firecrawl API integration
│   ├── email.js                   # Nodemailer email templates
│   └── utils.js                   # Utility functions
├── utils/
│   └── supabase/
│       ├── client.js              # Browser Supabase client
│       ├── server.js              # Server Supabase client
│       └── middleware.js          # Session refresh middleware
├── supabase/
│   └── migrations/
│       ├── 001_schema.sql         # Database tables & RLS policies
│       └── 002_setup_cron.sql     # Daily cron job setup
└── .env.local                     # Environment variables
```
---

## 🌐 Live Demo — [dealdrop-store.vercel.app](https://dealdrop-store.vercel.app)