'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  target?: string;
  download?: boolean;
  rel?: string;
  disabled?: boolean;
}

const Button = ({ 
  children, 
  href, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '',
  onClick,
  target,
  download,
  rel,
  disabled = false,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Variants for button style
  const baseStyles = "relative overflow-hidden rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-light)]",
    outline: "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
    ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
  };
  const sizeStyles = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6"
  };
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`;
  
  // Glow effect
  const glowVariants = {
    initial: { opacity: 0, scale: 0.5 },
    hover: { opacity: 0.2, scale: 1.5, transition: { duration: 0.3 } },
  };
  
  const buttonContent = (
    <>
      {/* Glow effect */}
      {variant === "primary" && (
        <motion.div
          className="absolute w-full h-full bg-[var(--ai-green)] rounded-full"
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={glowVariants}
        />
      )}
      
      {/* Content */}
      <motion.span
        className="relative z-10"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </>
  );
  
  if (href) {
    return (
      <Link 
        href={href} 
        target={target}
        rel={rel}
        className={combinedClassName}
        onClick={onClick}
      >
        <motion.span
          className="w-full h-full flex items-center justify-center"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileTap={{ scale: 0.98 }}
        >
          {buttonContent}
        </motion.span>
      </Link>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button; 