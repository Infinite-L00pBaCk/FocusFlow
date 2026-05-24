import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Bell, Keyboard, ListTodo, Palette, ShieldCheck, Timer, Volume2 } from 'lucide-react';
import { CinematicBackground } from './CinematicBackground';
import { FocusFlowLogo } from './FocusFlowLogo';
import { QUOTES } from '../types';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenAuth: () => void;
}

const features = [
  {
    icon: Timer,
    title: 'Flexible Pomodoro Timer',
    description: 'Switch between Pomodoro, short break, and long break sessions with adjustable durations for deep work.',
  },
  {
    icon: ListTodo,
    title: 'Task Planning',
    description: 'Create, edit, complete, and track tasks alongside your focus sessions so your work stays organized.',
  },
  {
    icon: BarChart3,
    title: 'Progress Stats',
    description: 'Review sessions, focus time, streaks, daily goals, and weekly charts to understand your momentum.',
  },
  {
    icon: Volume2,
    title: 'Ambient Soundscapes',
    description: 'Use rain, forest, ocean, and cafe sounds with volume control to build a calmer working atmosphere.',
  },
  {
    icon: Palette,
    title: 'Personal Themes',
    description: 'Choose accent colors, sound alerts, browser notifications, and a focus mode that hides distractions.',
  },
  {
    icon: ShieldCheck,
    title: 'Account Sync',
    description: 'Sign in with Supabase authentication so your profile and productivity data can stay connected.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Use Space, R, S, F, arrow keys, and quick controls to manage sessions without breaking concentration.',
  },
  {
    icon: Bell,
    title: 'Session Alerts',
    description: 'Browser notifications and sound alerts help you know when focus and break sessions are complete.',
  },
];

const faqs = [
  {
    question: 'What is FocusFlow built for?',
    answer:
      'FocusFlow is a minimal productivity timer for people who want structured focus sessions, clean task tracking, and a calmer workspace.',
  },
  {
    question: 'Can I customize the timer?',
    answer:
      'Yes. You can adjust session lengths, switch between Pomodoro and break modes, skip sessions, reset the timer, and use focus mode.',
  },
  {
    question: 'Does it include task management?',
    answer:
      'Yes. The app includes a task panel where you can add tasks, mark them complete, edit them, delete them, and track work beside the timer.',
  },
  {
    question: 'Are stats included?',
    answer:
      'Yes. FocusFlow tracks focus sessions, completed tasks, streaks, goals, and weekly productivity charts.',
  },
  {
    question: 'Does FocusFlow support sounds?',
    answer:
      'Yes. Built-in ambient sounds include rain, forest, ocean, and cafe audio, with controls for creating your preferred focus environment.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'You can explore the timer experience first, and signing in enables the account-backed parts of the app through Supabase.',
  },
];

const QUOTE_INTERVAL_MS = 15000;

export function LandingPage({ onEnterApp, onOpenAuth }: LandingPageProps) {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const quote = useMemo(() => QUOTES[quoteIndex], [quoteIndex]);

  useEffect(() => {
    const quoteTimer = window.setInterval(() => {
      setQuoteIndex(currentIndex => (currentIndex + 1) % QUOTES.length);
    }, QUOTE_INTERVAL_MS);

    return () => window.clearInterval(quoteTimer);
  }, []);

  return (
    <main className="landing-page">
      <CinematicBackground className="landing-video" />

      <div className="landing-overlay" />

      <div className="landing-nav-wrap">
        <nav className="liquid-glass landing-nav">
          <div className="landing-brand-row">
            <button
              type="button"
              onClick={onEnterApp}
              className="landing-brand"
              aria-label="Open FocusFlow"
            >
              <FocusFlowLogo size={32} />
              <span>FocusFlow</span>
            </button>

            <div className="landing-links">
              <a href="#features" className="landing-link">
                Features
              </a>
              <a href="#faq" className="landing-link">
                FAQ
              </a>
              <a href="#about" className="landing-link">
                About
              </a>
            </div>
          </div>

          <div className="landing-actions">
            <button className="landing-text-button" type="button" onClick={onOpenAuth}>
              Sign Up
            </button>
            <button
              className="liquid-glass landing-login"
              type="button"
              onClick={onOpenAuth}
            >
              Login
            </button>
          </div>
        </nav>
      </div>

      <section className="landing-hero">
        <h1
          className="landing-heading"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        <div className="liquid-glass landing-quote" key={`${quote.text}-${quote.author}`}>
          <p>"{quote.text}"</p>
          <span>— {quote.author}</span>
        </div>

        <button
          className="liquid-glass landing-primary"
          type="button"
          onClick={onEnterApp}
        >
          Start Focusing
        </button>
      </section>

      <section id="features" className="landing-section">
        <div className="landing-section-inner">
          <div className="landing-section-heading">
            <span>Features</span>
            <h2>Everything you need to stay in flow</h2>
          </div>

          <div className="landing-feature-grid">
            {features.map(feature => {
              const Icon = feature.icon;

              return (
                <article className="liquid-glass landing-card" key={feature.title}>
                  <Icon size={22} aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="landing-section">
        <div className="landing-section-inner landing-about-layout">
          <div className="landing-section-heading">
            <span>About</span>
            <h2>A focused workspace for deep, deliberate work</h2>
          </div>

          <div className="liquid-glass landing-about-panel">
            <p>
              FocusFlow is designed for people who want to work with intention. It combines a Pomodoro timer,
              task planning, progress tracking, ambient sounds, and a distraction-light interface into one calm
              productivity space.
            </p>
            <p>
              The experience is intentionally minimal: start a session, stay aware of your progress, and return
              to the work that matters. The cinematic interface keeps the app quiet and immersive while still
              giving you useful tools when you need them.
            </p>

            <div className="landing-about-points">
              <div>
                <strong>Built around rhythm</strong>
                <span>Focus, break, reset, and repeat with flexible session lengths.</span>
              </div>
              <div>
                <strong>Made for momentum</strong>
                <span>Track streaks, daily goals, tasks, and focus time without clutter.</span>
              </div>
              <div>
                <strong>Designed to disappear</strong>
                <span>Focus mode, shortcuts, and ambient sound help the interface stay out of your way.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="landing-section landing-section-last">
        <div className="landing-section-inner">
          <div className="landing-section-heading">
            <span>FAQ</span>
            <h2>FocusFlow questions, answered</h2>
          </div>

          <div className="landing-faq-list">
            {faqs.map(item => (
              <article className="liquid-glass landing-faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
