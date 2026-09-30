import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X, Send, Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  'What skills does Aditya have?',
  'Tell me about his projects.',
  'What technologies does he use?',
  'How can I contact Aditya?',
  'What is his education?',
  'Tell me about the Air Pollution project.'
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Aditya's AI assistant. Ask me about his skills, projects, or how to get in touch."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async (text) => {
    const content = text ?? input
    if (!content.trim() || loading) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      // Backend endpoint — see backend/routes/chat.py
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I couldn't reach the backend right now. Make sure the FastAPI server is running (see backend/README) and try again."
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        aria-label="Open AI chatbot"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-accent-red text-white shadow-glowRed flex items-center justify-center font-display font-bold"
      >
        {open ? <X size={22} /> : 'AI'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[560px] card flex flex-col overflow-hidden shadow-glowRed"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-base-border">
              <div className="w-9 h-9 rounded-full bg-accent-red/15 flex items-center justify-center">
                <Bot size={18} className="text-accent-red" />
              </div>
              <div>
                <p className="font-semibold text-sm">Ask Aditya's AI</p>
                <p className="text-xs text-gray-500">Ask me about my portfolio</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5 ${
                    m.role === 'user'
                      ? 'ml-auto bg-accent-red text-white rounded-br-sm'
                      : 'bg-base border border-base-border text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="max-w-[85%] bg-base border border-base-border text-gray-400 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm">
                  Thinking...
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-base-border text-gray-400 hover:text-white hover:border-accent-red transition-colors"
                    >
                      <Sparkles size={12} /> {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex items-center gap-2 p-3 border-t border-base-border"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-base border border-base-border rounded-full px-4 py-2.5 text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-red transition-colors"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-accent-red text-white hover:bg-accent-redSoft transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
