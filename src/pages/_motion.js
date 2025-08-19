// timing knobs
export const BASE_DELAY = 1.2;   // increase to 1.6–2.0 for extra delay
export const BASE_DURATION = 1.6;

export const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: BASE_DELAY,
      duration: BASE_DURATION,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
