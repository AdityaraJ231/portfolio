import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !dark)
  }, [dark])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-base/80 backdrop-blur-lg border-b border-base-border' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex items-center justify-between h-[76px]">
        <a href="#home" className="font-display font-extrabold tracking-tight text-lg sm:text-xl">
          ADITYA RAJ
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative py-1 transition-colors hover:text-white ${
                  active === link.href.slice(1) ? 'text-white' : ''
                }`}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-red rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle color theme"
            onClick={() => setDark((d) => !d)}
            className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-base-border text-gray-300 hover:text-white hover:border-accent-red transition-colors"
          >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-base-border text-white"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-base/95 backdrop-blur-lg border-t border-base-border">
          <ul className="flex flex-col container-px py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-base font-medium border-b border-base-border/60 ${
                    active === link.href.slice(1) ? 'text-accent-red' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
