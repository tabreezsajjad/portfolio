import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-inner">
        {/* Brand (pushed further left via CSS) */}
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
  <img src="/images/tej.png" alt="Tej" className="brand-logo" />
        </NavLink>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Primary">
          <HeaderLinks onItemClick={() => setOpen(false)} />
        </nav>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* Mobile menu (collapsible) */}
      <div id="mobile-menu" className={`nav-mobile ${open ? "open" : ""}`}>
        <HeaderLinks onItemClick={() => setOpen(false)} />
      </div>
    </motion.header>
  );
}

function HeaderLinks({ onItemClick = () => {} }) {
  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " is-active" : "");
  return (
    <ul className="nav-list">
      <li><NavLink to="/" end className={linkClass} onClick={onItemClick}>Home</NavLink></li>
      <li><NavLink to="/work" className={linkClass} onClick={onItemClick}>Work</NavLink></li>
      <li><NavLink to="/about" className={linkClass} onClick={onItemClick}>About</NavLink></li>
      <li><NavLink to="/blog" className={linkClass} onClick={onItemClick}>Blog</NavLink></li>
      <li><NavLink to="/press" className={linkClass} onClick={onItemClick}>Press Release</NavLink></li>
    </ul>
  );
}
