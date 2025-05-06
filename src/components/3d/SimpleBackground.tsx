'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';

interface SimpleBackgroundProps {
  theme: 'dark' | 'light';
  count?: number;
}

const SimpleBackground = ({ theme, count = 500 }: SimpleBackgroundProps) => {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();

  // Add context restoration listener
  useEffect(() => {
    const handleContextLost = () => {
      console.log('WebGL context lost, attempting to restore...');
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored!');
    };
    
    gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  // Create particle positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      const scale = Math.random() * 0.5 + 0.1;
      temp.push({ position: [x, y, z], scale });
    }
    return temp;
  }, [count]);

  // Theme colors
  const colors = useMemo(() => 
    theme === 'dark' 
      ? ['#7928ca', '#00ff9d', '#0088ff'] 
      : ['#9e55e6', '#00ffbb', '#2fa8ff'],
    [theme]
  );

  // Gentle animation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.x += 0.0002;
      group.current.rotation.y += 0.0003;
    }
  });

  return (
    <group ref={group}>
      {colors.map((color, colorIndex) => (
        <Instances key={colorIndex} limit={Math.ceil(count / colors.length)}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial 
            color={color} 
            transparent
            opacity={0.7}
            toneMapped={false}
          />
          
          {particles
            .filter((_, i) => i % colors.length === colorIndex)
            .map((particle, i) => (
              <Instance 
                key={i} 
                position={particle.position as [number, number, number]} 
                scale={particle.scale} 
              />
            ))}
        </Instances>
      ))}
    </group>
  );
};

export default SimpleBackground; 