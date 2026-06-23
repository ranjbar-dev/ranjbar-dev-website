import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * A soft crimson glow that trails the pointer, blended over the dark page.
 * Only mounts on fine-pointer (mouse) devices and when motion is allowed.
 */
export default function CursorGlow() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 200, damping: 30, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 200, damping: 30, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      style={{ mixBlendMode: 'screen' }}
    >
      <motion.div
        className="absolute h-[36rem] w-[36rem] rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(229,40,59,0.18) 0%, rgba(229,40,59,0.06) 35%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
