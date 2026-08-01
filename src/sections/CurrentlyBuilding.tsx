import { motion } from "framer-motion";
import { Rocket, Brain, Trophy, BookOpen } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const buildingItems = [
  {
    icon: Rocket,
    label: "Projects",
    description: "Building full-stack and backend applications",
    color: "cyan"
  },
  {
    icon: Brain,
    label: "AI & ML",
    description: "Exploring AI, machine learning, and AI agents",
    color: "violet"
  },
  {
    icon: Trophy,
    label: "Hackathons",
    description: "Participating in competitive problem-solving and innovation challenges",
    color: "amber"
  },
  {
    icon: BookOpen,
    label: "DSA",
    description: "Strengthening algorithms and problem-solving skills",
    color: "rose"
  }
];

const DOT: Record<string, string> = {
  cyan: "bg-[var(--color-cyan)]",
  amber: "bg-[var(--color-amber)]",
  violet: "bg-[var(--color-violet)]",
  rose: "bg-[var(--color-rose)]",
};

export default function CurrentlyBuilding() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <SectionHeading 
        eyebrow="04 / LIVE STATUS" 
        title="Currently Building" 
        description="Exploring ideas, building real-world solutions, and continuously improving my skills across software development, backend engineering, and AI."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {buildingItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass rounded-2xl p-5 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 animate-pulse rounded-full ${DOT[item.color]}`} />
              <span className="mono-label">{item.label}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-[var(--color-text)]">{item.description}</p>
            <motion.div 
              className="mt-4 flex justify-end"
              whileHover={{ scale: 1.1 }}
            >
              <item.icon size={18} className={`text-[var(--color-${item.color})]`} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
