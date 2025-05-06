'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  PerformanceMonitor,
  AdaptiveDpr,
  Preload,
  Sky
} from '@react-three/drei';
import { useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// Import our 3D models
import NeuralNetwork from './NeuralNetwork';
import AiBrain from './AiBrain';
import QuantumModel from './QuantumModel';
import BackgroundEffect from './BackgroundEffect';

// Loading component
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-[var(--primary)] text-xl">
        Loading 3D scene...
      </div>
    </div>
  );
};

// Lights for the scene
const SceneLights = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={theme === 'dark' ? 0.7 : 0.9} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />
      <pointLight position={[0, -5, 5]} color="#0088ff" intensity={0.3} />
      <pointLight position={[0, 5, 0]} color="#00ff9d" intensity={0.3} />
    </>
  );
};

// Camera setup with controls
const CameraSetup = () => {
  const { camera } = useThree();
  const { theme } = useTheme();
  
  useEffect(() => {
    // Update camera on theme change
    if (theme === 'dark') {
      camera.far = 1000;
    } else {
      camera.far = 2000; 
    }
    camera.updateProjectionMatrix();
  }, [camera, theme]);
  
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
  );
};

// Main Scene component
interface MainSceneProps {
  fullScreen?: boolean;
  showBrain?: boolean;
  showNetwork?: boolean;
  showQuantum?: boolean;
  lowPerformance?: boolean;
  interactive?: boolean;
}

const MainScene = ({ 
  fullScreen = false, 
  showBrain = true, 
  showNetwork = false, 
  showQuantum = false,
  lowPerformance = false,
  interactive = true
}: MainSceneProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();
  
  // State to track reduced quality for performance
  const [dpr, setDpr] = useState(1.5);
  
  const handlePerformanceChange = (factor: number) => {
    // Adjust quality based on performance
    if (factor < 0.7) {
      setDpr(1);
    } else if (factor < 0.9) {
      setDpr(1.5);
    } else {
      setDpr(2);
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${
        fullScreen ? 'w-full h-screen' : 'w-full h-[50vh] md:h-[60vh] lg:h-[80vh]'
      }`}
    >
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={lowPerformance ? 1 : dpr}
          gl={{ 
            antialias: !lowPerformance,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          style={{ 
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1
          }}
        >
          <PerformanceMonitor onIncline={() => {}} onDecline={() => handlePerformanceChange(0.7)} />
          <AdaptiveDpr pixelated />
          <CameraSetup />
          <fog 
            attach="fog" 
            args={[theme === 'dark' ? '#0a0a0a' : '#f5f5f5', 8, 30]} 
          />
          <SceneLights />
          
          {/* Interactive background */}
          {isInView && !lowPerformance && (
            <BackgroundEffect 
              theme={theme} 
              density={fullScreen ? 1000 : 500} 
            />
          )}
          
          {/* Sky only in light mode */}
          {theme === 'light' && (
            <Sky
              distance={45000}
              sunPosition={[0, 1, 0]}
              inclination={0}
              azimuth={0.25}
              rayleigh={1}
              turbidity={10}
              mieCoefficient={0.005}
              mieDirectionalG={0.8}
            />
          )}
          
          {/* Main 3D models */}
          {showBrain && isInView && (
            <AiBrain 
              position={[-3, 0, 0]} 
              scale={1.2} 
              wireframe={theme === 'light'} 
            />
          )}
          
          {showNetwork && isInView && (
            <NeuralNetwork 
              position={[3, 0, 0]} 
              scale={0.8} 
              isActive={isInView} 
            />
          )}
          
          {showQuantum && isInView && (
            <QuantumModel 
              position={[0, 0, 0]} 
              scale={0.8} 
              isActive={isInView} 
            />
          )}
          
          <Environment preset={theme === 'dark' ? 'city' : 'sunset'} />
          
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default MainScene; 