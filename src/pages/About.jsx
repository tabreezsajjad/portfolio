import React from "react";
import { motion } from "framer-motion";
import { item } from "./_motion";

export default function About(){
  return (
    <section>
      <motion.h1 variants={item} initial="hidden" animate="show">About</motion.h1>
      <motion.p variants={item} initial="hidden" animate="show">
        Short bio and philosophy.
      </motion.p>
    </section>
  );
}
