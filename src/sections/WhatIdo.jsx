import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./WhatIdo.css";

export default function WhatIDo() {
  return (
    <section id="whatido" className="whatido" aria-labelledby="whatido-title">
      <div className="whatido__wrap">
        <header className="whatido__head">
          <motion.h2
            id="whatido-title"
            className="whatido__title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            What I do
          </motion.h2>

          <motion.p
            className="whatido__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            I have 15 years of experience designing products anywhere from
            napkin sketch to global scale. With a background in environmental
            engineering and design, I’ve designed for complex enterprise
            applications, cloud platforms, data analytics, AI/ML, and developer
            tools; co-founded a startup; and now work on Google Search.
          </motion.p>

          <motion.p
            className="whatido__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            I believe the best systems are as intuitive as nature, and sometimes
            just as delightfully unexpected.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#work" className="btn-cta">My work</a>
          </motion.div>
        </header>
      </div>
    </section>
  );
}
