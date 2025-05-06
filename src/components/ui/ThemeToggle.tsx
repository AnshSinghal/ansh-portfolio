'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      className={`relative p-2 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden ${
        theme === 'dark' 
          ? 'bg-[var(--card-bg)] text-[var(--ai-green)]' 
          : 'bg-[var(--card-bg)] text-[var(--ml-blue)]'
      }`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ 
        backgroundColor: theme === 'dark' 
          ? 'rgba(0, 255, 157, 0.1)' 
          : 'rgba(0, 136, 255, 0.1)' 
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 0 : 180,
          scale: 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {theme === 'dark' ? (
          <FaMoon size={18} />
        ) : (
          <FaSun size={18} />
        )}
      </motion.div>
      
      {/* Sun/Moon Rays animation */}
      {theme === 'dark' ? (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-[var(--ai-green)] opacity-50"
              style={{
                height: '2px',
                transformOrigin: 'center',
                rotate: `${i * 45}deg`,
                translateX: '14px'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 3,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-[var(--ml-blue)] opacity-50"
              style={{
                height: '3px',
                transformOrigin: 'center',
                rotate: `${i * 90}deg`,
                borderRadius: '2px',
                width: '6px'
              }}
              initial={{ translateX: 0 }}
              animate={{ translateX: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 3,
                delay: i * 0.4,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle; 