import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const ChatBot = () => {
  const { backendUrl } = useContext(ShopContext)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am the Forever assistant. Ask me about shipping, returns or payment.' },
  ])

  const addBot = (text) => setMessages((m) => [...m, { from: 'bot', text: text.replace(/\*\*/g, '') }])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/chat/ask', { message: text })
      addBot(data.success ? data.reply : data.message)
    } catch (err) {
      addBot(err.response?.data?.message || 'Cannot reach the server. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className='fixed bottom-5 right-5 z-50'>
      {open && (
        <div className='mb-3 flex h-96 w-80 flex-col rounded-lg border bg-white shadow-lg'>
          <div className='bg-black p-3 text-sm text-white'>Forever Support</div>
          <div className='flex-1 space-y-2 overflow-y-auto p-3 text-sm'>
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
                <span className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 ${m.from === 'user' ? 'bg-black text-white' : 'bg-gray-100'}`}>
                  {m.text}
                </span>
              </div>
            ))}
            {loading && <div className='text-gray-400'>Typing...</div>}
          </div>
          <div className='flex border-t'>
            <input
              value={input}
              maxLength={1000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder='Type your question...'
              className='flex-1 p-2 text-sm outline-none'
            />
            <button onClick={send} className='px-3 text-sm'>Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className='h-12 w-12 rounded-full bg-black text-xl text-white'>
        {open ? '×' : '💬'}
      </button>
    </div>
  )
}

export default ChatBot