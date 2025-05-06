'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBrain, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? `${theme === 'dark' ? 'bg-[#0a0a0a]/80' : 'bg-[#f5f5f5]/80'} backdrop-blur-md py-2` 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home" className="flex items-center gap-2">
          <FaBrain className="text-[var(--ai-green)] text-2xl" />
          <span className="text-xl font-bold text-gradient">Ansh Singhal</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Links & Theme Toggle */}
        <div className="hidden md:flex gap-4 items-center">
          <ThemeToggle />
          <a 
            href="https://github.com/anshsinghal" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[var(--ai-green)] transition-colors"
          >
            <FaGithub size={22} />
          </a>
          <a 
            href="https://linkedin.com/in/anshsinghal" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[var(--ml-blue)] transition-colors"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="text-[var(--foreground)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1">
              <span className={`block h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className={`md:hidden absolute top-full left-0 w-full ${
            theme === 'dark' 
              ? 'bg-[#0a0a0a]/95' 
              : 'bg-[#f5f5f5]/95'
          } backdrop-blur-md py-4`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="flex gap-4 mt-2">
              <a 
                href="https://github.com/anshsinghal" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--ai-green)] transition-colors"
              >
                <FaGithub size={22} />
              </a>
              <a 
                href="https://linkedin.com/in/anshsinghal" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--ml-blue)] transition-colors"
              >
                <FaLinkedin size={22} />
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 