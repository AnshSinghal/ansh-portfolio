'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  // Check if theme was previously saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      // Dark theme colors
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
      root.style.setProperty('--primary', '#7928ca');
      root.style.setProperty('--primary-light', '#9e55e6');
      root.style.setProperty('--secondary', '#00c6ff');
      root.style.setProperty('--accent', '#ff4d4d');
      root.style.setProperty('--ai-green', '#00ff9d');
      root.style.setProperty('--ml-blue', '#0088ff');
      root.style.setProperty('--card-bg', '#121212');
      root.style.setProperty('--input-bg', '#1a1a1a');
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      // Light theme colors
      root.style.setProperty('--background', '#f5f5f5');
      root.style.setProperty('--foreground', '#121212');
      root.style.setProperty('--primary', '#6422aa');
      root.style.setProperty('--primary-light', '#8333d6');
      root.style.setProperty('--secondary', '#0095ff');
      root.style.setProperty('--accent', '#e63e3e');
      root.style.setProperty('--ai-green', '#00cc7a');
      root.style.setProperty('--ml-blue', '#0066cc');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--input-bg', '#e8e8e8');
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);
  
  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 