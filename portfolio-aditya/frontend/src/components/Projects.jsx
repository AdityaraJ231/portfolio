import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="container-px">
        <div className="mb-16">
          <p className="text-accent-red font-semibold mb-3">Selected Work</p>
          <h2 className="section-heading">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group card overflow-hidden hover:-translate-y-2 hover:border-accent-red/50 hover:shadow-glowRed transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-base">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add(
                      'flex', 'items-center', 'justify-center', 'text-gray-600', 'text-xs', 'text-center', 'p-4'
                    )
                    e.currentTarget.parentElement.innerText = `Add thumbnail: ${project.image}`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-card via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full border border-base-border text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 text-sm font-medium">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-white hover:text-accent-red transition-colors"
                    >
                      View Project <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-gray-600">
                      View Project <ExternalLink size={14} />
                    </span>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
