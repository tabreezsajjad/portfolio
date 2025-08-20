import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug, featuredSrc, featuredAlt, formatDate, readingTime } from "../api/wp";
import "./Blog.css";

const EASE = [0.22, 1, 0.36, 1];

export default function BlogPost(){
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(()=>{ getPostBySlug(slug).then(setPost).catch(console.error); },[slug]);

  if(!post){
    return <section className="blog"><div className="blog__wrap"><div className="skeleton skeleton--article" /></div></section>;
  }

  const readMin = readingTime(post.content?.rendered);

  return (
    <section className="blog">
      <div className="blog__wrap blog__wrap--narrow">
        <motion.header className="article__header"
          initial={{opacity:0, y:12}} animate={{opacity:1, y:0}}
          transition={{duration:1.0, ease:EASE}}
        >
          <div className="crumb">
            <Link to="/blog" className="crumb__link">Blog</Link>
            <span className="crumb__sep">/</span>
            <span className="crumb__curr" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          </div>

          <h1 className="article__title" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          <div className="article__meta">
            {formatDate(post.date)} · {readMin} min read
          </div>

          {featuredSrc(post) && (
            <div className="article__hero">
              <img src={featuredSrc(post)} alt={featuredAlt(post) || post.title?.rendered} />
            </div>
          )}
        </motion.header>

        <motion.article
          className="article__content wp-content"
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:0.35, duration:1.0, ease:EASE}}
          dangerouslySetInnerHTML={{__html: post.content.rendered}}
        />
      </div>
    </section>
  );
}
