import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useMagneticFloat } from "../hooks/useMagneticFloat";
import aboutPhoto from "../assets/image.png";

const stats = [
  { value: "4+", label: "Years of Learning" },
  { value: "10+", label: "Technologies Explored" },
  { value: "10+", label: "Projects Built" },
  { value: "10+", label: "Hackathons Participated" },
  { value: "∞", label: "Ideas to Build" },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: magneticRef, glowPosition, isHovering, glowIntensity } = useMagneticFloat({
    floatStrength: 8,
    magneticStrength: 0.25,
    parallaxStrength: 0.03,
    glowIntensity: 0.7,
  });

  return (
    <motion.section 
      id="about" 
      ref={ref as any} 
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <SectionHeading eyebrow="01 / IDENTITY" title="A Little Bit About Myself" />

      <div className="mt-12 grid gap-8 lg:grid-cols-[350px_1fr]">
        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-32"
        >
          <motion.div
            ref={magneticRef}

            initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
            animate={isVisible ? { 
              opacity: 1, 
              rotate: 0, 
              scale: 1,
              rotateX: isHovering ? (glowPosition.y - 50) * 0.1 : 0,
              rotateY: isHovering ? (glowPosition.x - 50) * 0.1 : 0,
              boxShadow: isHovering 
                ? `0 30px 80px rgba(0,180,216,${glowIntensity}), 0 0 100px rgba(0,180,216,${glowIntensity * 0.3})`
                : [
                    "0 20px 60px rgba(0,180,216,0.15), 0 0 50px rgba(0,180,216,0.1)",
                    "0 25px 70px rgba(0,180,216,0.25), 0 0 60px rgba(0,180,216,0.15)",
                    "0 20px 60px rgba(0,180,216,0.15), 0 0 50px rgba(0,180,216,0.1)"
                  ],
            } : { 
              opacity: 0, 
              rotate: -6, 
              scale: 0.9,
              rotateX: 0,
              rotateY: 0,
              boxShadow: "0 20px 60px rgba(0,180,216,0.15), 0 0 50px rgba(0,180,216,0.1)"
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.7,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,180,216,0.15)]"
            style={{
              perspective: "1000px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.05)",
              border: isHovering ? "2px solid rgba(0, 180, 216, 0.6)" : "2px solid rgba(0, 180, 216, 0.3)",
              transition: "border-color 0.5s ease"
            }}
          >
            {/* Glass frame overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
                backdropFilter: "blur(2px)",
              }}
            />
            
            {/* Dynamic cursor glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0,180,216,${glowIntensity * 0.5}) 0%, transparent 50%)`,
                opacity: isHovering ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Holographic shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: `linear-gradient(${glowPosition.x * 3.6}deg, rgba(0,180,216,0) 0%, rgba(0,180,216,${isHovering ? 0.3 : 0}) 50%, rgba(124,58,237,${isHovering ? 0.3 : 0}) 50%, rgba(124,58,237,0) 100%)`,
                opacity: isHovering ? 1 : 0,
              }}
              animate={{
                x: isHovering ? ["-100%", "100%"] : "0%",
              }}
              transition={{
                duration: 1.5,
                repeat: isHovering ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            {/* Light reflection based on mouse position */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-15"
              style={{
                background: `linear-gradient(${glowPosition.y * 3.6}deg, rgba(255,255,255,${isHovering ? 0.15 : 0.05}) 0%, transparent 50%)`,
                transform: `translate(${(glowPosition.x - 50) * 0.5}%, ${(glowPosition.y - 50) * 0.5}%)`,
              }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Edge glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-25 rounded-2xl"
              style={{
                boxShadow: isHovering 
                  ? `inset 0 0 20px rgba(0,180,216,${glowIntensity * 0.8}), inset 0 0 40px rgba(124,58,237,${glowIntensity * 0.5})`
                  : "inset 0 0 10px rgba(0,180,216,0.2)",
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Cyber scan effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-26 rounded-2xl overflow-hidden"
              style={{
                opacity: isHovering ? 1 : 0.3,
              }}
            >
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent"
                style={{
                  boxShadow: "0 0 20px rgba(0,180,216,0.8), 0 0 40px rgba(0,180,216,0.4)",
                }}
                animate={{
                  y: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Scan line glow */}
              <motion.div
                className="absolute left-0 right-0 h-8 bg-gradient-to-r from-transparent via-[var(--color-cyan)]/20 to-transparent"
                animate={{
                  y: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Digital grid overlay */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,180,216,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,180,216,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            {/* 3D Animated background gradient - Layer 1 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/10 via-[var(--color-violet)]/10 to-[var(--color-rose)]/10 z-5"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                rotateX: [0, 5, 0],
                rotateY: [0, -5, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% 200%", transformStyle: "preserve-3d" }}
            />
            
            {/* 3D Floating orbs with depth - Layer 2 */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--color-cyan)]/20 rounded-full blur-3xl z-6"
              animate={{
                x: isHovering ? [(glowPosition.x - 50) * 0.2, 30 + (glowPosition.x - 50) * 0.1, (glowPosition.x - 50) * 0.2] : [0, 30, 0],
                y: isHovering ? [(glowPosition.y - 50) * 0.2, -30 + (glowPosition.y - 50) * 0.1, (glowPosition.y - 50) * 0.2] : [0, -30, 0],
                scale: [1, 1.2, 1],
                rotateZ: [0, 180, 360],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[var(--color-violet)]/20 rounded-full blur-3xl z-6"
              animate={{
                x: isHovering ? [(glowPosition.x - 50) * 0.3, -20 + (glowPosition.x - 50) * 0.15, (glowPosition.x - 50) * 0.3] : [0, -20, 0],
                y: isHovering ? [(glowPosition.y - 50) * 0.3, 20 + (glowPosition.y - 50) * 0.15, (glowPosition.y - 50) * 0.3] : [0, 20, 0],
                scale: [1, 1.3, 1],
                rotateZ: [360, 180, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ transformStyle: "preserve-3d" }}
            />
            
            {/* Additional orbiting orbs */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute w-8 h-8 bg-[var(--color-cyan)]/15 rounded-full blur-xl z-6"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: isHovering 
                    ? [
                        Math.cos(i * Math.PI / 2 + glowPosition.x * 0.01) * 80,
                        Math.cos(i * Math.PI / 2 + glowPosition.x * 0.01 + Math.PI / 4) * 80,
                        Math.cos(i * Math.PI / 2 + glowPosition.x * 0.01 + Math.PI / 2) * 80,
                      ]
                    : [
                        Math.cos(i * Math.PI / 2) * 80,
                        Math.cos(i * Math.PI / 2 + Math.PI / 4) * 80,
                        Math.cos(i * Math.PI / 2 + Math.PI / 2) * 80,
                      ],
                  y: isHovering
                    ? [
                        Math.sin(i * Math.PI / 2 + glowPosition.y * 0.01) * 80,
                        Math.sin(i * Math.PI / 2 + glowPosition.y * 0.01 + Math.PI / 4) * 80,
                        Math.sin(i * Math.PI / 2 + glowPosition.y * 0.01 + Math.PI / 2) * 80,
                      ]
                    : [
                        Math.sin(i * Math.PI / 2) * 80,
                        Math.sin(i * Math.PI / 2 + Math.PI / 4) * 80,
                        Math.sin(i * Math.PI / 2 + Math.PI / 2) * 80,
                      ],
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
            
            {/* Additional 3D particles - Layer 3 */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 bg-[var(--color-rose)]/15 rounded-full blur-2xl z-7"
              animate={{
                x: [-20, 20, -20],
                y: [-20, 20, -20],
                scale: [0.8, 1.1, 0.8],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
            
            {/* 3D geometric shapes - Layer 4 */}
            <motion.div
              className="absolute top-10 right-10 w-12 h-12 border-2 border-[var(--color-cyan)]/30 rounded-lg z-8"
              animate={{
                rotate: [0, 45, 90, 135, 180],
                scale: [1, 1.2, 1],
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-10 h-10 border-2 border-[var(--color-violet)]/30 rounded-full z-8"
              animate={{
                rotate: [360, 270, 180, 90, 0],
                scale: [1, 0.8, 1],
                x: [0, -10, 0],
                y: [0, 10, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
            
            {/* Floating particles - Layer 6 */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[var(--color-cyan)]/40 rounded-full z-9"
                animate={{
                  x: [Math.random() * 100, Math.random() * 100],
                  y: [Math.random() * 100, Math.random() * 100],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                {/* Particle trail */}
                <motion.div
                  className="absolute inset-0 bg-[var(--color-cyan)]/20 rounded-full blur-sm"
                  animate={{
                    scale: [1, 2, 3],
                    opacity: [0.5, 0.3, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            ))}
            
            {/* Image layer - Layer 7 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-[var(--color-cyan)]/20 to-[var(--color-violet)]/20 z-30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.img
              src={aboutPhoto}
              alt="Naveenkumar"
              className="relative h-full w-full object-cover z-40"
              whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
            />
            
            {/* Top gradient overlay - Layer 8 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-[var(--color-cyan)]/5 via-transparent to-[var(--color-violet)]/5 z-50"
              animate={{
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent z-50"
            />
          </motion.div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="glass rounded-2xl p-8 sm:p-10" style={{ fontFamily: 'var(--font-about)' }}>
            <p className="text-base leading-relaxed text-[var(--color-text)] sm:text-lg" style={{ fontFamily: 'var(--font-paragraph)' }}>
              Hello! I'm <span className="text-[var(--color-cyan)]">Naveenkumar</span>, a Computer Science Engineering student and aspiring Software Engineer who enjoys working at the intersection of technology, creativity, and problem-solving. With a growing background in Full-Stack Development, Backend Engineering, and AI, I love turning ideas into practical and meaningful digital solutions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg" style={{ fontFamily: 'var(--font-paragraph)' }}>
              I believe in learning by building — every project is an opportunity to explore new technologies, improve my skills, and create something useful. My work spans across web development, backend systems, APIs, databases, AI/ML, and emerging technologies.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg" style={{ fontFamily: 'var(--font-paragraph)' }}>
              When I'm not coding, you'll find me playing cricket, athletics, or kabaddi, reading, exploring new ideas, or working on my next project. I'm always open to new challenges, collaborations, and opportunities to build something extraordinary.
            </p>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-[var(--color-cyan)] sm:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-1 text-[10px] text-[var(--color-muted)] sm:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
