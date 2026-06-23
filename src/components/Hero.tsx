import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { Send, Github, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { LINKS } from '../lib/site'
import { spring, springConfig, motionSet, easeReveal } from '../lib/motion'

const NAME_WORDS = ['Amir', 'Ranjbar']

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const v = motionSet(reduced)
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll parallax: portrait drifts slower than the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  // Pointer parallax tilt on the portrait.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), springConfig)
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), springConfig)

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function resetPointer() {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-24 pb-16 sm:px-10 lg:px-16"
    >
      {/* Quiet ambient crimson glow behind the type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[42rem] w-[42rem] rounded-full opacity-50 blur-[140px]"
        style={{ background: 'var(--color-accent-soft)' }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* ── Left: type ─────────────────────────────────────────────── */}
        <motion.div style={reduced ? undefined : { y: textY }}>
          <motion.p
            initial="hidden"
            animate="show"
            variants={v.block}
            className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent-bright sm:text-sm"
          >
            Full-Stack Software Engineer
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={v.container}
            className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.92] tracking-tight"
          >
            {NAME_WORDS.map((word) => (
              <span key={word} className="block overflow-hidden">
                <motion.span variants={v.item} className="block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={v.block}
            transition={{ ...easeReveal, delay: reduced ? 0 : 0.35 }}
            className="mt-8 max-w-xl font-display text-2xl font-medium leading-snug text-text sm:text-3xl"
          >
            I build the <span className="text-accent">backend of crypto.</span>
          </motion.p>

          <motion.p
            initial="hidden"
            animate="show"
            variants={v.block}
            transition={{ ...easeReveal, delay: reduced ? 0 : 0.45 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Go · Blockchain · Full-stack. Open-source wallet infrastructure used by
            developers worldwide.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={v.block}
            transition={{ ...easeReveal, delay: reduced ? 0 : 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href={LINKS.telegram}
              ariaLabel="Message Amir on Telegram"
            >
              <Send className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
              Message me on Telegram
            </MagneticButton>
            <MagneticButton
              href={LINKS.github}
              variant="ghost"
              ariaLabel="View Amir's GitHub profile"
            >
              <Github className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
              View GitHub
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── Right: treated portrait ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: reduced ? 0 : 0.2 }}
          style={reduced ? undefined : { y: photoY, perspective: 1000 }}
          className="mx-auto w-full max-w-sm lg:max-w-md"
        >
          <motion.div
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
            style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border [transform-style:preserve-3d]"
          >
            {/* Crimson base for the duotone */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, var(--color-accent) 0%, #0a0a0b 90%)',
              }}
            />
            <motion.img
              src="/amir.jpg"
              width={720}
              height={900}
              alt="Portrait of Amir Ranjbar"
              loading="eager"
              decoding="async"
              style={reduced ? undefined : { scale: photoScale }}
              className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-luminosity grayscale contrast-[1.05]"
            />
            {/* Bottom fade into the page */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background: 'linear-gradient(to top, var(--color-bg), transparent)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-white/5"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Animated scroll cue ─────────────────────────────────────── */}
      <motion.a
        href="#about"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 cursor-pointer text-text-muted transition-colors duration-200 hover:text-accent"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="block"
        >
          <ArrowDown className="h-6 w-6" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}
