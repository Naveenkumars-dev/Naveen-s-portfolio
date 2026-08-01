import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import AmbientBackground from "./components/AmbientBackground";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import CurrentlyBuilding from "./sections/CurrentlyBuilding";
import ProblemSolving from "./sections/ProblemSolving";
import Journey from "./sections/Journey";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Easter eggs: / → command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (typing) {
        if (e.key === "Escape") {
          setPaletteOpen(false);
        }
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <CustomCursor />
      <AmbientBackground />
      <ScrollProgressBar />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
        <ProblemSolving />
        <Journey />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
