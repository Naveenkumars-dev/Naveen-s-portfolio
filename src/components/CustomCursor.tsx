import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LABELS: Record<string, string> = {
  project: "VIEW",
  github: "CODE",
  contact: "CONNECT",
  skill: "EXPLORE",
};

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [variant, setVariant] = useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 24, stiffness: 260, mass: 0.4 });
  const ringY = useSpring(y, { damping: 24, stiffness: 260, mass: 0.4 });
  const glowX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const glowY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsTouch(!hasFinePointer);
    if (!hasFinePointer) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
        if (cursorTarget) {
          const type = cursorTarget.dataset.cursor;
          if (type && LABELS[type]) {
            setVariant("label");
            setLabel(LABELS[type]);
            return;
          }
          setVariant("hover");
          setLabel("");
          return;
        }
        setVariant("default");
        setLabel("");
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (isTouch) return null;

  return (
    <>
      {/* Cursor glow effect */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-32 w-32 rounded-full bg-[var(--color-cyan)] opacity-[0.08] blur-[40px]"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_var(--color-cyan),0_0_20px_var(--color-violet)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      
      {/* Outer cursor ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-[var(--color-cyan)]/60 shadow-[0_0_15px_rgba(0,180,216,0.3)]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: variant === "default" ? 36 : variant === "hover" ? 56 : 72,
          height: variant === "default" ? 36 : variant === "hover" ? 56 : 72,
          backgroundColor:
            variant === "label" ? "color-mix(in srgb, var(--color-cyan) 20%, transparent)" : "transparent",
          borderColor: variant === "hover" ? "var(--color-cyan)" : "rgba(0, 180, 216, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label && (
          <span className="mono-label !text-[10px] !text-[var(--color-cyan)] tracking-widest font-semibold">{label}</span>
        )}
      </motion.div>
    </>
  );
}