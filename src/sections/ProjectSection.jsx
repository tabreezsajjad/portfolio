import React from "react";
import { motion } from "framer-motion";
import './ProjectSection.css';

const projects = [
  { id: "google", title: "Google Search", img: "/images/projects/google_search.png", href: "#" },
  { id: "kg", title: "Google Knowledge Graph", img: "/images/projects/google_knowledge_graph.png", href: "#" },
  { id: "citric-analytics", title: "Citric: Analytics, data visualization, AI/ML", img: "/images/projects/citrix_analytics.png", href: "#" },
  { id: "citric-dm", title: "Citric: Design management", img: "/images/projects/citrix_design_management.png", href: "#" },
  { id: "citric-suite", title: "Citric: Remote desktop product suite", img: "/images/projects/citrix_remote.png", href: "#" },
  { id: "citric-delight", title: "Citric: Adding delight to designs", img: "/images/projects/citrix_designs.png", href: "#" },
  { id: "wotux", title: "Wotux: Farm to market startup", img: "/images/projects/wotux.png", href: "#" },
  { id: "paynet", title: "PayPal: Digital wallet", img: "/images/projects/paynet.png", href: "#" },
];

const grid = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 }
  }
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

export default function ProjectsSection() {
  return (
    <section className="projects" id="work" aria-label="Projects">
      <div className="projects__wrap">
        <motion.div
          className="projects__grid"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map(p => (
            <motion.a
              key={p.id}
              href={p.href}
              className="project-card"
              variants={card}
            >
              <div className="project-card__media">
                {p.img ? <img src={p.img} alt={p.title} /> : <div className="project-card__ph" />}
              </div>
              <div className="project-card__title">{p.title}</div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
