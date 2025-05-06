'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaArrowDown } from 'react-icons/fa';
import Scene from '@/components/3d/Scene';
import Button from '@/components/ui/Button';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "AI/ML Engineer";
  const typingSpeed = 150;
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [typedText, fullText]);

  // Text animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 -z-10">
        <Scene fullScreen />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between z-10">
        {/* Text Content */}
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-[var(--ai-green)] font-semibold text-xl mb-2"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.h2>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gradient glow"
            variants={itemVariants}
          >
            Ansh Singhal
          </motion.h1>
          
          <motion.div 
            className="flex items-center justify-center lg:justify-start text-2xl sm:text-3xl font-medium mb-6"
            variants={itemVariants}
          >
            <span className="text-[var(--foreground)] mr-2">I'm a</span>
            <span className="text-[var(--primary)]">
              {typedText}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-5 bg-[var(--primary)] ml-1 animate-pulse"></span>
              )}
            </span>
          </motion.div>
          
          <motion.p 
            className="text-[var(--foreground)]/80 mb-8 max-w-lg mx-auto lg:mx-0"
            variants={itemVariants}
          >
            Specializing in AI/ML technologies, building intelligent systems, and creating data-driven solutions. I transform complex problems into innovative AI applications.
          </motion.p>
          
          <motion.div 
            className="flex gap-4 flex-wrap justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Button href="#projects">
              <FaCode className="mr-2" /> View My Work
            </Button>
            <Button href="#contact" variant="outline">
              Get In Touch
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center lg:justify-start mt-8 gap-4"
            variants={itemVariants}
          >
            <a 
              href="https://github.com/anshsinghal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:text-[var(--ai-green)] transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/anshsinghal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:text-[var(--ml-blue)] transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <a href="#about" className="flex flex-col items-center">
          <span className="mb-2 text-sm">Scroll Down</span>
          <FaArrowDown className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero; 