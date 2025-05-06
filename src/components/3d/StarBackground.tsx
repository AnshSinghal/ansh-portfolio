"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import { Points as PointsType } from "three";
import { useTheme } from "@/contexts/ThemeContext";

// Fixing the type issue by creating our own interface
interface StarBackgroundProps {
  density?: number;
  theme?: 'dark' | 'light';
  [key: string]: any; // Allow any other props
}

export const StarBackground = ({ density = 2000, theme = 'dark', ...props }: StarBackgroundProps) => {
  const ref = useRef<PointsType | null>(null);
  
  // Create a safer version of the random sphere that ensures no NaN values
  const [positions] = useState(() => {
    // Create random positions
    const randomPositions = new Float32Array(density * 3);
    
    // Fill with random values using a safer approach 
    for (let i = 0; i < density; i++) {
      const radius = 1.2;
      // Generate random spherical coordinates
      const theta = Math.random() * Math.PI * 2; // 0 to 2π
      const phi = Math.acos((Math.random() * 2) - 1); // 0 to π
      // Convert to cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Ensure no NaN values
      randomPositions[i * 3] = Number.isNaN(x) ? 0 : x;
      randomPositions[i * 3 + 1] = Number.isNaN(y) ? 0 : y;
      randomPositions[i * 3 + 2] = Number.isNaN(z) ? 0 : z;
    }
    
    return randomPositions;
  });

  // Even slower rotation for better stability
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  // Adjust star color based on theme
  const starColor = theme === 'dark' ? '#fff' : '#555';
  const starSize = theme === 'dark' ? 0.002 : 0.0015;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false} // Disable frustum culling to avoid some WebGL issues
        {...props}
      >
        <PointMaterial
          transparent
          color={starColor}
          size={starSize}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-auto fixed inset-0 z-[-1]">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[0.5, 0.8]} // Reduce DPR even further for stability
        gl={{ 
          powerPreference: 'low-power',
          antialias: false,
          alpha: true,
          stencil: false,
          depth: false, // Disable depth testing
          failIfMajorPerformanceCaveat: true // Don't even try if performance would be poor
        }}
        frameloop="always" // Try 'always' instead of 'demand'
      >
        <Suspense fallback={null}>
          <StarBackground theme={theme} density={1500} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default StarsCanvas; 