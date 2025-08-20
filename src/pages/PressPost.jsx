import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug, featuredSrc, featuredAlt, formatDate, readingTime } from "../api/wp";
import "./Press.css";
import "./Blog.css"; // reuse article typography

const EASE = [0.22, 1, 0.36, 1];

export default function PressPost(){
  const { slug } = useParams();
  const [item, setItem] = useState(null);

  useEffect(()=>{ getPostBySlug(slug).then(setItem).catch(console.error); },[slug]);

  if(!item){
    return <section className="press"><div className="press__wrap"><div className="skeleton skeleton--article" /></div></section>;
  }

  const readMin = readingTime(item.content?.rendered);

  return (
    <section className="press">
      <div className="press__wrap press__wrap--narrow">
        <motion.header className="article__header"
          initial={{opacity:0, y:12}} animate={{opacity:1, y:0}}
          transition={{duration:1.0, ease:EASE}}
        >
          <div className="crumb">
            <Link to="/press" className="crumb__link">Press</Link>
            <span className="crumb__sep">/</span>
            <span className="crumb__curr" dangerouslySetInnerHTML={{__html: item.title.rendered}} />
          </div>

          <h1 className="article__title" dangerouslySetInnerHTML={{__html: item.title.rendered}} />
          <div className="article__meta">
            {formatDate(item.date)} · {readMin} min read
          </div>

          {featuredSrc(item) && (
            <div className="article__hero">
              <img src={featuredSrc(item)} alt={featuredAlt(item) || item.title?.rendered} />
            </div>
          )}
        </motion.header>

        <motion.article
          className="article__content wp-content"
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.35, duration:1.0, ease:EASE}}
          dangerouslySetInnerHTML={{__html: item.content.rendered}}
        />
      </div>
    </section>
  );
}
