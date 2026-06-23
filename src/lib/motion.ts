import type { Variants, Transition, SpringOptions } from 'framer-motion'

// Shared spring used for interactive / confident reveals (PRD §5 motion).
export const spring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// Same physics, typed for useSpring() (which takes SpringOptions, not Transition).
export const springConfig: SpringOptions = {
  stiffness: 300,
  damping: 30,
}

// Eased reveal for whileInView section content.
export const easeReveal: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // easeOut-ish
}

// Standard viewport config for scroll reveals.
export const viewportOnce = { once: true, amount: 0.3 } as const

// Container that staggers its children (lists, word-by-word headings).
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

// A single word/line springing up into place.
export const springUp: Variants = {
  hidden: { opacity: 0, y: '0.5em' },
  show: { opacity: 1, y: 0, transition: spring },
}

// Generic fade + rise for section blocks.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: easeReveal },
}

// Line that clips up from behind a mask (used in About).
export const clipUp: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0, transition: easeReveal },
}

// Reduced-motion equivalents: opacity only, instant, no transforms.
export const reducedContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0 } },
}

export const reducedItem: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.001 } },
}

/** Pick the right variant set based on the user's motion preference. */
export function motionSet(reduced: boolean) {
  return {
    container: reduced ? reducedContainer : staggerContainer,
    item: reduced ? reducedItem : springUp,
    block: reduced ? reducedItem : fadeUp,
    line: reduced ? reducedItem : clipUp,
  }
}
