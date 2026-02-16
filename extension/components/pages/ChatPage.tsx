import { useState, useEffect } from 'react'
import { useRouter } from '../layout/RouterProvider'
import logoIcon from '../ui/icons/chatIcon.png'
import '../styles/ChatPage.css'
import { MOCK_CHAT_RESPONSES } from '../../mock/mock-data'

interface Message {
  id: string
  content: string
  sender: 'user' | 'sofia'
  timestamp: Date
}

const ChatPage = () => {
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const { goBack } = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.chat-messages')
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  const getDemoResponse = (message: string): string => {
    const lower = message.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('bonjour')) return MOCK_CHAT_RESPONSES.hello
    if (lower.includes('interest') || lower.includes('pattern') || lower.includes('browsing')) return MOCK_CHAT_RESPONSES.interests
    if (lower.includes('recommend') || lower.includes('suggest')) return MOCK_CHAT_RESPONSES.recommend
    return MOCK_CHAT_RESPONSES.default
  }

  const handleSendMessage = (content?: string) => {
    const message = content ?? chatInput
    if (!message.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])

    // Demo: simulate AI response after delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: getDemoResponse(message),
        sender: 'sofia',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
    }, 1200)

    setChatInput("")
  }

  // Load pending message from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pendingChatInput")
    if (saved && saved.trim() !== "") {
      localStorage.removeItem("pendingChatInput")
      setChatInput(saved)
      // Send pending message immediately
      setTimeout(() => handleSendMessage(saved), 100)
    }
    setIsLoaded(true)
  }, [])

  // Persist messages to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages, isLoaded])

  // Load saved messages
  useEffect(() => {
    const saved = localStorage.getItem("chatMessages")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          const restored = parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
          setMessages(restored)
        }
      } catch {}
    }
  }, [])

  return (
    <div className="chat-page">

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${message.sender === 'user' ? 'user-message-wrapper' : 'sofia-message-wrapper'}`}
          >
            <div className={`message ${message.sender === 'user' ? 'user-message' : 'sofia-message'}`}>
              <div className="message-content">
                {message.content}
              </div>
            </div>
            <small className="message-timestamp">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
          </div>
        ))}
      </div>

      <div className="chat-input-section">
        <div className="chat-input-container">
          <img
            src={logoIcon}
            alt="Sofia"
            className="chat-logo"
            onClick={goBack}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage()
            }}
            placeholder="Talk with Sofia"
            className="chat-input"
          />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
