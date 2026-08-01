import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/config";

const STEPS = [
  "Initializing Developer System…",
  "Loading Skills…",
  "Connecting Projects…",
  "Activating AI Interface…",
  "System Ready.",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 480);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 9 + 4, 100));
    }, 120);

    const exitTimer = setTimeout(() => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      setProgress(100);
      setStep(STEPS.length - 1);
      setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 650);
      }, 500);
    }, 2600);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(exitTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)] grid-bg"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.08em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-[var(--font-display)] text-4xl sm:text-6xl font-bold uppercase text-[var(--color-text)] text-glow"
          >
            {profile.name}
          </motion.h1>

          <div className="mt-8 w-[260px] sm:w-[340px]">
            <div className="mono-label mb-2 flex justify-between">
              <span className="text-[var(--color-cyan)]">{Math.round(progress)}%</span>
              <span>BOOT</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-[var(--color-border)]">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-violet)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mono-label mt-3 text-[var(--color-muted)]"
              >
                {STEPS[step]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
