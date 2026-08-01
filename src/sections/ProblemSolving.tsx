import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/config";

const CORES = [
  { label: "DSA", percentage: 85 },
  { label: "Algorithms", percentage: 78 },
  { label: "Problem Solving", percentage: 82 },
  { label: "Competitive Programming", percentage: 70 },
];

function RadialPlaceholder({ label, percentage }: { label: string; percentage: number }) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - percentage / 100);
  return (
    <div className="glass flex flex-col items-center rounded-2xl p-6">
      <svg viewBox="0 0 100 100" className="h-24 w-24">
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-border)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r="42" fill="none" stroke="url(#grad)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>
        <text x="50" y="55" textAnchor="middle" className="fill-[var(--color-text)]" style={{ fontSize: 14, fontFamily: "var(--font-mono)" }}>
          {percentage}%
        </text>
      </svg>
      <p className="mono-label mt-3 text-center">{label}</p>
    </div>
  );
}

export default function ProblemSolving() {
  return (
    <section id="problem-solving" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <SectionHeading eyebrow="05 / PROBLEM SOLVING CORE" title="Sharpening the Fundamentals" />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CORES.map((c) => (
          <RadialPlaceholder key={c.label} label={c.label} percentage={c.percentage} />
        ))}
      </div>

      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Currently sharpening problem-solving skills — connect a{" "}
        <a href={profile.leetcode} target="_blank" rel="noreferrer" data-cursor="skill" className="text-[var(--color-cyan)] underline underline-offset-2">
          LeetCode
        </a>{" "}
        profile in <code className="mono-label text-[var(--color-cyan)]">src/data/config.ts</code> to show real solve counts here.
      </p>
    </section>
  );
}
