import { motion } from 'framer-motion'
import { Database, LineChart, Cpu, Server } from 'lucide-react'

const whatIDo = [
  {
    icon: Database,
    title: 'Data Analysis',
    desc: 'Clean, process and analyze structured datasets to discover meaningful insights.'
  },
  {
    icon: LineChart,
    title: 'Data Visualization',
    desc: 'Create interactive dashboards and visual reports using Power BI, Excel, and Python.'
  },
  {
    icon: Cpu,
    title: 'Machine Learning',
    desc: 'Build and evaluate machine-learning models for prediction and classification tasks.'
  },
  {
    icon: Server,
    title: 'Python & SQL',
    desc: 'Use Python and SQL for data processing, analysis, database operations, and automation.'
  }
]

const stats = [
  { value: '50K+', label: 'Records Analyzed' },
  { value: 'Multiple', label: 'Data Projects' },
  { value: '4+', label: 'Technical Domains' },
  { value: '2024–2028', label: 'BTech CSE' }
]

const interests = [
  'Data Analytics',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'Computer Vision',
  'Python',
  'Power BI'
]

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container-px">
        <div className="mb-16">
          <p className="text-accent-red font-semibold mb-3">About Me</p>
          <h2 className="section-heading">Data Analytics &amp; AI Enthusiast</h2>
        </div>

        <div className="grid lg:grid-cols-[0.85fr,1.15fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-base-border">
              <img
                src="/src/assets/images/about.jpg"
                alt="Aditya Raj"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.classList.add(
                    'flex', 'items-center', 'justify-center', 'bg-base-card', 'text-gray-500', 'text-sm', 'text-center', 'p-6'
                  )
                  e.currentTarget.parentElement.innerText = 'Add a photo at src/assets/images/about.jpg'
                }}
              />
            </div>
          </motion.div>

          <div>
            <p className="text-gray-400 leading-relaxed mb-4">
              I am Aditya Raj, currently pursuing a Bachelor of Technology in Computer Science
              Engineering at Lovely Professional University. I am interested in Data Analytics,
              Data Science, Machine Learning, and Artificial Intelligence.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              I enjoy working with data, building dashboards, developing predictive models, and
              creating practical software solutions.
            </p>

            <h3 className="font-display font-semibold text-xl mb-5">What I Do</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {whatIDo.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-5 hover:border-accent-red/60 transition-colors">
                  <Icon size={20} className="text-accent-red mb-3" />
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="card p-5 text-center">
                  <p className="font-display font-bold text-2xl sm:text-3xl">{s.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <h3 className="font-display font-semibold text-xl mb-4">My Interests</h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
