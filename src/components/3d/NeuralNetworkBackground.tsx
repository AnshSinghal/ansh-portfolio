'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkBackgroundProps {
  theme: 'dark' | 'light';
  nodeCount?: number;
}

const NeuralNetworkBackground = ({ theme, nodeCount = 30 }: NeuralNetworkBackgroundProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePositionRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const frameCountRef = useRef(0);
  const { camera } = useThree();
  
  // Track which frame we're on to reduce calculations
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  // Create a fixed set of nodes in a 2D plane (much simpler)
  const nodes = useMemo(() => {
    const temp = [];
    const gridSize = Math.ceil(Math.sqrt(nodeCount));
    const spacing = 5;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (temp.length >= nodeCount) break;
        
        // Position in grid with very slight random offset
        const x = (i - gridSize / 2) * spacing + (Math.random() - 0.5) * 1;
        const y = (j - gridSize / 2) * spacing + (Math.random() - 0.5) * 1;
        
        // Keep all nodes on the same z-plane for better performance
        const z = 0;
        
        temp.push(new THREE.Vector3(x, y, z));
      }
    }
    
    return temp;
  }, [nodeCount]);
  
  // Create pre-defined connections for better performance
  const staticConnections = useMemo(() => {
    const connections = [];
    const connectionDistance = 7;
    
    for (let i = 0; i < nodes.length; i++) {
      // Only create a fixed number of connections per node
      let count = 0;
      for (let j = i + 1; j < nodes.length && count < 2; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < connectionDistance) {
          connections.push(i, j);
          count++;
        }
      }
    }
    
    return connections;
  }, [nodes]);
  
  // Create static geometries for both nodes and connections
  const { nodesGeometry, staticLinesGeometry } = useMemo(() => {
    // Create points geometry
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    
    for (let i = 0; i < nodes.length; i++) {
      positions[i * 3] = nodes[i].x;
      positions[i * 3 + 1] = nodes[i].y;
      positions[i * 3 + 2] = nodes[i].z;
    }
    
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create static lines geometry
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(staticConnections.length * 3);
    
    for (let i = 0; i < staticConnections.length / 2; i++) {
      const startIdx = staticConnections[i * 2];
      const endIdx = staticConnections[i * 2 + 1];
      
      linePositions[i * 6] = nodes[startIdx].x;
      linePositions[i * 6 + 1] = nodes[startIdx].y;
      linePositions[i * 6 + 2] = nodes[startIdx].z;
      
      linePositions[i * 6 + 3] = nodes[endIdx].x;
      linePositions[i * 6 + 4] = nodes[endIdx].y;
      linePositions[i * 6 + 5] = nodes[endIdx].z;
    }
    
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    return { nodesGeometry: pointsGeometry, staticLinesGeometry: linesGeometry };
  }, [nodes, staticConnections]);
  
  // Materials based on theme
  const nodesMaterial = useMemo(() => {
    const color = theme === 'dark' ? '#7928ca' : '#6422aa';
    return new THREE.PointsMaterial({
      size: 0.3,
      sizeAttenuation: true,
      color,
      transparent: true,
      opacity: 0.8,
    });
  }, [theme]);
  
  const linesMaterial = useMemo(() => {
    const color = theme === 'dark' ? '#7928ca' : '#6422aa';
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.15,
    });
  }, [theme]);
  
  const activeMaterial = useMemo(() => {
    const color = theme === 'dark' ? '#00ff9d' : '#00cc7a';
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.4,
    });
  }, [theme]);
  
  const dynamicLinesGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePositionRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      setIsHovering(true);
      
      // Force an update on mouse move
      setShouldUpdate(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Animation with reduced frequency
  useFrame(() => {
    const pointsMesh = pointsRef.current;
    if (!pointsMesh) return;
    
    // Only update every 10 frames if not actively hovering
    frameCountRef.current += 1;
    const shouldProcessThisFrame = isHovering || 
                                   frameCountRef.current % 10 === 0 || 
                                   shouldUpdate;
    
    if (shouldProcessThisFrame) {
      // Very gentle rotation
      pointsMesh.rotation.y = Math.sin(Date.now() * 0.0001) * 0.05;
      
      // Only update connections on hover
      if (isHovering) {
        // Calculate mouse world position
        const mouseWorldPos = new THREE.Vector3(
          mousePositionRef.current.x, 
          mousePositionRef.current.y, 
          0
        ).unproject(camera);
        
        // Calculate dynamic connections
        const positions = [];
        const mouseInfluenceRadius = 10;
        const maxConnections = 5; // Limit total connections
        let connectionCount = 0;
        
        // Find nodes close to mouse
        for (let i = 0; i < nodes.length && connectionCount < maxConnections; i++) {
          const node = nodes[i];
          const distToMouse = mouseWorldPos.distanceTo(node);
          
          if (distToMouse < mouseInfluenceRadius) {
            // Connect to 1-2 other nodes
            for (let j = 0; j < nodes.length && connectionCount < maxConnections; j++) {
              if (i !== j) {
                positions.push(node.x, node.y, node.z);
                positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
                connectionCount++;
              }
            }
          }
        }
        
        // Update dynamic connections
        dynamicLinesGeometry.setAttribute(
          'position', 
          new THREE.Float32BufferAttribute(positions, 3)
        );
      }
      
      setShouldUpdate(false);
    }
  });
  
  return (
    <group>
      {/* Static nodes */}
      <points ref={pointsRef} geometry={nodesGeometry} material={nodesMaterial} />
      
      {/* Static connections */}
      <lineSegments geometry={staticLinesGeometry} material={linesMaterial} />
      
      {/* Dynamic connections that appear on hover */}
      {isHovering && (
        <lineSegments ref={linesRef} geometry={dynamicLinesGeometry} material={activeMaterial} />
      )}
    </group>
  );
};

export default NeuralNetworkBackground; 