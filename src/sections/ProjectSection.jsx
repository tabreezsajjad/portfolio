import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ProjectSection.css";

import { getProjects } from "../api/projectWp"; // e.g. "src/lib/wp.js"

// --- Animation Variants ---
const grid = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 },
  },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// --- Skeleton Component for Loading State ---
function ProjectCardSkeleton() {
  return (
    <motion.div variants={card}>
      <div className="project-card is-loading">
        <div className="project-card__media">
          <div className="project-card__ph" />
        </div>
        <div className="project-card__title">
          <div className="project-card__title-ph" />
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Projects Section Component ---
export default function ProjectsSection() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await getProjects(1, 20); // category: projects
        
        // --- CHANGE IS HERE ---
        // Sort projects to display oldest first (chronological order)
        const sortedRows = [...rows].sort((a, b) => new Date(a._raw.date) - new Date(b._raw.date));
        
        if (alive) setItems(sortedRows);
      } catch (e) {
        console.error("Projects fetch error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section className="projects" id="work" aria-label="Projects">
      <div className="projects__wrap">
        <motion.div
          className="projects__grid"
          variants={grid}
          initial="hidden"
          animate="show"
        >
          {/* --- CONDITIONAL RENDERING --- */}
          {loading ? (
            // If loading, render 6 skeleton cards
            Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : (
            // If not loading, render the actual project cards
            items.map((p) => (
              <motion.div key={p.slug} variants={card}>
                <Link to={`/work/${p.slug}`} className="project-card">
                  <div className="project-card__media">
                    {p.img ? (
                      <img src={p.img} alt={p.title} />
                    ) : (
                      <div className="project-card__ph" />
                    )}
                    {p.hover ? (
                      <span className="project-card__hover" aria-hidden="true">
                        {p.hover}
                      </span>
                    ) : null}
                  </div>
                  <div className="project-card__title">{p.title}</div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
