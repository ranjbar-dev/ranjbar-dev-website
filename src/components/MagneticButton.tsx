import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { spring, springConfig } from '../lib/motion'

type Variant = 'primary' | 'ghost'

interface MagneticButtonProps {
  href: string
  children: ReactNode
  variant?: Variant
  /** External links open in a new tab; mailto/tel stay in-page. */
  external?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Anchor CTA with a magnetic pointer pull, spring press feedback and a crimson
 * glow. Collapses to a static, accessible link when reduced motion is set.
 */
export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  external = true,
  ariaLabel,
  className = '',
}: MagneticButtonProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    // Pull at ~30% of the cursor offset for a subtle magnet.
    x.set(relX * 0.3)
    y.set(relY * 0.3)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium cursor-pointer select-none transition-colors duration-200 will-change-transform'

  const styles: Record<Variant, string> = {
    // Fill stays a constant AA-passing crimson (4.95:1 with white); hover
    // feedback is the glow + magnetic scale, not a hue shift (which would dip
    // contrast below 4.5:1).
    primary:
      'bg-accent-cta text-white shadow-[0_0_0_0_var(--color-accent-soft)] hover:shadow-[0_8px_40px_-4px_rgba(229,40,59,0.55)]',
    ghost:
      'border border-border text-text hover:border-accent/70 hover:text-white bg-transparent',
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      transition={spring}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
