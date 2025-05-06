'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Group, Vector3, Color } from 'three';
import { Trail, Float } from '@react-three/drei';
import { gsap } from 'gsap';

interface QuantumModelProps {
  scale?: number;
  position?: [number, number, number];
  isActive?: boolean;
}

const QuantumModel = ({ 
  scale = 1, 
  position = [0, 0, 0], 
  isActive = true 
}: QuantumModelProps) => {
  const groupRef = useRef<Group>(null);
  const qubitRef = useRef<Group>(null);
  
  // Generate qubits in superposition
  const qubits = useMemo(() => {
    const temp = [];
    const count = 3;
    const radius = 1.5;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      temp.push({
        id: i,
        position: new Vector3(x, 0, z),
        orbitSpeed: MathUtils.randFloat(0.2, 0.5),
        rotationAxis: new Vector3(
          MathUtils.randFloat(-1, 1),
          MathUtils.randFloat(-1, 1),
          MathUtils.randFloat(-1, 1)
        ).normalize(),
        color: new Color(
          i === 0 ? '#00ff9d' : 
          i === 1 ? '#7928ca' : 
          '#0088ff'
        ),
      });
    }
    
    return temp;
  }, []);
  
  // Create entanglement connections between qubits
  const connections = useMemo(() => {
    const temp = [];
    for (let i = 0; i < qubits.length; i++) {
      for (let j = i + 1; j < qubits.length; j++) {
        temp.push({
          start: i,
          end: j,
          strength: MathUtils.randFloat(0.3, 1),
          phase: MathUtils.randFloat(0, Math.PI * 2),
          speed: MathUtils.randFloat(1, 2)
        });
      }
    }
    return temp;
  }, [qubits]);
  
  // Animation
  useFrame((state, delta) => {
    if (!isActive || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate entire quantum model
    groupRef.current.rotation.y = time * 0.1;
    
    // Update qubits
    if (qubitRef.current) {
      const childQubits = qubitRef.current.children;
      
      qubits.forEach((qubit, i) => {
        if (i < childQubits.length) {
          const mesh = childQubits[i];
          
          // Orbit around the center
          const orbitAngle = time * qubit.orbitSpeed;
          const newX = Math.cos(orbitAngle) * qubit.position.x - Math.sin(orbitAngle) * qubit.position.z;
          const newZ = Math.sin(orbitAngle) * qubit.position.x + Math.cos(orbitAngle) * qubit.position.z;
          
          mesh.position.set(newX, qubit.position.y, newZ);
          
          // Spin on its own axis
          mesh.rotation.x += delta * 0.5;
          mesh.rotation.y += delta * 0.8;
          
          // Pulse size slightly
          const pulse = 1 + Math.sin(time * 2 + i) * 0.1;
          mesh.scale.setScalar(pulse);
          
          // Random "quantum fluctuation" effect
          if (Math.random() < 0.01) {
            gsap.to(mesh.position, {
              y: MathUtils.randFloat(-0.2, 0.2),
              duration: 0.5,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1
            });
          }
        }
      });
    }
  });
  
  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Core sphere - represents quantum processor */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial 
          color="#7928ca"
          roughness={0.1}
          metalness={0.8}
          emissive="#7928ca"
          emissiveIntensity={0.5}
          opacity={0.7}
          transparent
        />
      </mesh>
      
      {/* Qubits in superposition */}
      <group ref={qubitRef}>
        {qubits.map((qubit, i) => (
          <group key={i} position={[qubit.position.x, qubit.position.y, qubit.position.z]}>
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
              <Trail 
                width={0.3} 
                length={4} 
                color={qubit.color.getStyle()} 
                attenuation={(width) => width * width}
              >
                <mesh>
                  <dodecahedronGeometry args={[0.2, 0]} />
                  <meshPhysicalMaterial 
                    color={qubit.color}
                    roughness={0.3}
                    metalness={0.8}
                    emissive={qubit.color}
                    emissiveIntensity={0.5}
                    opacity={0.9}
                    transparent
                  />
                </mesh>
              </Trail>
            </Float>
          </group>
        ))}
      </group>
      
      {/* Quantum entanglement connections */}
      {connections.map((conn, i) => {
        const startQubit = qubits[conn.start];
        const endQubit = qubits[conn.end];
        
        return (
          <mesh key={i}>
            <meshBasicMaterial 
              color={startQubit.color.clone().lerp(endQubit.color, 0.5)} 
              transparent 
              opacity={0.2} 
              depthWrite={false}
            />
          </mesh>
        );
      })}
      
      {/* Ambient glow sphere */}
      <mesh scale={[3, 3, 3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#7928ca" 
          transparent 
          opacity={0.05} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default QuantumModel; 