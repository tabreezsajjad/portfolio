import React from "react";
import HeroSection from "../sections/HeroSection.jsx";
import ProjectsSection from "../sections/ProjectSection.jsx";
import WhatIDo from "../sections/WhatIdo.jsx";

export default function Home() {
  return (
    <main aria-label="Home">
      <HeroSection />
      <WhatIDo/>
      <ProjectsSection />
    </main>
  );
}
