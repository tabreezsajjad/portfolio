import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlog, featuredSrc, featuredAlt, formatDate } from "../api/wp";
import "./Blog.css";

const EASE = [0.22, 1, 0.36, 1];
const grid = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { delayChildren: 0.7, staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 1.1, ease: EASE } }
};

export default function Blog(){
  const [posts, setPosts] = useState(null);
  useEffect(()=>{ getBlog().then(setPosts).catch(console.error); }, []);

  return (
    <section className="blog">
      <div className="blog__wrap">
        <header className="blog__header">
          <h1 className="blog__title">Thoughts, notes & updates</h1>
          <p className="blog__lead">Design, craft, and the tiny details that make products feel alive.</p>
        </header>

        <motion.div className="blog__grid" variants={grid} initial="hidden" animate="show">
          {!posts && Array.from({length:6}).map((_,i)=>(
            <div key={i} className="post skeleton">
              <div className="skeleton__media" />
              <div className="skeleton__line" />
            </div>
          ))}

          {posts?.map(p => (
            <motion.article key={p.id} className="post" variants={item}>
              <Link to={`/blog/${p.slug}`} className="post__link">
                <div className="post__media">
                  {featuredSrc(p) && <img src={featuredSrc(p)} alt={featuredAlt(p) || p.title?.rendered} loading="lazy" />}
                </div>
                <h2 className="post__title" dangerouslySetInnerHTML={{__html:p.title.rendered}} />
                <div className="post__meta">{formatDate(p.date)}</div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
