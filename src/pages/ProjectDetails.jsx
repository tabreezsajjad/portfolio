import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug } from "../api/projectWp";
import "./ProjectDetails.css";

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
  const { slug } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ref to the rendered Gutenberg content so we can decorate it
  const contentRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getPostBySlug(slug);
        if (!alive) return;
        setPost(data);
        if (data?.hero?.title) document.title = `${data.hero.title} – Work`;
      } catch (e) {
        console.error("Project load error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    window.scrollTo(0, 0);
    return () => { alive = false; };
  }, [slug]);

  // Decorate the DOM: auto plates + icon normalization
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    // remove previous pass (strict mode / re-renders)
    root.querySelectorAll(".proj__plate").forEach((p) => {
      const frag = document.createDocumentFragment();
      while (p.firstChild) frag.appendChild(p.firstChild);
      p.replaceWith(frag);
    });
    root.querySelectorAll(".wp-block-group.is-plate").forEach((el) => {
      el.classList.remove("is-plate", "plate-1", "plate-2", "plate-3", "plate-4");
    });

    // 1) If there are top-level Gutenberg Groups, color them
    const topGroups = Array.from(root.children).filter((el) =>
      el.classList?.contains("wp-block-group")
    );
    let plateIdx = 0;
    if (topGroups.length) {
      topGroups.forEach((el) => {
        el.classList.add("is-plate", `plate-${(plateIdx % 4) + 1}`);
        plateIdx++;
      });
    } else {
      // 2) No groups → build “plates” by splitting at each H2
      const kids = Array.from(root.children);
      const makePlate = (i) => {
        const plate = document.createElement("div");
        plate.className = `proj__plate plate-${(i % 4) + 1}`;
        return plate;
      };

      let current = null;
      kids.forEach((el) => {
        const isSplit = el.matches("h2, .wp-block-heading h2");
        if (!current || isSplit) {
          current = makePlate(plateIdx++);
          el.before(current);
        }
        current.appendChild(el);
      });
    }

    // 3) Icon normalization (png/svg). You can hint with alt="icon: name".
    const normalizeIcon = (img) => {
      const alt = (img.getAttribute("alt") || "").toLowerCase();
      const rect = img.getBoundingClientRect();
      const small = rect.width && rect.height && rect.width <= 160 && rect.height <= 160;

      if (alt.startsWith("icon:") || small) {
        img.classList.add("proj-icon");
        const fig = img.closest("figure.wp-block-image");
        if (fig) {
          fig.classList.add("is-icon");
          const prev = fig.previousElementSibling;
          if (prev && prev.tagName === "P") fig.classList.add("is-note"); // “icon below text” look
        }
      }
    };

    root.querySelectorAll("figure.wp-block-image img").forEach((img) => {
      if (img.complete) normalizeIcon(img);
      else img.addEventListener("load", () => normalizeIcon(img), { once: true });
    });
  }, [post?.content]);

  if (loading) return <div className="proj proj--loading"><p>Loading project...</p></div>;

  if (!post) {
    return (
      <div className="proj proj--empty">
        <p>That project doesn’t exist.</p>
        <Link to="/work" className="proj__back">← Back to Work</Link>
      </div>
    );
  }

  const smallDetails = post.hero.smallDetails || post.hero.small || "";

  return (
    <main className="proj" aria-labelledby="proj-title">
      {post.hero.image && (
        <motion.figure className="proj__hero" variants={fade} initial="hidden" animate="show">
          <img src={post.hero.image} alt={`${post.hero.title} hero`} />
        </motion.figure>
      )}

      <div className="proj__head">
        <motion.h1 id="proj-title" className="proj__title" variants={fade} initial="hidden" animate="show">
          {post.hero.title}
        </motion.h1>
        {post.hero.subtitle && (
          <motion.p className="proj__lead" variants={fade} initial="hidden" animate="show">
            {post.hero.subtitle}
          </motion.p>
        )}
        {!!smallDetails && (
          <motion.div className="proj__small-details" variants={fade} initial="hidden" animate="show">
            {smallDetails}
          </motion.div>
        )}
      </div>

      {post.content && (
        <motion.section
          ref={contentRef}
          className="proj__content"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      <div className="proj__footer">
        <button className="proj__back" onClick={() => nav(-1)}>← Back</button>
        <Link className="proj__back" to="/work">All projects</Link>
      </div>
    </main>
  );
}
