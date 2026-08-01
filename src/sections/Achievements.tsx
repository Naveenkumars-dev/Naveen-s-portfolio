import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "../data/journey";
import SectionHeading from "../components/SectionHeading";

export default function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading eyebrow="07 / ACHIEVEMENT WALL" title="Achievements" />

      {achievements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mt-12 flex flex-col items-center gap-3 rounded-2xl px-8 py-16 text-center"
        >
          <Trophy size={26} className="text-[var(--color-muted-2)]" />
          <p className="text-[var(--color-text)]">No hackathons logged yet.</p>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            Add entries to <code className="mono-label text-[var(--color-cyan)]">src/data/journey.ts</code> — the
            <code className="mono-label text-[var(--color-cyan)]"> achievements</code> array — and they'll appear here automatically.
          </p>
        </motion.div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {achievements.map((a) => (
            <div key={a.id} className="glass group relative overflow-hidden rounded-2xl p-6">
              <Trophy size={16} className="text-[var(--color-amber)]" />
              <h3 className="mt-3 text-lg font-semibold">{a.event}</h3>
              <p className="mono-label mt-1">{a.role}</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{a.problem}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.stack.map((s) => (
                  <span key={s} className="mono-label rounded-full border border-[var(--color-border)] px-2 py-1 !text-[9px]">{s}</span>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--color-cyan)]">{a.outcome}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
