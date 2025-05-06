'use client';

import { useTheme } from '@/contexts/ThemeContext';

/**
 * A purely CSS-based fallback background that doesn't use Three.js
 * This is a reliable fallback when WebGL fails completely
 */
export default function StaticBackgroundFallback() {
  const { theme } = useTheme();
  
  // Generate random stars
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 0.5}px`,
    opacity: Math.random() * 0.6 + 0.2,
    animationDelay: `${Math.random() * 10}s`
  }));
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b transition-colors duration-700" 
        style={{ 
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(ellipse at top, rgba(121, 40, 202, 0.15), transparent), linear-gradient(to bottom, var(--background), var(--background))'
            : 'radial-gradient(ellipse at top, rgba(100, 34, 170, 0.1), transparent), linear-gradient(to bottom, var(--background), var(--background))'
        }}
      />
      
      {/* Stars */}
      {theme === 'dark' && stars.map((star, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white animate-pulse" 
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: '3s',
            animationDelay: star.animationDelay
          }}
        />
      ))}
      
      {/* Moving gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(125deg, rgba(0,0,0,0) 0%, rgba(121,40,202,0.1) 100%)' 
            : 'linear-gradient(125deg, rgba(0,0,0,0) 0%, rgba(100,34,170,0.05) 100%)',
          transform: 'translateX(-50%)',
          animation: 'moveGradient 20s infinite alternate linear'
        }}
      />
      
      {/* Add animation for moving gradient */}
      <style jsx>{`
        @keyframes moveGradient {
          0% { transform: translateX(-30%) translateY(-10%); }
          100% { transform: translateX(30%) translateY(10%); }
        }
      `}</style>
    </div>
  );
} 