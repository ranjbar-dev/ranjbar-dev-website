import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * Brief load curtain: name fades in over a crimson sweep, then the panel
 * lifts away to reveal the hero. Skipped entirely under reduced motion.
 */
export default function Intro() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(reduced ?? false)

  useEffect(() => {
    if (reduced) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setDone(true)
      document.body.style.overflow = ''
    }, 1400)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [reduced])

  if (reduced) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
            >
              Amir Ranjbar
            </motion.p>
          </div>
          <motion.span
            className="absolute bottom-0 left-0 h-[3px] bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
