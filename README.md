<div align="center">

<!-- Custom Logo SVG -->
<svg width="80" height="80" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="18" r="16" stroke="#2a2a2a" stroke-width="2"/>
  <circle cx="18" cy="18" r="16" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="75 25" stroke-dashoffset="25" transform="rotate(-90 18 18)"/>
  <path d="M11 18 C11 14 14 12 18 12 C22 12 25 15 25 18" stroke="#ff6a00" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <circle cx="18" cy="18" r="2.5" fill="#ff6a00"/>
  <line x1="18" y1="2.5" x2="18" y2="5.5" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
  <defs>
    <linearGradient id="g" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ff4444"/>
      <stop offset="100%" stop-color="#ff8c00"/>
    </linearGradient>
  </defs>
</svg>

# FocusFlow

**A beautiful, minimalistic focus timer to help you do your best work.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-FocusFlow-ff4444?style=for-the-badge)](https://focus-flow-mauve-delta.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 🌐 Live Demo

👉 **[focus-flow-mauve-delta.vercel.app](https://focus-flow-mauve-delta.vercel.app/)**

---

## ✨ Features

### ⏱️ Timer & Focus
- **Pomodoro Timer** — Customizable focus and break durations (1–60 min)
- **Focus Mode** — Press `F` to hide all distractions and lock in
- **Smart Presets** — Classic (25/5), Deep Work (50/10), Quick Tasks (15/3)
- **Auto-advance** — Seamlessly moves from focus → break → focus

### 📊 Productivity Tracking
- **Streak Counter** 🔥 — Track your daily consistency
- **Weekly Charts** — Visual breakdown of your last 7 days
- **Session Stats** — Total pomodoros, focus time, tasks completed
- **Daily Goals** — Set and track your daily session targets

### ✅ Task Management
- **Task List** — Create, edit, complete, and delete tasks
- **Color Coding** — Categorize tasks with colors
- **Quick Add Presets** — One-click tasks (Coding, Study, Gaming, etc.)
- **Per-task Pomodoro Counter** — See how many sessions each task took

### 🎵 Ambient Sounds
- **Built-in Soundscapes** — Rain, Forest, Ocean, Café
- **Volume Control** — Adjustable per sound
- **Spotify Integration** — Connect your Spotify for music during sessions

### 🎨 Customization
- **5 Theme Colors** — Red, Orange, Green, Blue, Purple
- **Browser Notifications** — Get alerted when a session completes
- **Sound Alerts** — Custom alarm sounds
- **Motivational Quotes** — Refreshes on every reset

### 🔐 Authentication
- **Supabase Auth** — Secure email/password sign in
- **User Profiles** — Your name, your stats, your data

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start / Pause timer |
| `R` | Reset timer |
| `S` | Skip to next session |
| `F` | Toggle Focus Mode |
| `→` / `←` | Cycle timer modes |
| `↑` / `↓` | Adjust time ±5 min |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript |
| Build Tool | Vite 7 |
| Styling | Inline CSS-in-JS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Audio | Howler.js |
| Auth & DB | Supabase |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Infinite-L00pBaCk/FocusFlow.git
cd FocusFlow

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

Open `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> You can find these in your Supabase project under **Settings → API**

```bash
# 4. Start the dev server
npm run dev
```

App runs at **http://localhost:5173** 🚀

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview the build locally
npm run preview
```

To deploy your own version on Vercel:
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add your environment variables
4. Click **Deploy** ✅

---

## 📁 Project Structure

```
focusflow-app/
├── public/
│   └── sounds/          # Ambient audio files
├── src/
│   ├── components/
│   │   ├── Header/      # Top nav + logo
│   │   ├── Timer/       # Core timer UI
│   │   ├── Tasks/       # Task panel
│   │   ├── Stats/       # Stats & charts
│   │   ├── Settings/    # Settings modal
│   │   ├── AmbientSound/# Sound panel
│   │   ├── Auth/        # Login / signup
│   │   └── UI/          # Reusable components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom hooks
│   └── types/           # TypeScript types
├── index.html
└── package.json
```

---

## 📄 License

MIT License — free to use for personal or commercial projects.

---

<div align="center">

Built with ❤️ by [Infinite-L00pBaCk](https://github.com/Infinite-L00pBaCk)

⭐ If you found this useful, give it a star!

</div>
