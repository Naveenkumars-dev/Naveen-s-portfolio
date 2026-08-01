import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: {
      WAVES: (options: any) => { destroy: () => void };
    };
  }
}

export default function VantaWaves() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    const loadVanta = () => {
      if (window.VANTA && vantaRef.current) {
        vantaEffectRef.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x000000,
          shininess: 30,
          waveHeight: 15,
          waveSpeed: 1,
          zoom: 1,
        });
      }
    };

    // Wait for Vanta to load
    if (window.VANTA) {
      loadVanta();
    } else {
      const checkVanta = setInterval(() => {
        if (window.VANTA) {
          clearInterval(checkVanta);
          loadVanta();
        }
      }, 100);

      return () => clearInterval(checkVanta);
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="fixed inset-0 -z-10" />;
}
