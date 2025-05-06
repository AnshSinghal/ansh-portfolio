'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Color, Vector3, MathUtils, Object3D, Group, Mesh, MeshPhysicalMaterial, MeshBasicMaterial } from 'three';
import { gsap } from 'gsap';

interface NeuralNetworkProps {
  isActive?: boolean;
  scale?: number;
  position?: [number, number, number];
}

interface Neuron {
  position: Vector3;
  scale: number;
  color: Color;
  layer: number;
}

interface Connection {
  startIdx: number;
  endIdx: number;
  color: Color;
}

const NeuralNetwork = ({ isActive = true, scale = 1, position = [0, 0, 0] }: NeuralNetworkProps) => {
  const networkRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create neurons at different positions
  const neurons = useMemo<Neuron[]>(() => {
    const cols = 4; // Layers
    const rows = 5; // Neurons per layer
    const temp: Neuron[] = [];
    
    // Input layer
    for (let i = 0; i < rows; i++) {
      temp.push({
        position: new Vector3(-3, (i - Math.floor(rows / 2)) * 0.7, 0),
        scale: 0.15,
        color: new Color(0x00ff9d), // AI Green
        layer: 0
      });
    }
    
    // Hidden layers
    for (let c = 1; c < cols - 1; c++) {
      for (let i = 0; i < rows; i++) {
        temp.push({
          position: new Vector3(-3 + c * 2, (i - Math.floor(rows / 2)) * 0.7, 0),
          scale: 0.12,
          color: new Color(0x7928ca), // Purple
          layer: c
        });
      }
    }
    
    // Output layer
    for (let i = 0; i < 3; i++) {
      temp.push({
        position: new Vector3(3, (i - 1) * 0.7, 0),
        scale: 0.15,
        color: new Color(0x0088ff), // ML Blue
        layer: cols - 1
      });
    }
    
    return temp;
  }, []);

  // Create connections between neurons
  const connections = useMemo<Connection[]>(() => {
    const temp: Connection[] = [];
    
    // Connect input to hidden
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        temp.push({
          startIdx: i,
          endIdx: 5 + j,
          color: new Color(0x7928ca).lerp(new Color(0x00ff9d), 0.5)
        });
      }
    }
    
    // Connect hidden to hidden
    for (let l = 1; l < 3 - 1; l++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          temp.push({
            startIdx: l * 5 + i,
            endIdx: (l + 1) * 5 + j,
            color: new Color(0x7928ca)
          });
        }
      }
    }
    
    // Connect hidden to output
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        temp.push({
          startIdx: 10 + i,
          endIdx: 15 + j,
          color: new Color(0x0088ff).lerp(new Color(0x7928ca), 0.5)
        });
      }
    }
    
    return temp;
  }, []);

  // Animation for "activating" neurons
  useFrame((state, delta) => {
    if (!networkRef.current || !isActive) return;
    
    const t = state.clock.getElapsedTime();
    const neuronMeshes = networkRef.current.children.filter(child => 
      child.userData && child.userData.type === 'neuron'
    ) as Mesh[];
    
    // Pulse effect
    neuronMeshes.forEach((mesh, i) => {
      if (i < neurons.length) {
        const scaleFactor = 1 + Math.sin(t * 2 + i * 0.3) * 0.1;
        mesh.scale.setScalar(neurons[i].scale * scaleFactor);
        
        // Random activation (glowing) effect
        if (Math.random() < 0.002) {
          const material = mesh.material as MeshPhysicalMaterial;
          if (material && material.emissiveIntensity !== undefined) {
            gsap.to(material, {
              emissiveIntensity: 2,
              duration: 0.3,
              onComplete: () => {
                gsap.to(material, {
                  emissiveIntensity: 0.2,
                  duration: 0.5
                });
              }
            });
          }
        }
      }
    });
    
    // "Data flow" through connections
    const connectionMeshes = networkRef.current.children.filter(child => 
      child.userData && child.userData.type === 'connection'
    ) as Mesh[];
    
    connectionMeshes.forEach((mesh, i) => {
      if (i < connections.length) {
        // Animate connection opacity based on sine wave
        const conn = connections[i];
        const opacity = Math.max(0.1, Math.sin((t + i * 0.02) * 2) * 0.5 + 0.5);
        const material = mesh.material as MeshBasicMaterial;
        if (material && material.opacity !== undefined) {
          material.opacity = opacity;
        }
      }
    });
    
    // Rotate entire network slightly
    if (networkRef.current) {
      networkRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group 
      ref={networkRef} 
      position={position} 
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Neurons */}
      {neurons.map((neuron, i) => (
        <mesh 
          key={`neuron-${i}`}
          position={neuron.position}
          userData={{ type: 'neuron' }}
        >
          <sphereGeometry args={[neuron.scale, 16, 16]} />
          <meshPhysicalMaterial 
            color={neuron.color}
            emissive={neuron.color}
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      
      {/* Connections */}
      {connections.map((conn, i) => {
        const start = neurons[conn.startIdx].position;
        const end = neurons[conn.endIdx].position;
        
        // Create a cylinder between the two points
        const distance = start.distanceTo(end);
        const position = start.clone().add(end).multiplyScalar(0.5);
        
        // Find rotation to align cylinder with the connection
        const direction = end.clone().sub(start).normalize();
        const axis = new Vector3(0, 1, 0).cross(direction).normalize();
        const angle = Math.acos(new Vector3(0, 1, 0).dot(direction));
        
        return (
          <mesh 
            key={`connection-${i}`}
            position={position}
            rotation={axis.length() ? [0, 0, 0] : [0, 0, 0]}
            userData={{ type: 'connection' }}
          >
            <cylinderGeometry args={[0.01, 0.01, distance, 6, 1]} />
            <meshBasicMaterial 
              color={conn.color} 
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Ambient glow */}
      <mesh position={[0, 0, -0.5]} scale={7}>
        <planeGeometry />
        <meshBasicMaterial 
          color="#7928ca"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
};

export default NeuralNetwork; 