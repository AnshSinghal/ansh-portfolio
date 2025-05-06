'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useGLTF, 
  ContactShadows, 
  Stars 
} from '@react-three/drei';
import { Color, Group } from 'three';
import { useInView } from 'framer-motion';

// Import our 3D models
import NeuralNetwork from './NeuralNetwork';
import AiBrain from './AiBrain';

// Loading component
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-[var(--ai-green)] text-xl">Loading 3D scene...</div>
    </div>
  );
};

// Particles as background decoration
const Particles = ({ count = 2000 }) => {
  const mesh = useRef<Group>(null);
  
  // Generate randomized particle positions
  const particlePositions = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ] as [number, number, number],
    size: Math.random() * 0.2 + 0.05,
    color: Math.random() > 0.6 
      ? new Color(0x00ff9d) // AI Green
      : Math.random() > 0.3 
        ? new Color(0x0088ff) // ML Blue
        : new Color(0x7928ca) // Purple
  }));
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t) * 0.02;
      mesh.current.rotation.y = Math.cos(t) * 0.02;
      mesh.current.rotation.z = Math.sin(t) * 0.02;
    }
  });
  
  return (
    <group ref={mesh}>
      {particlePositions.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Lights for the scene
const SceneLights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={0.7} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />
      <pointLight position={[0, -5, 5]} color="#0088ff" intensity={0.3} />
      <pointLight position={[0, 5, 0]} color="#00ff9d" intensity={0.3} />
    </>
  );
};

// Main Scene component
const Scene = ({ fullScreen = false, showBrain = true, showNetwork = true }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${
        fullScreen ? 'w-full h-screen' : 'w-full h-[50vh] md:h-[60vh]'
      }`}
    >
      <Suspense fallback={<Loader />}>
        <Canvas shadows dpr={[1, 2]} style={{ background: 'transparent' }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
          <SceneLights />
          
          {/* Show Neural Network model */}
          {showNetwork && isInView && (
            <NeuralNetwork position={[3, 0, 0]} scale={0.8} isActive={isInView} />
          )}
          
          {/* Show Brain model */}
          {showBrain && isInView && (
            <AiBrain position={[-3, 0, 0]} scale={1.2} />
          )}
          
          {/* Background particles */}
          <Particles count={500} />
          
          {/* Environment and stars */}
          <Stars radius={100} depth={50} count={1000} factor={4} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.2}
            scale={15}
            blur={2}
            resolution={256}
            color="#000000"
          />
          
          {/* Controls for full screen mode */}
          {fullScreen && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              minPolarAngle={Math.PI / 3} 
              maxPolarAngle={Math.PI / 1.5} 
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene; 