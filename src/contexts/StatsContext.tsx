import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserStats, PomodoroSession, DailyStats, DEFAULT_STATS } from '../types';

interface StatsContextType {
  stats: UserStats;
  todayStats: DailyStats;
  addSession: (session: PomodoroSession) => void;
  incrementTasksCompleted: () => void;
  updateStreak: () => void;
  resetStats: () => void;
  exportStats: () => string;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

const STORAGE_KEY = 'pomodoro-stats';
const SETTINGS_STORAGE_KEY = 'pomodoro-settings';
const MIGRATION_KEY = 'pomodoro-stats-duration-fix-v1';
const BACKUP_KEY = 'pomodoro-stats-backup-before-duration-fix-v1';

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserStats>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = { ...DEFAULT_STATS, ...JSON.parse(stored) } as UserStats;

        // One-time migration:
        // Older builds incorrectly recorded each completed pomodoro as 25 minutes,
        // even when users ran custom durations like 1 minute.
        const migrationApplied = localStorage.getItem(MIGRATION_KEY) === 'applied';
        if (migrationApplied) {
          return parsed;
        }

        const settingsRaw = localStorage.getItem(SETTINGS_STORAGE_KEY);
        const configuredPomodoroMinutes = (() => {
          if (!settingsRaw) return null;
          try {
            const parsedSettings = JSON.parse(settingsRaw) as { timer?: { pomodoro?: number } };
            const minutes = parsedSettings?.timer?.pomodoro;
            return typeof minutes === 'number' && Number.isFinite(minutes) ? Math.max(1, Math.round(minutes)) : null;
          } catch {
            return null;
          }
        })();

        if (!configuredPomodoroMinutes || configuredPomodoroMinutes === 25) {
          localStorage.setItem(MIGRATION_KEY, 'applied');
          return parsed;
        }

        let changed = false;
        const migratedDailyStats = parsed.dailyStats.map(day => {
          if (day.totalPomodoros <= 0) return day;

          // Only rewrite rows that exactly match the known bad pattern.
          const looksLikeBadLegacyRow = day.totalFocusTime === day.totalPomodoros * 25;
          if (!looksLikeBadLegacyRow) return day;

          changed = true;
          return {
            ...day,
            totalFocusTime: day.totalPomodoros * configuredPomodoroMinutes,
          };
        });

        if (!changed) {
          localStorage.setItem(MIGRATION_KEY, 'applied');
          return parsed;
        }

        const migratedTotalFocusTime = migratedDailyStats.reduce((sum, day) => sum + day.totalFocusTime, 0);
        const migratedStats: UserStats = {
          ...parsed,
          dailyStats: migratedDailyStats,
          totalFocusTime: migratedTotalFocusTime,
        };

        // Keep a rollback snapshot just in case.
        localStorage.setItem(BACKUP_KEY, JSON.stringify(parsed));
        localStorage.setItem(MIGRATION_KEY, 'applied');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedStats));
        return migratedStats;
      } catch {
        return DEFAULT_STATS;
      }
    }
    return DEFAULT_STATS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const getTodayStats = (): DailyStats => {
    const today = getTodayKey();
    const existing = stats.dailyStats.find(s => s.date === today);
    return existing || { date: today, totalPomodoros: 0, totalFocusTime: 0, tasksCompleted: 0 };
  };

  const addSession = (session: PomodoroSession) => {
    const today = getTodayKey();

    setStats(prev => {
      const existingIndex = prev.dailyStats.findIndex(s => s.date === today);
      let newDailyStats = [...prev.dailyStats];

      if (existingIndex >= 0) {
        newDailyStats[existingIndex] = {
          ...newDailyStats[existingIndex],
          totalPomodoros: newDailyStats[existingIndex].totalPomodoros + 1,
          totalFocusTime: newDailyStats[existingIndex].totalFocusTime + session.duration,
        };
      } else {
        newDailyStats.push({
          date: today,
          totalPomodoros: 1,
          totalFocusTime: session.duration,
          tasksCompleted: 0,
        });
      }

      // Keep only last 365 days
      if (newDailyStats.length > 365) {
        newDailyStats = newDailyStats.slice(-365);
      }

      return {
        ...prev,
        totalPomodoros: prev.totalPomodoros + 1,
        totalFocusTime: prev.totalFocusTime + session.duration,
        dailyStats: newDailyStats,
      };
    });
  };

  const incrementTasksCompleted = () => {
    const today = getTodayKey();

    setStats(prev => {
      const existingIndex = prev.dailyStats.findIndex(s => s.date === today);
      let newDailyStats = [...prev.dailyStats];

      if (existingIndex >= 0) {
        newDailyStats[existingIndex] = {
          ...newDailyStats[existingIndex],
          tasksCompleted: newDailyStats[existingIndex].tasksCompleted + 1,
        };
      } else {
        newDailyStats.push({
          date: today,
          totalPomodoros: 0,
          totalFocusTime: 0,
          tasksCompleted: 1,
        });
      }

      return {
        ...prev,
        totalTasksCompleted: prev.totalTasksCompleted + 1,
        dailyStats: newDailyStats,
      };
    });
  };

  const updateStreak = () => {
    const today = getTodayKey();

    setStats(prev => {
      const lastActive = prev.lastActiveDate;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split('T')[0];

      let newStreak = prev.currentStreak;

      if (lastActive === today) {
        // Already updated today
        return prev;
      } else if (lastActive === yesterdayKey) {
        // Consecutive day
        newStreak = prev.currentStreak + 1;
      } else if (lastActive !== today) {
        // Streak broken or first day
        newStreak = 1;
      }

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
      };
    });
  };

  const resetStats = () => {
    setStats(DEFAULT_STATS);
  };

  const exportStats = (): string => {
    const headers = ['Date', 'Pomodoros', 'Focus Time (min)', 'Tasks Completed'];
    const rows = stats.dailyStats.map(s => [
      s.date,
      s.totalPomodoros.toString(),
      s.totalFocusTime.toString(),
      s.tasksCompleted.toString(),
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  return (
    <StatsContext.Provider
      value={{
        stats,
        todayStats: getTodayStats(),
        addSession,
        incrementTasksCompleted,
        updateStreak,
        resetStats,
        exportStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
}
