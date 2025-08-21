
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 1. A container that reveals its children with a stagger effect
export const StaggeredReveal = ({ children, ...props }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Time delay between each child animating in
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the element is in view
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 2. A basic child item that fades and slides in from the bottom
export const FadeInUp = ({ children, ...props }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
};

// 3. A simple parallax component
// It moves its children vertically based on scroll position
export const Parallax = ({ children, speed = 0.5, ...props }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Track scroll from when the element enters to when it leaves
  });

  // `useTransform` maps the scroll progress (0 to 1) to a y-position
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', `${20 * speed}%`]);

  return (
    <div ref={ref} style={{ overflow: 'hidden' }} {...props}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};
