import React from "react";
import HeroSection from "../sections/HeroSection.jsx";
import ProjectsSection from "../sections/ProjectSection.jsx";

export default function Home() {
  return (
    <main aria-label="Home">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
