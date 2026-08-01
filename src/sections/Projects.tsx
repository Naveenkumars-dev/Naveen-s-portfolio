import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.section 
      id="projects" 
      ref={ref as any} 
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <SectionHeading eyebrow="03 / BUILD LOG" title="Featured Projects" description="Full-stack builds spanning Spring Boot, React, and MERN-style stacks." />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onView={() => setActive(p)} />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </motion.section>
  );
}
