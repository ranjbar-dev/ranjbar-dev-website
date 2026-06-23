import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { motionSet, viewportOnce, spring } from '../lib/motion'
import { LINKS, GITHUB_REPO_COUNT } from '../lib/site'

export default function GitHubBand() {
  const reduced = useReducedMotion() ?? false
  const v = motionSet(reduced)

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/3 rounded-full opacity-60 blur-[130px]"
        style={{ background: 'var(--color-accent-soft)' }}
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
          <span className="text-accent">{GITHUB_REPO_COUNT} repositories.</span>{' '}
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
