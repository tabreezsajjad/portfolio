import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug } from "../api/projectWp"; // Ensure this path is correct
import "./ProjectDetails.css";

// Animation variants for Framer Motion
const fade = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectDetails() {
  const { slug } = useParams(); // Get the slug from the URL (e.g., /work/my-project-slug)
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This flag prevents state updates if the component unmounts during a fetch
    let alive = true;

    const fetchPost = async () => {
      setLoading(true);
      
      // For debugging: Check what slug is being used for the API call
      console.log("Fetching post with slug:", slug);

      try {
        const data = await getPostBySlug(slug);
        
        // For debugging: See what the API returned
        console.log("Data received from API:", data);

        if (alive) {
          setPost(data); // `data` will be the post object or `null` if not found
          // Set the document title if the post was found and has a title
          if (data?.hero?.title) {
            document.title = `${data.hero.title} – Work`;
          }
        }
      } catch (error) {
        console.error("Failed to fetch project details:", error);
        // Optionally set an error state here to show a message to the user
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    };

    fetchPost();
    window.scrollTo(0, 0); // Scroll to top on component mount

    // Cleanup function to run when the component unmounts
    return () => {
      alive = false;
    };
  }, [slug]); // Re-run the effect if the slug changes

  // 1. Loading State
  if (loading) {
    return (
      <div className="proj proj--loading">
        <p>Loading project...</p>
      </div>
    );
  }

  // 2. Not Found State (API returned null)
  if (!post) {
    return (
      <div className="proj proj--empty">
        <p>That project doesn’t exist.</p>
        <Link to="/work" className="proj__back">← Back to Work</Link>
      </div>
    );
  }

  // 3. Success State (Post data is available)
  return (
    <main className="proj" aria-labelledby="proj-title">
      {/* Render structured data from ACF */}
      <div className="proj__head">
        <motion.h1 id="proj-title" className="proj__title" variants={fade} initial="hidden" animate="show">
          {post.hero.title}
        </motion.h1>
        {post.hero.subtitle && (
          <motion.p className="proj__lead" variants={fade} initial="hidden" animate="show">
            {post.hero.subtitle}
          </motion.p>
        )}
        {post.hero.smallDetails && (
          <motion.div className="proj__small-details" variants={fade} initial="hidden" animate="show">
            {post.hero.smallDetails}
          </motion.div>
        )}
      </div>

      {post.hero.image && (
        <motion.figure className="proj__hero" variants={fade} initial="hidden" animate="show">
          <img src={post.hero.image} alt={`${post.hero.title} hero`} />
        </motion.figure>
      )}

      {/* Render free-form content from the Gutenberg editor */}
      {post.content && (
        <motion.section
          className="proj__content about-body" // Reusing your existing CSS classes
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {/* Footer navigation */}
      <div className="proj__footer">
        <button className="proj__back" onClick={() => nav(-1)}>← Back</button>
        <Link className="proj__back" to="/work">All projects</Link>
      </div>
    </main>
  );
}
