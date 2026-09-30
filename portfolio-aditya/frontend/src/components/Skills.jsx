import { motion } from 'framer-motion'
import { Code2, BrainCircuit, BarChart3, Wrench, CheckCircle2 } from 'lucide-react'
import { skillCategories } from '../data/skills'

const icons = { Code2, BrainCircuit, BarChart3, Wrench }

export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="container-px">
        <div className="mb-16">
          <p className="text-accent-red font-semibold mb-3">What I Know</p>
          <h2 className="section-heading">Technical Skills</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon]
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-7 hover:border-accent-purple/50 hover:shadow-glowPurple transition-all duration-300"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-base border border-base-border mb-5">
                  <Icon size={20} className="text-accent-red" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-4">{cat.title}</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 size={14} className="text-accent-red/70 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
