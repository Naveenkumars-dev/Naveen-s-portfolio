import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../data/projects";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const blocks = project
    ? [
        { label: "Problem", value: project.problem },
        { label: "Solution", value: project.solution },
        { label: "Architecture", value: project.architecture },
        { label: "Challenges", value: project.challenges },
        { label: "Outcome", value: project.outcome },
      ]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass mx-auto my-10 w-[92vw] max-w-3xl rounded-2xl p-6 sm:p-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="mono-label text-[var(--color-cyan)]">CASE STUDY</span>
                <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{project.name}</h3>
              </div>
              <button onClick={onClose} data-cursor="skill" className="rounded-full border border-[var(--color-border)] p-2">
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="mono-label rounded-full border border-[var(--color-border)] px-2.5 py-1">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <a href={project.github} target="_blank" rel="noreferrer" data-cursor="github" className="flex items-center gap-1.5 rounded-full bg-[var(--color-cyan)] px-4 py-2 text-xs font-semibold text-[var(--color-bg)]">
                <GithubIcon size={13} /> View Code
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer" data-cursor="project" className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-text)]">
                <ExternalLink size={13} /> Live Demo
              </a>
            </div>

            <div className="mt-8 space-y-6">
              {blocks.map((b) => (
                <div key={b.label}>
                  <p className="mono-label text-[var(--color-cyan)]">{b.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text)]">{b.value}</p>
                </div>
              ))}
              <div>
                <p className="mono-label text-[var(--color-cyan)]">Key Features</p>
                <ul className="mt-1.5 space-y-1.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-cyan)]" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
