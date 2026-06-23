import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion'
import { motionSet, viewportOnce } from '../lib/motion'
import { SKILL_GROUPS, MARQUEE_ITEMS } from '../lib/site'

// Cycle a value within [min, max).
const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

const COPIES = 4

function VelocityMarquee({
  items,
  baseVelocity,
  reduced,
}: {
  items: string[]
  baseVelocity: number
  reduced: boolean
}) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  // Skew the row with scroll velocity for a kinetic, rubbery feel.
  const skew = useTransform(smoothVelocity, [-2000, 2000], [8, -8], { clamp: true })

  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`)
  const directionFactor = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative flex overflow-hidden py-4" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <motion.div
        className="flex shrink-0 will-change-transform"
        style={reduced ? undefined : { x, skewX: skew }}
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          items.map((item, i) => (
            <span
              key={`${copy}-${item}-${i}`}
              className="flex shrink-0 items-center gap-8 pr-8 font-display text-3xl font-medium text-text-muted sm:text-4xl"
            >
              {item}
              <span className="text-accent">/</span>
            </span>
          )),
        )}
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

      {/* Two counter-moving, velocity-reactive marquees */}
      <div className="flex flex-col gap-2 border-y border-border py-4">
        <VelocityMarquee items={MARQUEE_ITEMS} baseVelocity={3} reduced={reduced} />
        <VelocityMarquee
          items={[...MARQUEE_ITEMS].reverse()}
          baseVelocity={-3}
          reduced={reduced}
        />
      </div>

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
                  <motion.span
                    whileHover={reduced ? undefined : { y: -2, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="group inline-flex cursor-default flex-col text-lg font-medium text-text transition-colors duration-200 hover:text-white hover:[text-shadow:0_0_18px_var(--color-accent-soft)]"
                  >
                    {item}
                    <span className="mt-0.5 h-px w-0 bg-accent shadow-[0_0_8px_var(--color-accent)] transition-all duration-200 group-hover:w-full" />
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
