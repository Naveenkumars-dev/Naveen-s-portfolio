import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../components/BrandIcons";
import { profile } from "../data/config";
import SectionHeading from "../components/SectionHeading";
import ParticleBackground from "../components/3d/ParticleBackground";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend is wired up yet — replace this with a real submit handler
    // (e.g. an API route, Formspree, or EmailJS) before going live.
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}`, cursor: "contact" },
    { icon: Phone, label: profile.phone, href: "tel:+919342488537", cursor: "contact" },
    { icon: LinkedinIcon, label: "LinkedIn", href: profile.linkedin, cursor: "contact" },
    { icon: InstagramIcon, label: "@naveen_1810_", href: profile.instagram, cursor: "contact" },
    { icon: GithubIcon, label: "GitHub", href: profile.github, cursor: "github" },
  ];

  return (
    <motion.section 
      id="contact" 
      ref={ref as any} 
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <ParticleBackground className="opacity-20" particleCount={50} />
      <SectionHeading eyebrow="09 / TRANSMISSION CENTER" title="Let's Build. Let's Create. Let's Grow." />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor={l.cursor}
              className="glass flex items-center gap-4 rounded-xl px-5 py-4 transition-colors hover:border-[var(--color-cyan)]/40"
            >
              <l.icon size={18} className="text-[var(--color-cyan)]" />
              <span className="text-sm text-[var(--color-text)]">{l.label}</span>
            </a>
          ))}
        </div>

        <form onSubmit={submit} className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--color-surface)]/95"
              >
                <CheckCircle2 size={32} className="text-[var(--color-cyan)]" />
                <p className="text-sm text-[var(--color-text)]">Transmission sent.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div>
              <label className="mono-label">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-cyan)]/50"
              />
            </div>
            <div>
              <label className="mono-label">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-cyan)]/50"
              />
            </div>
            <div>
              <label className="mono-label">Subject</label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-cyan)]/50"
              />
            </div>
            <div>
              <label className="mono-label">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 w-full resize-none rounded-lg border border-[var(--color-border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-cyan)]/50"
              />
            </div>
            <button
              type="submit"
              data-cursor="contact"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-cyan)] py-3 text-sm font-semibold text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
            >
              Send Transmission <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
