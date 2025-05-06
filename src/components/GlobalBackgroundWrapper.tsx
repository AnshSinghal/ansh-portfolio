'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import StaticBackgroundFallback from './StaticBackgroundFallback';

// Use dynamic import with SSR disabled for the 3D background
const StarBackground = dynamic(
  () => import("@/components/3d/StarBackground"),
  { ssr: false }
);

export default function GlobalBackgroundWrapper() {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isWebGLCapable, setIsWebGLCapable] = useState(true);
  
  // Check for WebGL support and set up error handling
  useEffect(() => {
    // Check initial WebGL support
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setIsWebGLCapable(hasWebGL);
    } catch (e) {
      console.warn('WebGL not supported, using fallback');
      setIsWebGLCapable(false);
    }
    
    // Listen for WebGL errors
    const handleContextLost = () => {
      console.warn('WebGL context lost, using fallback');
      setHasWebGLError(true);
    };
    
    const handleError = (e: ErrorEvent) => {
      if (e.message?.includes('WebGL') || 
          e.message?.includes('THREE') || 
          e.message?.includes('shader') || 
          e.message?.includes('NaN')) {
        console.warn('WebGL error detected, using fallback', e.message);
        setHasWebGLError(true);
      }
    };
    
    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  // Use CSS fallback if WebGL is not supported or has errors
  if (hasWebGLError || !isWebGLCapable) {
    return <StaticBackgroundFallback />;
  }
  
  // Otherwise try the WebGL background
  return <StarBackground />;
} 