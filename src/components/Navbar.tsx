import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { useActiveSection } from "../hooks/useScrollTracking";
import { profile } from "../data/config";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({
  onOpenPalette,
}: {
  onOpenPalette: () => void;
}) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 px-4 backdrop-blur-xl sm:px-8">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between py-4">
          <motion.button data-cursor="skill" onClick={() => go("home")} className="font-[var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-text)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {profile.initials}<motion.span 
              className="text-[var(--color-cyan)]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >✦</motion.span>
          </motion.button>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <motion.button
                  onClick={() => go(l.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glow-hover relative rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-colors ${
                    active === l.id ? "text-[var(--color-cyan)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 bottom-0 h-px bg-[var(--color-cyan)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              data-cursor="skill"
              onClick={onOpenPalette}
              className="glow-hover hidden items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[10px] text-[var(--color-muted)] sm:flex hover:border-[var(--color-cyan)]/40 hover:text-[var(--color-text)] transition-colors"
            >
              <Command size={12} /> <span className="mono-label !text-[10px]">/</span>
            </button>
            <button onClick={() => setOpen(!open)} className="glow-hover rounded-full border border-[var(--color-border)] p-2 lg:hidden">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          className="glass fixed inset-x-4 top-16 z-40 rounded-sm p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <motion.button
                    onClick={() => go(l.id)}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold ${
                      active === l.id ? "bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]" : "text-[var(--color-muted)]"
                    }`}
                  >
                    {l.label}
                  </motion.button>
                </li>
              ))}
              <li className="mt-1 border-t border-[var(--color-border)] pt-2">
                <motion.button
                  onClick={() => { onOpenPalette(); setOpen(false); }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-lg border border-[var(--color-border)] py-2 text-xs font-bold text-[var(--color-muted)]"
                >
                  Command
                </motion.button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
