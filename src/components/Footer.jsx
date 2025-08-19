import React from "react";
import { motion } from "framer-motion";
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Footer">
      {/* Top message area */}
      <motion.div
        className="footer__top"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="footer__grid">
          <div className="footer__art">
            {/* Replace path with your actual illustration */}
            <img src="/images/footer/dog.png" alt="" aria-hidden="true" />
          </div>

          <div className="footer__text">
            <h2 className="footer__title">
              <span className="paw">Paws</span> and reflect,<br />
              you’ve reached the end.
            </h2>

            <p className="footer__label">Want to get in touch?</p>
            <a className="footer__email" href="mailto:tejkalianda@gmail.com">
              tejkalianda@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Credits bar */}
      <div className="footer__bar">
        <div className="footer__bar-inner">
          <span>
            Illustrations by the incredibly talented{" "}
            <a href="#" rel="noreferrer">Ankita Gogoi</a>
          </span>
          <span>
            Website developed by the magician{" "}
            <a href="#" rel="noreferrer">Preetom Gogoi</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
