import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { profile, typingRoles } from "../data/config";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { useParallax } from "../hooks/useParallax";
import { use3DTilt } from "../hooks/use3DTilt";
import { useEffect, useState } from "react";
import profilePhoto from "../assets/naveenkumar-profile.png";

export default function Hero() {
  const typed = useTypingEffect(typingRoles);
  const [isMobile, setIsMobile] = useState(false);
  const parallaxOffset = useParallax(0.02);
  const { ref: tiltRef, style: tiltStyle } = use3DTilt({
    max: 10,
    perspective: 1000,
    scale: 1.02,
    speed: 300,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1] as const,
      },
    },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.2, 0.8, 0.2, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-28 pb-16 sm:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,400px)] lg:gap-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="eyebrow-line mono-label mb-5 text-[var(--color-cyan)]"
          >
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <motion.h1
            variants={textRevealVariants}
            className="hero-name-gradient w-full whitespace-nowrap text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-[5.5rem]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-lg text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex h-6 items-center font-[var(--font-mono)] text-sm text-[var(--color-cyan)]"
          >
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[var(--color-cyan)]" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              data-cursor="project"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="magnetic-button group flex items-center gap-2 rounded-sm bg-[var(--color-cyan)] px-6 py-3 text-sm font-semibold text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
            >
              Explore Me <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              data-cursor="contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="magnetic-button flex items-center gap-2 rounded-sm border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-cyan)]/50"
            >
              <MessageSquare size={15} /> Let's Connect
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            transform: !isMobile ? `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)` : 'none',
          }}
          className="relative flex min-h-[390px] w-full items-center justify-center lg:min-h-[520px]"
        >
          <motion.div
            ref={tiltRef}
            style={!isMobile ? tiltStyle : {}}
            initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ delay: 0.48, duration: 0.7 }}
            className="portrait-orbit relative h-72 w-72 overflow-hidden rounded-[12px] p-2 sm:h-96 sm:w-96"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-[var(--color-cyan)]/20 to-[var(--color-violet)]/20 rounded-[8px]"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <img
              src={profilePhoto}
              alt={profile.name}
              className="h-full w-full rounded-[8px] object-cover object-center relative z-10"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75 }}
            className="glass floating-card absolute right-0 top-[10%] hidden rounded-sm px-4 py-3 sm:block"
          >
            <p className="mono-label text-[var(--color-cyan)]">Based in</p>
            <p className="mt-1 text-sm text-[var(--color-text)]">India · Building globally</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.85 }}
            className="glass floating-card absolute bottom-[8%] left-0 rounded-sm px-4 py-3"
          >
            <p className="mono-label text-[var(--color-cyan)]">Current focus</p>
            <p className="mt-1 text-sm text-[var(--color-text)]">AI · Software Engineering</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}