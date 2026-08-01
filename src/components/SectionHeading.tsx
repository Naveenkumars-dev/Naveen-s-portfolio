import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <span className="eyebrow-line mono-label text-[var(--color-cyan)]">{eyebrow}</span>
      <h2 className="mt-3 text-4xl font-bold leading-none sm:text-5xl">{title}</h2>
      {description && <p className="mt-3 max-w-xl text-[var(--color-muted)]">{description}</p>}
    </motion.div>
  );
}
