import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, ArrowRight, CheckCircle2 } from 'lucide-react'

const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    sub: 'Connect with me',
    href: 'mailto:aditya.raj.placeholder@example.com'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Connect with me',
    href: 'https://linkedin.com/in/adityaraj-placeholder'
  },
  {
    icon: Github,
    label: 'GitHub',
    sub: 'Connect with me',
    href: 'https://github.com/adityaraj-placeholder'
  }
]

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name'
    if (!form.email.trim()) next.email = 'Please enter your email'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email'
    if (!form.subject.trim()) next.subject = 'Please enter a subject'
    if (!form.message.trim()) next.message = 'Please enter a message'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    try {
      // Backend endpoint — see backend/routes/contact.py
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="container-px grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="tag inline-block mb-6 text-xs">Contact Me</span>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl leading-none mb-6 text-transparent [-webkit-text-stroke:1.5px_#E31C3D]">
            LET'S TALK
          </h2>
          <h3 className="font-display font-semibold text-2xl mb-4">
            Let's Build Something Meaningful
          </h3>
          <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
            Have a project, opportunity, or idea in mind? I'd love to hear from you.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {contactCards.map(({ icon: Icon, label, sub, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="card p-5 hover:border-accent-red/50 transition-colors"
              >
                <Icon size={18} className="text-accent-red mb-3" />
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
              </a>
            ))}
          </div>

          <span className="tag inline-flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-red" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="card p-8 space-y-5"
        >
          <Field
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter your name"
          />
          <Field
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
          />
          <Field
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            error={errors.subject}
            placeholder="Enter subject"
          />
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full bg-base border border-base-border rounded-xl px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-red transition-colors resize-none"
            />
            {errors.message && <p className="text-accent-redSoft text-xs mt-1.5">{errors.message}</p>}
          </div>

          <button type="submit" disabled={status === 'sending'} className="w-full btn-primary justify-center">
            {status === 'sending' ? 'Sending...' : status === 'sent' ? (
              <>
                <CheckCircle2 size={16} /> Message Sent
              </>
            ) : (
              <>
                Send Message <ArrowRight size={16} />
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="text-accent-redSoft text-sm text-center">
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, name, value, onChange, error, placeholder, type = 'text' }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-base border border-base-border rounded-xl px-4 py-3 text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-red transition-colors"
      />
      {error && <p className="text-accent-redSoft text-xs mt-1.5">{error}</p>}
    </div>
  )
}
