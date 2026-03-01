import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  User,
  Sparkles,
  TrendingUp,
  BarChart3,
  HelpCircle,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockChatResponses } from '@/data/mockChatHistory'
import type { ChatMessage } from '@/types'

const SUGGESTED_QUESTIONS = [
  'What is the current market outlook?',
  'How should I rebalance my portfolio?',
  'What are the best dividend stocks for income?',
  'Explain the current interest rate environment',
  'What is the outlook for Australian banks?',
  'How do I assess a company for investment?',
]

const GENERIC_RESPONSES = [
  "That's an excellent question. Based on current market data and analysis, I'd recommend considering the following factors:\n\n**Key Considerations:**\n- Review your current asset allocation against your target\n- Consider the impact of current interest rate expectations\n- Evaluate sector-specific opportunities and risks\n- Ensure adequate diversification across geographies\n\nWould you like me to dive deeper into any of these areas? I can also pull up specific data from our market dashboard or run a company analysis.",
  "Great question. Let me provide some insight based on current market conditions:\n\n**Analysis:**\n1. The current macro environment favours quality growth assets\n2. Australian equities offer attractive yields with franking benefits\n3. Global diversification remains essential for risk management\n4. Fixed income is becoming more attractive as rate cuts approach\n\n**Action Items:**\n- Review portfolio weightings quarterly\n- Consider tax-loss harvesting opportunities before EOFY\n- Maintain cash reserves for tactical opportunities\n\nI can run a detailed analysis on any specific aspect you'd like to explore further.",
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-teal-400"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, j) =>
    j % 2 === 1 ? (
      <strong key={j} className="font-semibold text-slate-900">{part}</strong>
    ) : (
      <span key={j}>{part}</span>
    )
  )
}

function formatMarkdown(text: string) {
  const parts = text.split('\n')
  return parts.map((line, i) => {
    // List items
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="ml-4 list-disc text-sm text-slate-600 leading-relaxed">
          {renderBoldText(line.slice(2))}
        </li>
      )
    }
    // Numbered list
    const numberedMatch = line.match(/^(\d+)\.\s(.*)/)
    if (numberedMatch) {
      return (
        <li key={i} className="ml-4 list-decimal text-sm text-slate-600 leading-relaxed">
          {renderBoldText(numberedMatch[2])}
        </li>
      )
    }
    // Table row
    if (line.startsWith('|')) {
      return (
        <div key={i} className="text-xs font-mono text-slate-500 leading-relaxed">{line}</div>
      )
    }
    // Empty line
    if (!line.trim()) return <div key={i} className="h-2" />
    // Normal text
    return (
      <p key={i} className="text-sm text-slate-600 leading-relaxed">
        {renderBoldText(line)}
      </p>
    )
  })
}

export default function AIAnalyst() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I'm your AI Analyst assistant. I can help you with market analysis, portfolio recommendations, company research, and financial planning strategies.\n\nFeel free to ask me anything, or try one of the suggested questions below.",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue('')
      setIsTyping(true)

      // Find matching response or use generic
      const matchedResponse = mockChatResponses[text.trim()]
      const response =
        matchedResponse || GENERIC_RESPONSES[Math.floor(Math.random() * GENERIC_RESPONSES.length)]

      // Simulate typing delay
      const delay = 800 + Math.random() * 1200
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      }, delay)
    },
    [isTyping]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content:
          "Chat cleared. I'm ready to help with your next question. What would you like to explore?",
        timestamp: new Date().toISOString(),
      },
    ])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-4 shrink-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-7 h-7 text-teal-600" />
            AI Analyst
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your intelligent assistant for market insights and portfolio analysis
          </p>
        </div>
        <button
          onClick={handleClearChat}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Chat
        </button>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden"
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-teal-600" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3',
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-md'
                      : 'bg-white border border-slate-200 rounded-bl-md shadow-sm'
                  )}
                >
                  {msg.role === 'user' ? (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="space-y-0.5">{formatMarkdown(msg.content)}</div>
                  )}
                  <p
                    className={cn(
                      'text-xs mt-2',
                      msg.role === 'user' ? 'text-teal-200' : 'text-slate-300'
                    )}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString('en-AU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-teal-600" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 pb-3"
          >
            <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all"
                >
                  <HelpCircle className="w-3 h-3" />
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input Bar */}
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/50">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about markets, portfolios, or strategies..."
                disabled={isTyping}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={cn(
                'p-3 rounded-xl transition-all btn-press',
                inputValue.trim() && !isTyping
                  ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="flex items-center gap-4 mt-2 px-1">
            <span className="text-xs text-slate-400">
              Powered by AllWealth AI
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => sendMessage('What is the current market outlook?')}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-teal-600 transition-colors"
              >
                <TrendingUp className="w-3 h-3" />
                Market Outlook
              </button>
              <span className="text-slate-200">|</span>
              <button
                onClick={() => sendMessage('How should I rebalance my portfolio?')}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-teal-600 transition-colors"
              >
                <BarChart3 className="w-3 h-3" />
                Rebalancing
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
