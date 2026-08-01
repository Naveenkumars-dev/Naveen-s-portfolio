import { useEffect, useRef, useState } from "react";

export default function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 450}px, ${e.clientY - 450}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reducedMotion]);

  const particleCount = reducedMotion ? 15 : 50;
  const starCount = reducedMotion ? 30 : 100;
  const orbCount = reducedMotion ? 2 : 5;
  const particles = Array.from({ length: particleCount });
  const stars = Array.from({ length: starCount });
  const orbs = Array.from({ length: orbCount });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Premium dark navy background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0a0f1e] to-[#050810]" />
      
      {/* Star field effect */}
      <div className="absolute inset-0 star-field" />
      {stars.map((_, i) => (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      {/* Premium gradient orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
      <div className="gradient-orb gradient-orb-4" />
      <div className="gradient-orb gradient-orb-5" />
      
      {/* Enhanced cursor-following light effect */}
      {!reducedMotion && (
        <div
          ref={glowRef}
          className="absolute h-[900px] w-[900px] rounded-full opacity-[0.12] blur-[150px] will-change-transform"
          style={{ 
            background: "radial-gradient(circle, var(--color-cyan) 0%, var(--color-violet) 25%, transparent 65%)",
          }}
        />
      )}
      
      {/* Static ambient glows */}
      <div className="absolute -top-80 left-1/4 h-[700px] w-[700px] rounded-full bg-[var(--color-violet)] opacity-[0.06] blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[var(--color-cyan)] opacity-[0.05] blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-rose)] opacity-[0.03] blur-[140px]" />

      {/* Floating orbs */}
      {orbs.map((_, i) => (
        <div
          key={`orb-${i}`}
          className="floating-orb"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            width: 80 + (i % 4) * 30,
            height: 80 + (i % 4) * 30,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${18 + (i % 7)}s`,
          }}
        />
      ))}

      {/* Glowing particles */}
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${10 + (i % 8)}s`,
          }}
        />
      ))}

      {/* Subtle scan lines */}
      <div className="absolute inset-0 scan-lines opacity-3" />

      <style>{`
        .grid-bg {
          background-image:
            linear-gradient(rgba(0, 180, 216, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 216, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .star-field {
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        }
        
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          opacity: 0.8;
          animation: twinkle ease-in-out infinite;
        }
        
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          will-change: transform;
          mix-blend-mode: screen;
        }
        
        .gradient-orb-1 {
          top: 5%;
          left: 15%;
          width: 55vw;
          height: 55vw;
          background: radial-gradient(circle, var(--color-cyan) 0%, transparent 70%);
          animation: orb-float-1 30s ease-in-out infinite alternate;
        }
        
        .gradient-orb-2 {
          top: 45%;
          right: 5%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, var(--color-violet) 0%, transparent 70%);
          animation: orb-float-2 35s ease-in-out infinite alternate;
        }
        
        .gradient-orb-3 {
          bottom: 5%;
          left: 25%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, var(--color-rose) 0%, transparent 70%);
          animation: orb-float-3 32s ease-in-out infinite alternate;
        }
        
        .gradient-orb-4 {
          top: 30%;
          left: 5%;
          width: 35vw;
          height: 35vw;
          background: radial-gradient(circle, var(--color-cyan) 0%, transparent 70%);
          animation: orb-float-4 28s ease-in-out infinite alternate;
        }
        
        .gradient-orb-5 {
          bottom: 15%;
          right: 15%;
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, var(--color-violet) 0%, transparent 70%);
          animation: orb-float-5 38s ease-in-out infinite alternate;
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, var(--color-cyan) 0%, transparent 70%);
          opacity: 0.08;
          filter: blur(25px);
          animation: float-orb ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          background: var(--color-cyan);
          opacity: 0.5;
          animation: particle-float ease-in-out infinite;
          box-shadow: 0 0 8px var(--color-cyan), 0 0 16px var(--color-violet);
        }
        
        .scan-lines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 180, 216, 0.015) 2px,
            rgba(0, 180, 216, 0.015) 4px
          );
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes orb-float-1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.15); }
          100% { transform: translate(-40px, 60px) scale(0.9); }
        }
        
        @keyframes orb-float-2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(1.2); }
          100% { transform: translate(40px, -50px) scale(0.85); }
        }
        
        @keyframes orb-float-3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -60px) scale(1.1); }
          100% { transform: translate(-60px, 30px) scale(1.15); }
        }
        
        @keyframes orb-float-4 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 20px) scale(1.1); }
          100% { transform: translate(-30px, 40px) scale(0.95); }
        }
        
        @keyframes orb-float-5 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.2); }
          100% { transform: translate(45px, -35px) scale(0.9); }
        }
        
        @keyframes float-orb {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.08; }
          25% { transform: translateY(-40px) translateX(20px); opacity: 0.12; }
          50% { transform: translateY(-20px) translateX(-15px); opacity: 0.1; }
          75% { transform: translateY(-50px) translateX(25px); opacity: 0.14; }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-40px) scale(1.3); opacity: 0.7; }
        }
        
        @media (max-width: 768px) {
          .gradient-orb {
            opacity: 0.08;
            filter: blur(70px);
          }
          .particle {
            opacity: 0.25;
          }
          .floating-orb {
            opacity: 0.05;
          }
          .star {
            opacity: 0.5;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .gradient-orb,
          .floating-orb,
          .particle,
          .star {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}