import { useRef, useState, useEffect } from 'react';

interface MagneticFloatOptions {
  floatStrength?: number;
  magneticStrength?: number;
  parallaxStrength?: number;
  glowIntensity?: number;
}

export function useMagneticFloat(options: MagneticFloatOptions = {}) {
  const {
    floatStrength = 10,
    magneticStrength = 0.3,
    parallaxStrength = 0.05,
    glowIntensity = 0.6,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Floating animation
    let floatTime = 0;
    const floatAnimation = () => {
      floatTime += 0.02;
      setFloatOffset({
        x: Math.sin(floatTime) * floatStrength,
        y: Math.cos(floatTime * 0.7) * floatStrength,
      });
      requestAnimationFrame(floatAnimation);
    };
    floatAnimation();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = 300;

      // Magnetic attraction
      if (distance < maxDistance) {
        const strength = (1 - distance / maxDistance) * magneticStrength;
        setMagneticOffset({
          x: mouseX * strength,
          y: mouseY * strength,
        });
        
        // Glow follows cursor
        const glowX = ((e.clientX - rect.left) / rect.width) * 100;
        const glowY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlowPosition({ x: glowX, y: glowY });
        setIsHovering(true);
      } else {
        setMagneticOffset({ x: 0, y: 0 });
        setIsHovering(false);
      }

      // Parallax depth
      const parallaxX = (e.clientX / window.innerWidth - 0.5) * parallaxStrength * 100;
      const parallaxY = (e.clientY / window.innerHeight - 0.5) * parallaxStrength * 100;
      
      element.style.transform = `
        translate(${parallaxX}px, ${parallaxY}px)
        translate(${floatOffset.x + magneticOffset.x}px, ${floatOffset.y + magneticOffset.y}px)
      `;
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floatStrength, magneticStrength, parallaxStrength]);

  return {
    ref,
    floatOffset,
    magneticOffset,
    glowPosition,
    isHovering,
    glowIntensity,
  };
}
