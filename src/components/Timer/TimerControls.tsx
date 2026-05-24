import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useTimer, useSettings } from '../../contexts';
import { THEME_COLORS } from '../../types';

export function TimerControls() {
  const { isRunning, isPaused, start, pause, resume, reset, skip } = useTimer();
  const { settings } = useSettings();

  const themeColor = THEME_COLORS[settings.theme].primary;

  const handleMainButton = () => {
    if (isRunning) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      start();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* Reset - Hidden when running */}
      {!isRunning && (
        <button
          type="button"
          onClick={reset}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '50%',
            color: 'rgba(255, 255, 255, 0.55)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'border-color 0.2s ease, color 0.2s ease',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.24)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
          }}
        >
          <RotateCcw size={18} />
        </button>
      )}

      {/* Main Button */}
      <button
        type="button"
        onClick={handleMainButton}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: isRunning ? '16px 40px' : '14px 36px',
          background: isRunning ? 'rgba(255,255,255,0.03)' : `linear-gradient(135deg, ${themeColor}, #ff9a3d)`,
          border: isRunning ? `1px solid ${themeColor}` : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50px',
          color: isRunning ? themeColor : '#000000',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxShadow: isRunning ? 'none' : `0 16px 42px ${themeColor}35`,
        }}
      >
        {isRunning ? (
          <>
            <Pause size={18} />
            <span>PAUSE</span>
          </>
        ) : (
          <>
            <Play size={18} />
            <span>{isPaused ? 'RESUME' : 'START'}</span>
          </>
        )}
      </button>

      {/* Skip - Hidden when running */}
      {!isRunning && (
        <button
          type="button"
          onClick={skip}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '50%',
            color: 'rgba(255, 255, 255, 0.55)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'border-color 0.2s ease, color 0.2s ease',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.24)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
          }}
        >
          <SkipForward size={18} />
        </button>
      )}
    </div>
  );
}
