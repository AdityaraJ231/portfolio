import { Github, Linkedin, Mail } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' }
]

export default function Footer() {
  return (
    <footer className="border-t border-base-border py-14">
      <div className="container-px flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-display font-extrabold text-lg mb-2">ADITYA RAJ</p>
          <p className="text-gray-500 text-sm">Turning Data Into Actionable Insights</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/adityaraj-placeholder"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-base-border text-gray-400 hover:text-white hover:border-accent-red transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/adityaraj-placeholder"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-base-border text-gray-400 hover:text-white hover:border-accent-red transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:aditya.raj.placeholder@example.com"
            aria-label="Email"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-base-border text-gray-400 hover:text-white hover:border-accent-red transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <p className="container-px text-gray-600 text-xs mt-10">
        © 2026 Aditya Raj. All rights reserved.
      </p>
    </footer>
  )
}
