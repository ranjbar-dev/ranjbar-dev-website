import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { Send, Github, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { LINKS } from '../lib/site'
import { spring, springConfig, easeReveal } from '../lib/motion'

const NAME_WORDS = ['Amir', 'Ranjbar']

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)

  // Start hero reveals as the intro curtain lifts (curtain begins exit ~1.4s).
  const base = reduced ? 0 : 1.25

  // Scroll parallax: portrait drifts slower than the page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  // Pointer parallax tilt on the portrait.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), springConfig)
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), springConfig)

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

  // Character-level name reveal.
  const nameContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.035, delayChildren: base },
    },
  }
  const char: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: '0.85em', rotateX: -55 },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { type: 'spring', stiffness: 320, damping: 26 },
        },
      }

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-24 pb-16 sm:px-10 lg:px-16"
    >
      {/* ── Animated aurora behind the type ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-1/4 h-[40rem] w-[40rem] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(229,40,59,0.28), transparent 65%)' }}
          animate={reduced ? undefined : { x: [0, 90, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 top-1/2 h-[32rem] w-[32rem] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(229,40,59,0.18), transparent 65%)' }}
          animate={reduced ? undefined : { x: [0, -70, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <motion.div
        style={reduced ? undefined : { opacity: heroFade }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.4fr_1fr]"
      >
        {/* ── Left: type ─────────────────────────────────────────────── */}
        <motion.div style={reduced ? undefined : { y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeReveal, delay: base }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent-bright sm:text-sm"
          >
            Full-Stack Software Engineer
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={nameContainer}
            aria-label="Amir Ranjbar"
            style={{ perspective: 800 }}
            className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-[0.92] tracking-tight"
          >
            {NAME_WORDS.map((word) => (
              <span key={word} className="block overflow-hidden pb-[0.08em]">
                {word.split('').map((c, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={char}
                    aria-hidden="true"
                    className="inline-block origin-bottom will-change-transform"
                  >
                    {c}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeReveal, delay: base + 0.3 }}
            className="mt-8 max-w-xl font-display text-2xl font-medium leading-snug text-text sm:text-3xl"
          >
            I build the{' '}
            <span className="relative inline-block text-accent">
              backend of crypto.
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-accent shadow-[0_0_10px_var(--color-accent)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: base + 0.7 }}
              />
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeReveal, delay: base + 0.4 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Go · Blockchain · Full-stack. Open-source wallet infrastructure used by
            developers worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeReveal, delay: base + 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href={LINKS.telegram} ariaLabel="Message Amir on Telegram">
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
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: base }}
          style={reduced ? undefined : { y: photoY, perspective: 1000 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          {/* Pulsing glow halo */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(229,40,59,0.35), transparent 70%)' }}
            animate={reduced ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [0.96, 1.04, 0.96] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />

          {/* Idle float (separate layer so transforms don't collide) */}
          <motion.div
            animate={reduced ? undefined : { y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="relative"
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
                  background: 'linear-gradient(160deg, var(--color-accent) 0%, #0a0a0b 90%)',
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
                className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-luminosity grayscale contrast-[1.05] transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
              {/* Bottom fade into the page */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }}
              />
              {/* Sheen sweep on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-white/5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Animated scroll cue ─────────────────────────────────────── */}
      <motion.a
        href="#about"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : base + 0.8, duration: 0.6 }}
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
