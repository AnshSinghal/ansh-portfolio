'use client';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Blog from '@/sections/Blog';
import Contact from '@/sections/Contact';
import Footer from '@/components/ui/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useEffect } from 'react';

export default function Home() {
  // Add a simple WebGL context loss handler
  useEffect(() => {
    const handleWebGLContextLost = () => {
      console.warn('WebGL context lost - falling back to CSS gradient');
    };
    
    window.addEventListener('webglcontextlost', handleWebGLContextLost);
    return () => window.removeEventListener('webglcontextlost', handleWebGLContextLost);
  }, []);
  
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] relative">
      {/* Static fallback background gradient - always visible as base layer */}
      <div className="fixed inset-0 z-[-2] bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--primary)]/5"></div>
      
      {/* Theme Toggle Button - Fixed position */}
      <div className="fixed top-20 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
