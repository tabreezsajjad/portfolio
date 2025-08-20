import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPress, formatDate } from "../api/wp";
import "./Press.css";

const EASE = [0.22, 1, 0.36, 1];
const group = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { delayChildren: 0.7, staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, x: -10, filter: "blur(6px)" },
  show:   { opacity: 1, x: 0,  filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } }
};

export default function Press(){
  const [items, setItems] = useState(null);
  useEffect(()=>{ getPress().then(setItems).catch(console.error); },[]);

  return (
    <section className="press">
      <div className="press__wrap">
        <header className="press__header">
          <h1 className="press__title">Press releases</h1>
          <p className="press__lead">Announcements, launches and milestones.</p>
        </header>

        <motion.ol className="press__list" variants={group} initial="hidden" animate="show">
          {!items && Array.from({length:6}).map((_,i)=>(
            <li key={i} className="press__row skeleton-line" />
          ))}

          {items?.map(pr => (
            <motion.li key={pr.id} className="press__row" variants={item}>
              <time className="press__date" dateTime={pr.date}>{formatDate(pr.date)}</time>
              <Link className="press__link" to={`/press/${pr.slug}`} dangerouslySetInnerHTML={{__html: pr.title.rendered}} />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
