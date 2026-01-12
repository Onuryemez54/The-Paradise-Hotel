'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useMediaQuery } from 'react-responsive';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isTablet = useMediaQuery({ maxWidth: 768 });

  if (isTablet) {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="cursor-pointer rounded-md p-1 transition duration-300 ease-in-out hover:scale-105"
      >
        <div className="bg-toggle-icon rounded-xl p-1.5">
          {theme === 'dark' ? (
            <Sun className="text-accent-400 h-4 w-4 transition-transform duration-500" />
          ) : (
            <Moon className="h-4 w-4 text-white transition-transform duration-500" />
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="bg-toggle-bg/70 relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors duration-500 ease-in-out"
    >
      <div
        className={`bg-toggle-icon hover:bg-toggle-bg-hover absolute flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-500 ease-in-out ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'} `}
      >
        {theme === 'dark' ? (
          <Sun className="text-accent-400 h-4 w-4 transition-transform duration-500" />
        ) : (
          <Moon className="text-accent-900 h-4 w-4 transition-transform duration-500" />
        )}
      </div>
    </button>
  );
}
