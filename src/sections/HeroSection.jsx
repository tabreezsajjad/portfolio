import React, { useMemo } from "react";
import { motion } from "framer-motion";
import './HeroSection.css';

// If you have multiple hero PNGs (already clipped), list them here.
// If you have only one, keep a single item — it will still fade on load.
const HERO_IMAGES = [
  "/images/hero/image1.png",
  "/images/hero/image2.png",
  "/images/hero/image3.png",
  "/images/hero/image4.png",
];

const textItem = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22,1,0.36,1] } }
};

export default function HeroSection() {
  // pick one image per refresh (so it animates each mount)
  const imgSrc = useMemo(() => {
    const i = Math.floor(Math.random() * HERO_IMAGES.length);
    return HERO_IMAGES[i];
  }, []);

  return (
  <section className="hero">
      {/* CONSTRAINED CONTAINER */}
      <div className="hero__wrap">
        <div className="hero__copy">
          <motion.h1 className="hero__title" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:1.1,ease:[0.22,1,0.36,1]}}>
            Hello!<br/>I’m Tej Kalianda
          </motion.h1>
          <motion.p className="hero__lead" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:1.1,delay:0.1,ease:[0.22,1,0.36,1]}}>
            I design thoughtful experiences.<br/>
            I like systems, stories, and baby animals.<br/>
            This is where I put it all together.
          </motion.p>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:1.1,delay:0.2,ease:[0.22,1,0.36,1]}}>
            <a href="#work" className="btn-cta">What I do</a>
          </motion.div>
        </div>

        {/* stays inside container now */}
        <motion.img
          key={imgSrc}
          src={imgSrc}
          alt="Hero"
          className="hero__img"
          initial={{ opacity: 0, y: -8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.22,1,0.36,1] }}
          loading="eager"
        />
      </div>
    </section>
  );
}
