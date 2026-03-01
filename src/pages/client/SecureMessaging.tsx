import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageSquareLock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockMessages } from '@/data/mockMessages'
import type { Message } from '@/data/mockMessages'

function formatMessageTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const datePart = date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
  })
  const timePart = date.toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${datePart}, ${timePart}`
}

function formatDateSeparator(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getDateKey(timestamp: string): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-teal-400"
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

export default function SecureMessaging() {
  const [messages, setMessages] = useState<Message[]>([...mockMessages])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isTyping) return

    const newMessage: Message = {
      id: `msg-client-${Date.now()}`,
      sender: 'client',
      senderName: 'James Mitchell',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const autoReply: Message = {
        id: `msg-advisor-${Date.now()}`,
        sender: 'advisor',
        senderName: 'Hannah Blake',
        content:
          "Thanks for your message, James. I'll review this and get back to you shortly.",
        timestamp: new Date().toISOString(),
        read: true,
      }
      setMessages((prev) => [...prev, autoReply])
      setIsTyping(false)
    }, 1500)
  }, [inputValue, isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Group messages by date
  const groupedMessages: { dateKey: string; dateLabel: string; messages: Message[] }[] = []
  let currentDateKey = ''

  for (const msg of messages) {
    const dateKey = getDateKey(msg.timestamp)
    if (dateKey !== currentDateKey) {
      currentDateKey = dateKey
      groupedMessages.push({
        dateKey,
        dateLabel: formatDateSeparator(msg.timestamp),
        messages: [msg],
      })
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[500px] flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 flex shrink-0 items-center justify-between"
      >
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <MessageSquareLock className="h-7 w-7 text-teal-600" />
            Messages
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Secure communication with your advisor
          </p>
        </div>

        {/* Advisor info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 shadow-md shadow-teal-500/20">
            <span className="text-sm font-semibold text-white">HB</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Hannah Blake</p>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <AnimatePresence>
            {groupedMessages.map((group) => (
              <div key={group.dateKey}>
                {/* Date Separator */}
                <div className="my-6 flex items-center gap-3 first:mt-0">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="whitespace-nowrap text-xs font-medium text-slate-400">
                    {group.dateLabel}
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Messages in group */}
                <div className="flex flex-col gap-4">
                  {group.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'flex flex-col',
                        msg.sender === 'client' ? 'items-end' : 'items-start'
                      )}
                    >
                      {/* Sender name */}
                      <p
                        className={cn(
                          'mb-1 text-xs font-medium',
                          msg.sender === 'client'
                            ? 'mr-1 text-slate-500'
                            : 'ml-1 text-slate-500'
                        )}
                      >
                        {msg.senderName}
                      </p>

                      {/* Message bubble */}
                      <div
                        className={cn(
                          'max-w-[80%] px-4 py-3',
                          msg.sender === 'advisor'
                            ? 'rounded-2xl rounded-bl-md bg-slate-50 text-slate-700'
                            : 'rounded-2xl rounded-br-md bg-gradient-to-br from-teal-600 to-teal-500 text-white'
                        )}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>

                      {/* Timestamp */}
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          msg.sender === 'advisor'
                            ? 'ml-1 text-slate-400'
                            : 'mr-1 text-slate-400'
                        )}
                      >
                        {formatMessageTimestamp(msg.timestamp)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-3"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600">
                <span className="text-xs font-semibold text-white">HB</span>
              </div>
              <div className="rounded-2xl rounded-bl-md bg-slate-50 px-4 py-3">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-3 sm:px-6">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isTyping}
              rows={1}
              className={cn(
                'max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400',
                'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30',
                'transition-all disabled:opacity-50'
              )}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all',
                inputValue.trim() && !isTyping
                  ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-sm btn-glow'
                  : 'cursor-not-allowed bg-slate-100 text-slate-400'
              )}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
