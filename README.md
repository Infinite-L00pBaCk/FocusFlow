🌐 Live Demo
👉 focus-flow-mauve-delta.vercel.app

✨ Features
⏱️ Timer & Focus

Pomodoro Timer — Customizable focus and break durations (1–60 min)
Focus Mode — Press F to hide all distractions and lock in
Smart Presets — Classic (25/5), Deep Work (50/10), Quick Tasks (15/3)
Auto-advance — Seamlessly moves from focus → break → focus

📊 Productivity Tracking

Streak Counter 🔥 — Track your daily consistency
Weekly Charts — Visual breakdown of your last 7 days
Session Stats — Total pomodoros, focus time, tasks completed
Daily Goals — Set and track your daily session targets

✅ Task Management

Task List — Create, edit, complete, and delete tasks
Color Coding — Categorize tasks with colors
Quick Add Presets — One-click tasks (Coding, Study, Gaming, etc.)
Per-task Pomodoro Counter — See how many sessions each task took

🎵 Ambient Sounds

Built-in Soundscapes — Rain, Forest, Ocean, Café
Volume Control — Adjustable per sound
Spotify Integration — Connect your Spotify for music during sessions

🎨 Customization

5 Theme Colors — Red, Orange, Green, Blue, Purple
Browser Notifications — Get alerted when a session completes
Sound Alerts — Custom alarm sounds
Motivational Quotes — Refreshes on every reset

🔐 Authentication

Supabase Auth — Secure email/password sign in
User Profiles — Your name, your stats, your data


⌨️ Keyboard Shortcuts
KeyActionSpaceStart / Pause timerRReset timerSSkip to next sessionFToggle Focus Mode→ / ←Cycle timer modes↑ / ↓Adjust time ±5 min

🛠️ Tech Stack
LayerTechnologyFrontendReact 19, TypeScriptBuild ToolVite 7StylingInline CSS-in-JSAnimationFramer MotionIconsLucide ReactChartsRechartsAudioHowler.jsAuth & DBSupabaseDeploymentVercel

🚀 Getting Started
Prerequisites

Node.js 18+
A Supabase account (free)

Installation
bash# 1. Clone the repo
git clone https://github.com/Infinite-L00pBaCk/FocusFlow.git
cd FocusFlow

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
Environment Variables
Open .env and fill in your Supabase credentials:
envVITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

You can find these in your Supabase project under Settings → API

bash# 4. Start the dev server
npm run dev
App runs at http://localhost:5173 🚀

📦 Build & Deploy
bash# Production build
npm run build

# Preview the build locally
npm run preview
To deploy your own version on Vercel:

Push this repo to GitHub
Go to vercel.com → Import project
Add your environment variables
Click Deploy ✅


📁 Project Structure
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

📄 License
MIT License — free to use for personal or commercial projects.

Built with ❤️ by Infinite-L00pBaCk
⭐ If you found this useful, give it a star!
