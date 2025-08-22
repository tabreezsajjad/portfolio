import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Footer.css";

/** Place video files in /public/videos
 *  If file names have spaces (e.g., "5 cat.mp4"), encodeURI() below handles it.
 */
const FOOTER_VARIANTS = [
  {
    video: "/videos/1.mp4",
    text: `<span><strong class='highlight'>Paws</strong> and reflect—</span><br><span>you've reached the end.</span>`,
  },
  {
    video: "/videos/2cat.mp4",
    text: `<span><strong class='highlight'>Feline</strong> like this</span><br><span>is the end?</span>`,
  },
  {
    video: "/videos/3otter.webm",
    text: `<span>Thanks for scrolling.</span><br><span>You <strong class='highlight'>otter</strong> come back soon.</span>`,
  },
  {
    video: "/videos/5 cat.mp4",
    text: `<span>You've reached the bottom.</span><br><span>It's <strong class='highlight'>un-fur-gettable</strong> down here.</span>`,
  },
  {
    video: "/videos/6 bear.mp4",
    text: `<span><strong class='highlight'>Bear</strong> with me,</span><br><span>it's the footer.</span>`,
  },
  {
    video: "/videos/7 fox.mp4",
    text: `<span>That's all,</span><br><span><strong class='highlight'>fox</strong>!</span>`,
  },
  {
    video: "/videos/8 bushy tail.mp4",
    text: `<span>You've reached</span><br><span>the <strong class='highlight'>tail</strong> end.</span>`,
  },
  {
    video: "/videos/9 alpaca.mp4",
    text: `<span><strong class='highlight'>Alpaca</strong> some links</span><br><span>before you go.</span>`,
  },
  {
    video: "/videos/10. seal.mp4",
    text: `<span><strong class='highlight'>Seal</strong> you</span><br><span>later!</span>`,
  },
  {
    video: "/videos/11. koi.mp4",
    text: `<span>You've reached the bottom.</span><br><span>It's <strong class='highlight'>un-fur-gettable</strong> down here.</span>`,
  },
  {
    video: "/videos/12. bird.mp4",
    text: `<span>You've reached the bottom.</span><br><span>It's <strong class='highlight'>un-fur-gettable</strong> down here.</span>`,
  },
  {
    video: "/videos/13. alpaca.mp4",
    text: `<span><strong class='highlight'>Alpaca</strong> some links</span><br><span>before you go.</span>`,
  },
];

function randomFooterItem() {
  const i = Math.floor(Math.random() * FOOTER_VARIANTS.length);
  return FOOTER_VARIANTS[i];
}

export default function Footer() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(randomFooterItem());
  }, []);

  return (
    <footer className="site-footer" aria-label="Footer">
      {/* Top message area with video + text */}
      <motion.div
        className="footer__top"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="footer__grid footer__grid--video">
          {/* Video */}
          <div className="footer__vidwrap">
            {item ? (
              <motion.video
                key={item.video}                 // restart on mount
                className="footer__video"
                src={encodeURI(item.video)}       // handles spaces in file names
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Looping footer animation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="footer__video ph" />
            )}
          </div>

          {/* Text */}
          <div className="footer__text">
            <h2
              className="footer__title"
              // content controlled by us → safe to inject
              dangerouslySetInnerHTML={{ __html: item?.text || "" }}
            />
            <p className="footer__label">Want to get in touch?</p>
            <a className="footer__email" href="mailto:tejkalianda@gmail.com">
              tejkalianda@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
