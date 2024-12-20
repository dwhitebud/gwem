import { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface Message {
  id: number
  content: string
  sender: 'user' | 'advisor'
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Hello! How can I help you today?',
      sender: 'advisor',
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setNewMessage('')

    // Simulate advisor response
    setTimeout(() => {
      const advisorMessage: Message = {
        id: messages.length + 2,
        content: 'Thank you for your message. I\'ll review this and get back to you shortly.',
        sender: 'advisor',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, advisorMessage])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-4 ${
                message.sender === 'user'
                  ? 'bg-[#00D47E] text-white'
                  : 'bg-[#F8FAFC] text-[#025584]'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-[#02558499]'}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-6 border-t border-[#E5E7EB]">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border-[#E5E7EB] p-3 shadow-[0_2px_4px_rgba(0,0,0,0.1)] focus:border-[#00D47E] focus:ring-[#00D47E]"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-3 rounded-lg bg-[#00D47E] hover:bg-[#00D47ECC] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D47E]"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
