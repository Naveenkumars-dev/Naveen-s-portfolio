import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/config";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-[var(--font-display)] font-semibold text-[var(--color-text)]">{profile.name}</p>
          <p className="mono-label mt-1">Designed &amp; engineered with curiosity.</p>
        </div>

        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="github" className="text-[var(--color-muted)] hover:text-[var(--color-cyan)]">
            <GithubIcon size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="contact" className="text-[var(--color-muted)] hover:text-[var(--color-cyan)]">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} data-cursor="contact" className="text-[var(--color-muted)] hover:text-[var(--color-cyan)]">
            <Mail size={18} />
          </a>
        </div>

        <div className="mono-label flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-cyan)]" />
          Portfolio System Online
        </div>
      </div>
    </footer>
  );
}
