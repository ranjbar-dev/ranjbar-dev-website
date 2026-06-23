import { useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { motionSet, viewportOnce, spring } from '../lib/motion'
import { LINKS, GITHUB_REPO_COUNT } from '../lib/site'

function CountUp({ to, reduced }: { to: number; reduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      count.set(to)
      return
    }
    const controls = animate(count, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] })
    return controls.stop
  }, [inView, to, reduced, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function GitHubBand() {
  const reduced = useReducedMotion() ?? false
  const v = motionSet(reduced)

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      {/* Drifting glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/3 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(229,40,59,0.22), transparent 65%)' }}
        animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={v.container}
        className="relative mx-auto flex max-w-7xl flex-col items-start gap-10"
      >
        <motion.h2
          variants={v.block}
          className="max-w-4xl font-display text-[clamp(2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight"
        >
          <span className="text-accent">
            <CountUp to={GITHUB_REPO_COUNT} reduced={reduced} /> repositories.
          </span>{' '}
          Open-source wallet infrastructure, trusted by developers.
        </motion.h2>

        <motion.a
          variants={v.block}
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Amir's GitHub profile"
          whileHover={reduced ? undefined : { x: 6 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          transition={spring}
          className="group inline-flex cursor-pointer items-center gap-4 font-display text-2xl font-medium text-text transition-colors duration-200 hover:text-accent sm:text-4xl"
        >
          View my GitHub
          <ArrowRight
            aria-hidden="true"
            className="h-8 w-8 transition-transform duration-200 group-hover:translate-x-2 sm:h-12 sm:w-12"
          />
        </motion.a>
      </motion.div>
    </section>
  )
}
