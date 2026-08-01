import { motion } from "framer-motion";
import { journey } from "../data/journey";
import SectionHeading from "../components/SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="relative mx-auto max-w-4xl px-6 py-28 sm:px-10">
      <SectionHeading eyebrow="06 / JOURNEY" title="The Path So Far" />

      <div className="relative mt-14 ml-3 border-l border-[var(--color-border)] sm:ml-6">
        {journey.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] as const }}
            whileHover={{ x: 4 }}
            className="relative pb-12 pl-8 last:pb-0 sm:pl-10"
          >
            <motion.span
              className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-cyan)] bg-[var(--color-bg)]"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(94,234,212,0.6)",
                  "0 0 20px rgba(94,234,212,0.8)",
                  "0 0 10px rgba(94,234,212,0.6)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.p
              className="mono-label text-[var(--color-cyan)]"
              whileHover={{ scale: 1.05 }}
            >
              {step.date}
            </motion.p>
            <h3 className="mt-1 text-lg font-semibold text-[var(--color-text)] sm:text-xl">{step.title}</h3>
            <p className="mt-1 text-sm text-[var(--color-cyan)]">{step.organization}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
