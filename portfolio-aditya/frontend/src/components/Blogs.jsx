import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { blogs } from '../data/blogs'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Blogs() {
  return (
    <section id="blogs" className="relative py-28">
      <div className="container-px">
        <div className="mb-16">
          <p className="text-accent-red font-semibold mb-3">Writing</p>
          <h2 className="section-heading">Blogs</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {blogs.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-7 hover:border-accent-red/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <span className="text-accent-red font-medium">{post.category}</span>
                <span>&middot;</span>
                <span>{formatDate(post.date)}</span>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display font-semibold text-xl mb-3">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{post.description}</p>
              <button className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent-red transition-colors">
                Read More <ArrowRight size={14} />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
