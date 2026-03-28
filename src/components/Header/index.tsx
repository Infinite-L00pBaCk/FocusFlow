import { motion } from 'framer-motion';
import { Settings, BarChart3, User, ListTodo, Volume2 } from 'lucide-react';
import { useAuth, useTimer } from '../../contexts';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenStats: () => void;
  onOpenAuth: () => void;
  onOpenTasks: () => void;
  onOpenAmbient: () => void;
}

export function Header({
  onOpenSettings,
  onOpenStats,
  onOpenAuth,
  onOpenTasks,
  onOpenAmbient,
}: HeaderProps) {
  const { user } = useAuth();
  const { isRunning } = useTimer();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: isRunning ? 0.4 : 1,
        background: '#000000',
        transition: 'opacity 0.5s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo - Click to go home */}
        <div
          onClick={() => window.location.reload()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          {/* Custom FocusFlow SVG Logo */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer ring */}
            <circle cx="18" cy="18" r="16" stroke="#2a2a2a" strokeWidth="1.5" />
            {/* Progress arc — ~75% filled, orange-red gradient via two arcs */}
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="url(#logoGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="75 25"
              strokeDashoffset="25"
              transform="rotate(-90 18 18)"
            />
            {/* Inner flow line */}
            <path
              d="M11 18 C11 14 14 12 18 12 C22 12 25 15 25 18"
              stroke="#ff6a00"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            {/* Center dot */}
            <circle cx="18" cy="18" r="2.5" fill="url(#logoGradient)" />
            {/* Tick mark at 12 o'clock */}
            <line x1="18" y1="2.5" x2="18" y2="5.5" stroke="#ff4444" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="logoGradient" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff4444" />
                <stop offset="100%" stopColor="#ff8c00" />
              </linearGradient>
            </defs>
          </svg>
          <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '18px', letterSpacing: '-0.02em' }}>
            FocusFlow
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <NavButton icon={<ListTodo size={20} />} label="Tasks" onClick={onOpenTasks} />
          <NavButton icon={<Volume2 size={20} />} label="Sounds" onClick={onOpenAmbient} />
          <NavButton icon={<BarChart3 size={20} />} label="Stats" onClick={onOpenStats} />
          <NavButton icon={<Settings size={20} />} label="Settings" onClick={onOpenSettings} />

          <div style={{ width: '1px', height: '24px', margin: '0 12px', background: '#222222' }} />

          <button
            type="button"
            onClick={onOpenAuth}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              background: '#111111',
              border: '1px solid #222222',
              borderRadius: '12px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#111111')}
          >
            {user ? (
              <>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff4444, #ff8c00)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: 500 }}>
                    {(user.user_metadata?.display_name || user.email)?.[0].toUpperCase() || 'U'}
                  </span>
                </div>
                <span style={{ color: '#888888', fontSize: '14px' }}>
                  {user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'}
                </span>
              </>
            ) : (
              <>
                <User size={18} color="#555555" />
                <span style={{ color: '#555555', fontSize: '14px' }}>Sign In</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </motion.header>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function NavButton({ icon, label, onClick }: NavButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ color: '#ffffff' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        background: 'transparent',
        border: 'none',
        borderRadius: '12px',
        color: '#555555',
        cursor: 'pointer',
        outline: 'none',
        transition: 'color 0.2s ease',
      }}
      title={label}
    >
      {icon}
    </motion.button>
  );
}
