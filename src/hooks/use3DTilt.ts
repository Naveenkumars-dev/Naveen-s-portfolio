import { useState, useRef, useEffect, type RefObject } from 'react';

interface TiltOptions {
  max: number;
  perspective: number;
  scale: number;
  speed: number;
}

export function use3DTilt(options: Partial<TiltOptions> = {}): {
  ref: RefObject<HTMLDivElement | null>;
  style: React.CSSProperties;
  reset: () => void;
} {
  const {
    max = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 1000,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) * max;

    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
  };

  const reset = () => {
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
  };

  // Attach event listeners when component mounts
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove as any);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove as any);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [max, perspective, scale]);

  return {
    ref,
    style: {
      transform,
      transition: `transform ${speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
    },
    reset,
  };
}