import { motion, useReducedMotion } from 'framer-motion'
import { motionSet, viewportOnce } from '../lib/motion'
import type { ReactNode } from 'react'

// Each "line" is masked and clips up on scroll into view.
const LINES: ReactNode[] = [
  <>I&rsquo;m a software engineer who builds</>,
  <>
    <span className="text-accent">crypto &amp; fintech infrastructure</span> —
  </>,
  <>
    from <span className="text-accent">Go</span> wallet services
  </>,
  <>to polished product UIs.</>,
]

export default function About() {
  const reduced = useReducedMotion() ?? false
  const v = motionSet(reduced)

  return (
    <section
      id="about"
      className="relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={v.container}
          className="font-display text-[clamp(1.9rem,6vw,4.5rem)] font-medium leading-[1.08] tracking-tight"
        >
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span variants={v.line} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={v.block}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-text-muted"
        >
          My open-source Tron, Bitcoin, and Ethereum packages are used by developers
          around the world. I work end to end and care about systems that are clean,
          secure, and fast.
        </motion.p>
      </div>
    </section>
  )
}
