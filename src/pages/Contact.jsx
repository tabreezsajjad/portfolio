import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

// timing knobs (slow & premium-feel)
const BASE_DELAY = 1.0;
const EASE = [0.22, 1, 0.36, 1];

const group = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", delayChildren: BASE_DELAY, staggerChildren: 0.14 }
  }
};

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE } }
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to your backend/email service
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="contact">
      <motion.div
        className="contact__wrap"
        variants={group}
        initial="hidden"
        animate="show"
      >
        <motion.header className="contact__header" variants={item}>
          <h1 className="contact__title">Let’s build something delightful</h1>
          <p className="contact__lead">
            Tell me about your project, timeline, and goals. I’ll get back within 1–2 business days.
          </p>
        </motion.header>

        <div className="contact__grid">
          {/* Form card */}
          <motion.div className="contact__card" variants={item}>
            {!submitted ? (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot (spam guard) */}
                <input type="text" name="nickname" tabIndex="-1" autoComplete="off" className="hp" aria-hidden="true" />

                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your full name" autoComplete="name" />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" inputMode="email" />
                </div>

                <div className="field">
                  <label htmlFor="company">Company (optional)</label>
                  <input id="company" name="company" type="text" placeholder="Company or team name" autoComplete="organization" />
                </div>

                <div className="field">
                  <label htmlFor="budget">Budget (optional)</label>
                  <select id="budget" name="budget" defaultValue="">
                    <option value="" disabled>Choose a range</option>
                    <option value="under-2k">Under $2k</option>
                    <option value="2k-10k">$2k – $10k</option>
                    <option value="10k-25k">$10k – $25k</option>
                    <option value="25k-plus">$25k+</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">Project details</label>
                  <textarea id="message" name="message" required rows="6" placeholder="What are we building? Goals, scope, timeline…"></textarea>
                </div>

                <div className="actions">
                  <button type="submit" className="btn-primary">Send message</button>
                  <a className="btn-ghost" href="mailto:tejkalianda@gmail.com">Email instead</a>
                </div>
              </form>
            ) : (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                role="status"
                aria-live="polite"
              >
                <div className="checkmark" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
                    <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Message sent</h3>
                <p>Thanks for reaching out! I’ll be in touch shortly.</p>
                <a className="btn-ghost" href="mailto:tejkalianda@gmail.com">Need to add something? Email me</a>
              </motion.div>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.aside className="contact__aside" variants={item}>
            <div className="aside-card">
              <h3>Direct</h3>
              <a href="mailto:tejkalianda@gmail.com" className="aside-link">tejkalianda@gmail.com</a>
              <div className="hr" />
              <h3>Social</h3>
              <ul className="social">
                <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
                <li><a href="#" aria-label="Dribbble">Dribbble</a></li>
                <li><a href="#" aria-label="X (Twitter)">X</a></li>
              </ul>
              <div className="hr" />
              <h3>Availability</h3>
              <p className="small">Accepting new projects from <strong>next month</strong>.</p>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
