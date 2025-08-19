import React from "react";
import { motion } from "framer-motion";
import { item } from "./_motion";

export default function Work(){
  return (
    <section>
      <motion.h1 variants={item} initial="hidden" animate="show">Selected Work</motion.h1>
      <motion.p variants={item} initial="hidden" animate="show">Projects will appear here.</motion.p>
    </section>
  );
}
