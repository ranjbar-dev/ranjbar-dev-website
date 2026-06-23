import { motion, useReducedMotion } from 'framer-motion'
import { motionSet, viewportOnce } from '../lib/motion'
import { SKILL_GROUPS, MARQUEE_ITEMS } from '../lib/site'

function Marquee({ reduced }: { reduced: boolean }) {
  // Two copies back-to-back so the -50% loop is seamless.
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      className="relative flex overflow-hidden border-y border-border py-6"
      aria-hidden="true"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10 will-change-transform"
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reduced
            ? undefined
            : { repeat: Infinity, ease: 'linear', duration: 28 }
        }
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-3xl font-medium text-text-muted sm:text-4xl"
          >
            {item}
            <span className="text-accent">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const reduced = useReducedMotion() ?? false
  const v = motionSet(reduced)

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={v.block}
          className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent-bright"
        >
          Stack
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={v.block}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight"
        >
          The tools I build with.
        </motion.h2>
      </div>

      <Marquee reduced={reduced} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={v.container}
        className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-6 sm:grid-cols-3 sm:px-10 lg:grid-cols-5 lg:px-16"
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div key={group.label} variants={v.item}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
              {group.label}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="group inline-flex cursor-default flex-col text-lg font-medium text-text transition-transform duration-200 hover:-translate-y-0.5">
                    {item}
                    <span className="mt-0.5 h-px w-0 bg-accent shadow-[0_0_8px_var(--color-accent)] transition-all duration-200 group-hover:w-full" />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
