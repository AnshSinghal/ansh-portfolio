'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import NeuralNetworkBackground from './NeuralNetworkBackground';

// Interactive camera that follows mouse very subtly
const InteractiveCamera = () => {
  const { camera } = useThree();
  const [mousePosition] = useState(new THREE.Vector2(0, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);
  
  useFrame(() => {
    // Even more subtle camera movement for better performance
    targetPosition.current.x = mousePosition.x * 0.3;
    targetPosition.current.y = mousePosition.y * 0.3;
    
    camera.position.x += (targetPosition.current.x - camera.position.x) * 0.01;
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.01;
    
    // Look at center
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Simple lighting setup
const BasicLighting = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
};

// Error fallback component
const ErrorFallback = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  
  return (
    <Html center>
      <div style={{
        color: textColor,
        textAlign: 'center',
        width: '100%',
        padding: '20px'
      }}>
        <p>Had trouble rendering interactive background</p>
      </div>
    </Html>
  );
};

interface GlobalBackgroundProps {
  children?: React.ReactNode;
}

const GlobalBackground = ({ children }: GlobalBackgroundProps) => {
  const { theme } = useTheme();
  const [dpr, setDpr] = useState(0.8); // Start with lower DPR by default
  const [isLowPerformance, setIsLowPerformance] = useState(true); // Assume low performance by default
  const [hasError, setHasError] = useState(false);
  
  // Handle performance mode changes
  const handlePerformanceChange = ({ factor }: { factor: number }) => {
    if (factor < 0.5) {
      setDpr(0.6);
      setIsLowPerformance(true);
    } else if (factor < 0.8) {
      setDpr(0.8);
      setIsLowPerformance(true);
    } else {
      setDpr(1.0); // Reduced from 1.5 to 1.0 for better performance
      setIsLowPerformance(false);
    }
  };
  
  // Handle WebGL errors
  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };
    
    window.addEventListener('webglcontextlost', handleError);
    window.addEventListener('error', (e) => {
      if (e.message?.includes('WebGL') || e.message?.includes('shader')) {
        handleError();
      }
    });
    
    return () => {
      window.removeEventListener('webglcontextlost', handleError);
      window.removeEventListener('error', handleError as any);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      {!hasError ? (
        <Canvas
          dpr={dpr}
          gl={{ 
            antialias: false, // Disable antialiasing for performance
            powerPreference: 'low-power', // Changed from 'default' to 'low-power'
            alpha: true,
            preserveDrawingBuffer: false, // Changed to false for performance
            failIfMajorPerformanceCaveat: false
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
          camera={{ position: [0, 0, 30], fov: 60 }}
          onError={() => setHasError(true)}
          frameloop="demand" // Changed to demand for better performance
        >
          <PerformanceMonitor 
            onDecline={handlePerformanceChange} 
            bounds={(refreshrate) => [0, 0.9]} // Corrected bounds format
            onIncline={({ factor }) => {
              if (factor > 0.9 && dpr < 1.0) {
                setDpr(Math.min(dpr + 0.1, 1.0));
              }
            }}
          />
          <InteractiveCamera />
          <BasicLighting />
          
          {/* Neural Network Background - using our highly optimized component */}
          <NeuralNetworkBackground 
            theme={theme} 
            nodeCount={isLowPerformance ? 20 : 30} // Further reduced node count
          />
          
          {children}
          
          {hasError && <ErrorFallback />}
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-[var(--background)] to-[var(--primary)]/10"></div>
      )}
    </div>
  );
};

export default GlobalBackground; 