'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

interface BackgroundEffectProps {
  theme: 'dark' | 'light';
  density?: number;
}

const BackgroundEffect = ({ theme, density = 1000 }: BackgroundEffectProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const { width, height } = useThree((state) => state.viewport);
  const { scrollYProgress } = useScroll();
  
  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create particles
  const particles = useMemo(() => {
    const particleCount = density;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    
    const colorOptions = theme === 'dark' 
      ? [new THREE.Color('#7928ca'), new THREE.Color('#00ff9d'), new THREE.Color('#0088ff')]
      : [new THREE.Color('#9e55e6'), new THREE.Color('#00ffbb'), new THREE.Color('#2fa8ff')];
    
    for (let i = 0; i < particleCount; i++) {
      // Position
      const x = (Math.random() - 0.5) * width * 3;
      const y = (Math.random() - 0.5) * height * 4;
      const z = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Color
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Size
      sizes[i] = Math.random() * 0.5 + 0.2;
      
      // Phase for animation
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    
    return geometry;
  }, [width, height, density, theme]);
  
  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const scrollEffect = scrollYProgress.get() * 0.5;
    
    // Update particle positions for animation
    const positions = pointsRef.current.geometry.attributes.position;
    const phases = pointsRef.current.geometry.attributes.phase;
    
    for (let i = 0; i < positions.count; i++) {
      const phase = phases.getX(i);
      
      // Get original position
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Calculate new position with wave effect
      positions.setX(i, x + Math.cos(time * 0.3 + phase * 10.0) * 0.02);
      positions.setY(i, y + Math.sin(time * 0.5 + phase * 10.0) * 0.02 - scrollEffect);
      positions.setZ(i, z + Math.sin(time * 0.2 + phase * 10.0) * 0.02);
    }
    
    positions.needsUpdate = true;
    
    // Subtle rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.05;
    pointsRef.current.rotation.x = Math.cos(time * 0.04) * 0.03;
  });
  
  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        size={0.5}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default BackgroundEffect; 