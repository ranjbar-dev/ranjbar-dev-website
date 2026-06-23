import { motion, useReducedMotion } from 'framer-motion'
import { Send, Github, Mail, ArrowUp } from 'lucide-react'
import { LINKS, EMAIL } from '../lib/site'
import { spring } from '../lib/motion'

const socials = [
  { label: 'Telegram', href: LINKS.telegram, icon: Send, external: true },
  { label: 'GitHub', href: LINKS.github, icon: Github, external: true },
  { label: `Email ${EMAIL}`, href: LINKS.email, icon: Mail, external: false },
]

export default function Footer() {
  const reduced = useReducedMotion() ?? false

  function toTop() {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-border px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
        <nav aria-label="Social links" className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              whileHover={reduced ? undefined : { y: -3 }}
              whileTap={reduced ? undefined : { scale: 0.92 }}
              transition={spring}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-text-muted transition-colors duration-200 hover:border-accent/70 hover:text-accent"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </motion.a>
          ))}
        </nav>

        <p className="order-last text-sm text-text-muted sm:order-none">
          © 2026 Amir Ranjbar.{' '}
          <span className="text-text-muted">Built with React + Framer Motion.</span>
        </p>

        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          whileHover={reduced ? undefined : { y: -3 }}
          whileTap={reduced ? undefined : { scale: 0.92 }}
          transition={spring}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-text-muted transition-colors duration-200 hover:border-accent/70 hover:text-accent"
        >
          Back to top
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </div>
    </footer>
  )
}
