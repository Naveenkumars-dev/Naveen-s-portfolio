import { useScrollProgress } from "../hooks/useScrollTracking";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-violet)] transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
