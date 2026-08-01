import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    return pos;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00b4d8"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
}

export default function ParticleBackground({ className = '', particleCount = 80 }: ParticleBackgroundProps) {
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

  const adjustedCount = isMobile ? particleCount / 2 : particleCount;

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <ParticleField count={adjustedCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
