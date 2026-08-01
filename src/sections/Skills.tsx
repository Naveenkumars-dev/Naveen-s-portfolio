import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { skills, categories, type Skill } from "../data/skills";
import SectionHeading from "../components/SectionHeading";
import ParticleBackground from "../components/3d/ParticleBackground";

type LinePos = { x1: number; y1: number; x2: number; y2: number; key: string };

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [hovered, setHovered] = useState<Skill | null>(null);
  const [lines, setLines] = useState<LinePos[]>([]);

  const computeLines = useCallback((skill: Skill) => {
    const container = containerRef.current;
    const from = nodeRefs.current[skill.id];
    if (!container || !from) return setLines([]);
    const cRect = container.getBoundingClientRect();
    const fRect = from.getBoundingClientRect();
    const fx = fRect.left - cRect.left + fRect.width / 2;
    const fy = fRect.top - cRect.top + fRect.height / 2;

    const newLines: LinePos[] = [];
    skill.connections.forEach((id) => {
      const to = nodeRefs.current[id];
      if (!to) return;
      const tRect = to.getBoundingClientRect();
      newLines.push({
        x1: fx,
        y1: fy,
        x2: tRect.left - cRect.left + tRect.width / 2,
        y2: tRect.top - cRect.top + tRect.height / 2,
        key: `${skill.id}-${id}`,
      });
    });
    setLines(newLines);
  }, []);

  useLayoutEffect(() => {
    if (hovered) computeLines(hovered);
    else setLines([]);
  }, [hovered, computeLines]);

  const isConnected = (id: string) => hovered && (hovered.id === id || hovered.connections.includes(id));

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <ParticleBackground className="opacity-30" particleCount={60} />
      <SectionHeading
        eyebrow="02 / ECOSYSTEM"
        title="Technology Universe"
        description="Hover a node to trace how it connects to the rest of the stack."
      />

      <div ref={containerRef} className="glass relative mt-12 overflow-hidden rounded-2xl p-6 sm:p-10">
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {lines.map((l) => (
            <motion.line
              key={l.key}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="var(--color-cyan)"
              strokeWidth={1.5}
              strokeOpacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </svg>

        <div className="relative space-y-8">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="mono-label mb-3">{cat}</p>
              <div className="flex flex-wrap gap-3">
                {skills.filter((s) => s.category === cat).map((s) => (
                  <motion.button
                    key={s.id}
                    ref={(el) => { nodeRefs.current[s.id] = el; }}
                    data-cursor="skill"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isConnected(s.id)
                        ? "border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] scale-105 shadow-[0_0_20px_rgba(0,180,216,0.3)]"
                        : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-cyan)]/50"
                    }`}
                  >
                    {s.name}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
