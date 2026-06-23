import { motion, useReducedMotion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { motionSet, viewportOnce } from '../lib/motion'
import { LINKS } from '../lib/site'

export default function Contact() {
  const reduced = useReducedMotion() ?? false
  const v = motionSet(reduced)

  return (
    <section
      id="contact"
      className="bg-grain relative px-6 py-28 sm:px-10 sm:py-40 lg:px-16"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={v.container}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.h2
          variants={v.block}
          className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
        >
          Building something in crypto or fintech?{' '}
          <span className="text-accent">Let&rsquo;s talk.</span>
        </motion.h2>

        <motion.div
          variants={v.block}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={LINKS.telegram} ariaLabel="Message Amir on Telegram">
            <Send className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
            Message me on Telegram
          </MagneticButton>
          <MagneticButton
            href={LINKS.email}
            variant="ghost"
            external={false}
            ariaLabel="Email Amir"
          >
            <Mail className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
            Email me
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
