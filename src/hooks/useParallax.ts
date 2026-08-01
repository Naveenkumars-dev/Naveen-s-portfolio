import { useEffect, useState } from "react";

export function useParallax(speed = 0.05) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      setOffset({
        x: (e.clientX - centerX) * speed,
        y: (e.clientY - centerY) * speed,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [speed]);

  return offset;
}
