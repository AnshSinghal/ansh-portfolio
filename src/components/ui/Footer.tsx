'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaBrain } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0a0a0a] border-t border-[var(--primary)]/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and info */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="#home" className="flex items-center gap-2 justify-center md:justify-start">
              <FaBrain className="text-[var(--ai-green)] text-2xl" />
              <span className="text-xl font-bold text-gradient">Ansh Singhal</span>
            </Link>
            <p className="mt-2 text-sm text-[var(--foreground)]/70 max-w-md">
              AI/ML Engineer crafting intelligent solutions and pushing the boundaries of artificial intelligence.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-8 mb-8 md:mb-0">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="#home" 
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#about" 
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#projects" 
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#contact" 
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Contact</h3>
              <ul className="space-y-2">
                <li className="text-[var(--foreground)]/70">
                  ansh@example.com
                </li>
                <li className="text-[var(--foreground)]/70">
                  +91 98765 43210
                </li>
                <li className="text-[var(--foreground)]/70">
                  India
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--foreground)]/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[var(--foreground)]/70 mb-4 md:mb-0">
            © {currentYear} Ansh Singhal. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <motion.a 
              href="https://github.com/anshsinghal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--foreground)]/70 hover:text-[var(--ai-green)] transition-colors"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/anshsinghal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--foreground)]/70 hover:text-[var(--ml-blue)] transition-colors"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a 
              href="https://twitter.com/anshsinghal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <FaTwitter size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 