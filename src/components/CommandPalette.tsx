import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderGit2, Layers, Mail } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { profile } from "../data/config";

type PaletteAction = { id: string; label: string; icon: React.ReactNode; action: () => void };

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    else setQuery("");
  }, [open]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const actions: PaletteAction[] = [
    { id: "projects", label: "Search projects", icon: <FolderGit2 size={15} />, action: () => scrollTo("projects") },
    { id: "github", label: "Open GitHub", icon: <GithubIcon size={15} />, action: () => window.open(profile.github, "_blank") },
    { id: "skills", label: "View skills", icon: <Layers size={15} />, action: () => scrollTo("skills") },
    { id: "contact", label: "Contact Naveen", icon: <Mail size={15} />, action: () => scrollTo("contact") },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 p-4 pt-[15vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md overflow-hidden rounded-xl"
          >
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
              <Search size={15} className="text-[var(--color-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command…"
                className="flex-1 bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted-2)]"
              />
              <kbd className="mono-label !text-[9px]">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && <p className="p-3 text-xs text-[var(--color-muted)]">No matches.</p>}
              {filtered.map((a) => (
                <button
                  key={a.id}
                  onClick={a.action}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--color-text)] hover:bg-[var(--color-cyan)]/10"
                >
                  <span className="text-[var(--color-cyan)]">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
