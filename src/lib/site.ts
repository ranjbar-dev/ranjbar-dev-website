// Centralized site content & links (single source of truth).
export const EMAIL = 'amirranjbar.dev@gmail.com'

export const LINKS = {
  telegram: 'https://t.me/ranjbardev',
  github: 'https://github.com/ranjbar-dev',
  email: `mailto:${EMAIL}`,
} as const

export const GITHUB_REPO_COUNT = 56 // editable per PRD §6.4

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Go', 'PHP', 'Dart', 'TypeScript', 'JavaScript'] },
  { label: 'Backend', items: ['Golang', 'Laravel', 'PostgreSQL', 'Docker'] },
  { label: 'Frontend', items: ['Vue', 'Nuxt', 'Tailwind'] },
  { label: 'Mobile', items: ['Flutter'] },
  {
    label: 'Blockchain',
    items: ['Tron', 'Bitcoin', 'Ethereum', 'Litecoin', 'Smart Contracts'],
  },
]

// Flat list for the kinetic marquee.
export const MARQUEE_ITEMS: string[] = [
  'Go',
  'Blockchain',
  'PostgreSQL',
  'Docker',
  'Laravel',
  'Vue',
  'Nuxt',
  'Flutter',
  'TypeScript',
  'Tron',
  'Bitcoin',
  'Ethereum',
  'Litecoin',
  'Smart Contracts',
  'Tailwind',
  'PHP',
  'Dart',
]
