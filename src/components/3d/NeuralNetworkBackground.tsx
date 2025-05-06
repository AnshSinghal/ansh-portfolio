'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '@/contexts/ThemeContext';
import { Preload } from '@react-three/drei';

interface NeuralNetworkBackgroundProps {
  theme: 'dark' | 'light';
  nodeCount?: number;
}

const InteractiveNeuralNetwork = ({ theme, nodeCount = 50 }: NeuralNetworkBackgroundProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePositionRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const frameCountRef = useRef(0);
  const { camera, size } = useThree();
  const [isHovering, setIsHovering] = useState(false);

  // Calculate viewport bounds
  const aspect = size.width / size.height;
  const frustumHeight = 10;
  const frustumWidth = frustumHeight * aspect;

  // Create nodes with random positions within viewport
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * frustumWidth;
      const y = (Math.random() - 0.5) * frustumHeight;
      // Keep nodes mostly in a 2D plane for better performance
      const z = (Math.random() - 0.5) * 2;
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [nodeCount, frustumWidth, frustumHeight]);

  // Create node geometry
  const nodesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    const scales = new Float32Array(nodes.length);
    const colors = new Float32Array(nodes.length * 3);

    const baseColor = theme === 'dark' ? new THREE.Color('#7928ca') : new THREE.Color('#6422aa');

    for (let i = 0; i < nodes.length; i++) {
      positions[i * 3] = nodes[i].x;
      positions[i * 3 + 1] = nodes[i].y;
      positions[i * 3 + 2] = nodes[i].z;
      scales[i] = 0.3;
      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [nodes, theme]);

  // Create dynamic lines geometry
  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  // Materials
  const nodesMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.3,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
  }, []);

  const linesMaterial = useMemo(() => {
    const color = theme === 'dark' ? '#00ff9d' : '#00cc7a';
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
  }, [theme]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePositionRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      setIsHovering(true);
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

  // Animation loop with frame skipping for better performance
  useFrame(({ clock }) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Frame skipping for better performance
    frameCountRef.current += 1;
    const shouldUpdate = isHovering || frameCountRef.current % 5 === 0;
    if (!shouldUpdate) return;
    
    const time = clock.getElapsedTime();
    const positions = nodesGeometry.attributes.position;
    const scales = nodesGeometry.attributes.scale;
    const colors = nodesGeometry.attributes.color;

    // Calculate mouse world position
    const mouseWorldPos = new THREE.Vector3(
      mousePositionRef.current.x * (frustumWidth / 2),
      mousePositionRef.current.y * (frustumHeight / 2),
      0
    );

    // Update nodes and connections
    const linePositions: number[] = [];
    const connectionRadius = 3;
    const maxConnectionsPerNode = 3;
    let totalConnections = 0;
    const maxTotalConnections = 30; // Limit total number of connections for performance

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const distToMouse = mouseWorldPos.distanceTo(node);

      // Animate node scale and color based on mouse proximity
      const scaleFactor = isHovering && distToMouse < connectionRadius
        ? 0.5 + Math.sin(time * 3 + i) * 0.1
        : 0.3;
      scales.setX(i, scaleFactor);

      const color = isHovering && distToMouse < connectionRadius
        ? new THREE.Color('#00ff9d')
        : theme === 'dark' ? new THREE.Color('#7928ca') : new THREE.Color('#6422aa');
      colors.setXYZ(i, color.r, color.g, color.b);

      // Create connections for nearby nodes
      if (isHovering && distToMouse < connectionRadius && totalConnections < maxTotalConnections) {
        let connections = 0;
        for (let j = 0; j < nodes.length && connections < maxConnectionsPerNode && totalConnections < maxTotalConnections; j++) {
          if (i !== j) {
            const otherNode = nodes[j];
            const dist = node.distanceTo(otherNode);
            if (dist < connectionRadius) {
              linePositions.push(node.x, node.y, node.z);
              linePositions.push(otherNode.x, otherNode.y, otherNode.z);
              connections++;
              totalConnections++;
            }
          }
        }
      }
    }

    // Update lines geometry
    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    positions.needsUpdate = true;
    scales.needsUpdate = true;
    colors.needsUpdate = true;

    // Very subtle rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.03;
    linesRef.current.rotation.y = Math.sin(time * 0.1) * 0.03;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={nodesGeometry} material={nodesMaterial} />
      <lineSegments ref={linesRef} geometry={linesGeometry} material={linesMaterial} />
    </group>
  );
};

const NeuralNetworkBackground = ({ theme, nodeCount }: NeuralNetworkBackgroundProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[0.7, 1.0]} // Limit device pixel ratio for better performance
        gl={{
          antialias: false,
          powerPreference: 'low-power',
          alpha: true,
          depth: true,
          stencil: false,
          preserveDrawingBuffer: false,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        frameloop="demand"
      >
        <InteractiveNeuralNetwork theme={theme} nodeCount={nodeCount} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkBackground;