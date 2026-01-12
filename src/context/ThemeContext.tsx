'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    let initialTheme: Theme = 'light';

    try {
      const stored = localStorage.getItem('theme');

      if (stored === 'light' || stored === 'dark') {
        initialTheme = stored;
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;

        initialTheme = prefersDark ? 'dark' : 'light';
      }
    } catch (e) {
      console.error('Theme loading error:', e);
    }

    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    if (!theme) return;
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    document.body.classList.add('theme-fade');
    setTimeout(() => document.body.classList.remove('theme-fade'), 300);
  };

  if (theme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  if (ctx.theme === null) {
    throw new Error('Theme is not loaded yet');
  }
  return ctx;
};
