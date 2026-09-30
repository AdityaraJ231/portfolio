import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' }
  })
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Oversized background wordmark */}
      <div className="pointer-events-none select-none absolute inset-x-0 top-[18%] flex justify-center">
        <span className="font-display font-extrabold text-[22vw] leading-none text-accent-red/15 tracking-tighter">
          ADITYA
        </span>
      </div>

      <div className="container-px relative w-full grid lg:grid-cols-[1.1fr,0.9fr] gap-14 items-center">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-accent-red font-semibold tracking-wide mb-4"
          >
            Data Analyst
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight mb-6"
          >
            Aditya Raj
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-lg text-gray-400 mb-3"
          >
            Data Science &amp; Machine Learning Enthusiast
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="text-gray-400 max-w-xl leading-relaxed mb-10"
          >
            I am a BTech Computer Science Engineering student passionate about Data Analytics,
            Data Science, Machine Learning, and building intelligent applications that turn data
            into meaningful insights.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-base-border shadow-glowRed">
            {/* Replace this image at src/assets/images/profile.jpg */}
            <img
              src="/src/assets/images/profile.jpg"
              alt="Aditya Raj"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.classList.add(
                  'flex', 'items-center', 'justify-center', 'bg-base-card', 'text-gray-500', 'text-sm', 'text-center', 'p-6'
                )
                e.currentTarget.parentElement.innerText = 'Add your photo at src/assets/images/profile.jpg'
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Floating social icons */}
      <div className="hidden md:flex flex-col gap-4 fixed right-6 bottom-28 z-40">
        <SocialIcon href="https://github.com/adityaraj-placeholder" label="GitHub">
          <Github size={18} />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com/in/adityaraj-placeholder" label="LinkedIn">
          <Linkedin size={18} />
        </SocialIcon>
        <SocialIcon href="mailto:aditya.raj.placeholder@example.com" label="Email">
          <Mail size={18} />
        </SocialIcon>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white transition-colors animate-bounce"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-11 h-11 flex items-center justify-center rounded-full border border-base-border bg-base-card/70 backdrop-blur text-gray-300 hover:text-white hover:border-accent-red hover:shadow-glowRed transition-all"
    >
      {children}
    </a>
  )
}
