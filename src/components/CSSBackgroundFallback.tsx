'use client';

import { useTheme } from '@/contexts/ThemeContext';

/**
 * A CSS-only fallback background for when WebGL isn't available or errors out
 */
export default function CSSBackgroundFallback() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-[-1]">
      <div 
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(ellipse at top, rgba(121, 40, 202, 0.15), transparent), linear-gradient(to bottom, var(--background), var(--background))'
            : 'radial-gradient(ellipse at top, rgba(100, 34, 170, 0.1), transparent), linear-gradient(to bottom, var(--background), var(--background))'
        }}
      />
    </div>
  );
} 