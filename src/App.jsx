import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import About from "./pages/about/About.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Press from "./pages/Press.jsx";
import PressPost from "./pages/PressPost.jsx"
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import ChatWidget from "./components/ChatWidget/ChatWidget.jsx";

// Slow, classy transitions
const page = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      delayChildren: 0.4,
      staggerChildren: 0.25
    }
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } }
};

export default function App() {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100dvh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <Header />

      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={page}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/press" element={<Press />} />
            <Route path="/press/:slug" element={<PressPost />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ChatWidget />

    </div>
  );
}
