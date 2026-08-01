import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating glass panels
function GlassPanel({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1.5, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.4}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.9}
          opacity={0.3}
          transparent
        />
      </mesh>
    </Float>
  );
}

// Neural network nodes
function NeuralNode({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Neural network connections
function NeuralConnection({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef as any}>
      <bufferGeometry {...geometry} />
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

// Code fragments - simplified as small glowing cubes
function CodeFragment({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh position={position}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Holographic geometric shapes
function HolographicShape({ position, type, color }: { position: [number, number, number], type: 'box' | 'octahedron' | 'torus', color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const geometry = type === 'box' 
    ? new THREE.BoxGeometry(0.3, 0.3, 0.3)
    : type === 'octahedron'
    ? new THREE.OctahedronGeometry(0.2)
    : new THREE.TorusGeometry(0.15, 0.05, 16, 32);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// Circuit board pattern
function CircuitLine({ points, color }: { points: [number, number, number][], color: string }) {
  const linePoints = points.map(p => new THREE.Vector3(...p));
  const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);

  return (
    <line>
      <bufferGeometry {...geometry} />
      <lineBasicMaterial color={color} transparent opacity={0.2} linewidth={1} />
    </line>
  );
}

// Particle field
function ParticleField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random colors: cyan, blue, violet, magenta
      const colorChoice = Math.random();
      if (colorChoice < 0.25) {
        colors[i * 3] = 0;     // R
        colors[i * 3 + 1] = 0.7; // G
        colors[i * 3 + 2] = 0.85; // B (cyan)
      } else if (colorChoice < 0.5) {
        colors[i * 3] = 0;     // R
        colors[i * 3 + 1] = 0.5; // G
        colors[i * 3 + 2] = 1;   // B (blue)
      } else if (colorChoice < 0.75) {
        colors[i * 3] = 0.49;  // R
        colors[i * 3 + 1] = 0.23; // G
        colors[i * 3 + 2] = 0.93; // B (violet)
      } else {
        colors[i * 3] = 0.92;  // R
        colors[i * 3 + 1] = 0.28; // G
        colors[i * 3 + 2] = 0.6;  // B (magenta)
      }
    }
    return { pos, colors };
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions.pos} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

// Main scene
function TechScene() {
  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00b4d8" />
      <pointLight position={[-10, -10, 5]} intensity={0.3} color="#7c3aed" />
      
      {/* Glass panels - positioned toward edges */}
      <GlassPanel position={[4, 2, -3]} rotation={[0.2, 0.3, 0]} scale={1} />
      <GlassPanel position={[-4, -1, -2]} rotation={[-0.1, -0.2, 0.1]} scale={0.8} />
      <GlassPanel position={[3, -2, -4]} rotation={[0.1, 0.4, -0.1]} scale={0.7} />
      
      {/* Neural network nodes */}
      <NeuralNode position={[3, 1, -2]} color="#00b4d8" />
      <NeuralNode position={[4, 0, -1]} color="#7c3aed" />
      <NeuralNode position={[3.5, -1, -3]} color="#ec4899" />
      <NeuralNode position={[-3, 2, -2]} color="#00b4d8" />
      <NeuralNode position={[-4, 0, -1]} color="#7c3aed" />
      
      {/* Neural network connections */}
      <NeuralConnection start={[3, 1, -2]} end={[4, 0, -1]} color="#00b4d8" />
      <NeuralConnection start={[4, 0, -1]} end={[3.5, -1, -3]} color="#7c3aed" />
      <NeuralConnection start={[-3, 2, -2]} end={[-4, 0, -1]} color="#00b4d8" />
      
      {/* Code fragments */}
      <CodeFragment position={[4, 3, -2]} color="#00b4d8" />
      <CodeFragment position={[4.5, 2.5, -2]} color="#7c3aed" />
      <CodeFragment position={[-4, 3, -2]} color="#ec4899" />
      <CodeFragment position={[-3.5, 2.5, -2]} color="#00b4d8" />
      
      {/* Holographic shapes */}
      <HolographicShape position={[5, 0, -3]} type="box" color="#00b4d8" />
      <HolographicShape position={[-5, -1, -2]} type="octahedron" color="#7c3aed" />
      <HolographicShape position={[4, -2, -4]} type="torus" color="#ec4899" />
      
      {/* Circuit board lines */}
      <CircuitLine 
        points={[[2, 0, -2], [3, 0, -2], [3, 1, -2], [4, 1, -2]]} 
        color="#00b4d8" 
      />
      <CircuitLine 
        points={[[-2, 0, -2], [-3, 0, -2], [-3, -1, -2], [-4, -1, -2]]} 
        color="#7c3aed" 
      />
      
      {/* Particle field */}
      <ParticleField count={150} />
    </group>
  );
}

interface PremiumTechBackgroundProps {
  className?: string;
}

export default function PremiumTechBackground({ className = '' }: PremiumTechBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isMobile || reducedMotion) {
    return null;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="demand"
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Suspense fallback={null}>
          <TechScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
