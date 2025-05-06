'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Color, MathUtils, Group } from 'three';

interface AiBrainProps {
  scale?: number;
  position?: [number, number, number];
  wireframe?: boolean;
}

const AiBrain = ({ scale = 1, position = [0, 0, 0], wireframe = false }: AiBrainProps) => {
  const brainRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animate brain on hover and over time
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (brainRef.current) {
      // Subtle floating rotation
      brainRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
      brainRef.current.rotation.z = Math.cos(t * 0.1) * 0.025;
      
      // Pulse effect on hover
      if (hovered) {
        const pulseScale = 1 + Math.sin(t * 5) * 0.03;
        brainRef.current.scale.set(
          scale * pulseScale,
          scale * pulseScale,
          scale * pulseScale
        );
      }
    }
  });

  // Colors
  const primaryColor = new Color(0x7928ca); // Purple
  const accentColor = new Color(0x00ff9d);  // AI Green
  const hoverColor = new Color(0x0088ff);   // ML Blue
  
  return (
    <Float
      speed={1.5} // Animation speed
      rotationIntensity={0.2} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <group
        ref={brainRef}
        position={position}
        scale={[scale, scale, scale]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main brain shape */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={hovered ? hoverColor : primaryColor}
            wireframe={wireframe}
            roughness={0.3}
            metalness={0.8}
            distort={0.4} // Distortion level
            speed={2.5} // Distortion speed
          />
        </mesh>
        
        {/* Brain detail layers */}
        <mesh scale={1.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={accentColor}
            wireframe={true}
            transparent
            opacity={0.1}
          />
        </mesh>
        
        {/* Connections */}
        <mesh scale={1.3}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={primaryColor}
            wireframe={true}
            transparent
            opacity={0.05}
          />
        </mesh>
        
        {/* Ambient glow */}
        <pointLight
          position={[0, 0, 0]}
          color={hovered ? hoverColor : accentColor}
          intensity={2}
          distance={1.5}
        />
      </group>
    </Float>
  );
};

export default AiBrain; 