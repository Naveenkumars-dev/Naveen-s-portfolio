import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data/projects";

export default function ProjectCard({ project, onView }: { project: Project; onView: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -6, y: (px - 0.5) * 8 });
    setGlow({ x: px * 100, y: py * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      animate={{ 
        rotateX: tilt.x, 
        rotateY: tilt.y,
        scale: isHovered ? 1.02 : 1,
        z: isHovered ? 20 : 0
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="glass group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--color-cyan) 12%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative" style={{ transform: 'translateZ(10px)' }}>
        <div className="mono-label mb-4 flex items-center justify-between">
          <span>PROJECT</span>
          <span className="text-[var(--color-cyan)]">0{project.id.length % 5 + 1}</span>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)]">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="mono-label rounded-full border border-[var(--color-border)] px-2 py-1 !text-[9px]">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-3" style={{ transform: 'translateZ(15px)' }}>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="github"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-muted)] hover:border-[var(--color-cyan)]/50 hover:text-[var(--color-text)] transition-colors"
        >
          <GithubIcon size={13} /> GitHub
        </motion.a>
        <motion.a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          data-cursor="project"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-muted)] hover:border-[var(--color-cyan)]/50 hover:text-[var(--color-text)] transition-colors"
        >
          <ExternalLink size={13} /> Live Demo
        </motion.a>
        <motion.button
          onClick={onView}
          data-cursor="project"
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="ml-auto flex items-center gap-1 text-xs font-semibold text-[var(--color-cyan)]"
        >
          Details <ArrowUpRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}
