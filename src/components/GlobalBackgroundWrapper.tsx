'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import CSSBackgroundFallback from './CSSBackgroundFallback';
import { useTheme } from '@/contexts/ThemeContext';

// Use dynamic import with SSR disabled for the 3D background
const NeuralNetworkBackground = dynamic(
  () => import("@/components/3d/NeuralNetworkBackground"),
  { ssr: false }
);

export default function GlobalBackgroundWrapper() {
  const { theme } = useTheme();
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isWebGLCapable, setIsWebGLCapable] = useState(true);

  // Check for WebGL support and set up error handling
  useEffect(() => {
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

    const handleContextLost = () => {
      console.warn('WebGL context lost, using fallback');
      setHasWebGLError(true);
    };

    const handleError = (e: ErrorEvent) => {
      if (
        e.message?.includes('WebGL') ||
        e.message?.includes('THREE') ||
        e.message?.includes('shader') ||
        e.message?.includes('NaN')
      ) {
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

  if (hasWebGLError || !isWebGLCapable) {
    return <CSSBackgroundFallback />;
  }

  return <NeuralNetworkBackground theme={theme} nodeCount={40} />;
}