import Intro from './components/Intro'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import GitHubBand from './components/GitHubBand'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Intro />
      <CursorGlow />
      <ScrollProgress />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <main>
        <Hero />
        <About />
        <Skills />
        <GitHubBand />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
