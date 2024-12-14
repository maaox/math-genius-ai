'use client'

import { useState } from 'react'

import ButtonGroup from './components/ButtonGroup'
import InputArea from './components/InputArea'
import MessageList from './components/MessageList'
import PendingImages from './components/PendingImages'
import { fetchChatResponse } from '@/lib/api'
import { Message, MesssageAPI, PendingImage } from '@/lib/interfaces'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      content:
        'Hola, soy Pepe IA. ¡Estoy aquí para ayudarte con cualquier tema académico! ¿Tienes dudas? Pregunta sobre matemáticas, ciencia, historia o cualquier asignatura. Escríbeme una pregunta y empecemos a aprender juntos.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])

  const generateChatResponse = async (updatedMessages: Message[]) => {
    const messagesForAPI = formatMessagesForAPI(updatedMessages)
    try {
      const response = await fetchChatResponse(messagesForAPI)

      const aiResponse: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error('Error al llamar a la API de chat:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatMessagesForAPI = (messages: Message[]): MesssageAPI[] => {
    return messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }))
  }

  const handleSend = async () => {
    if (!input.trim() && pendingImages.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      images: pendingImages.map((img) => img.url),
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newMessage]

    setMessages(updatedMessages)
    setInput('')
    setPendingImages([])
    setIsLoading(true)

    await generateChatResponse(updatedMessages)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPendingImages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            url: event.target?.result as string,
          },
        ])
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ''
  }

  const removePendingImage = (id: string) => {
    setPendingImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleNewQuestion = () => {
    setMessages([])
    setPendingImages([])
    setInput('')
  }

  const handleSimilarExample = async () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: '¿Podrías mostrarme un ejemplo similar?',
      sender: 'user',
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newMessage]

    setMessages(updatedMessages)
    setIsLoading(true)

    await generateChatResponse(updatedMessages)
  }

  const handleMoreDetails = async () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: '¿Podrías explicar esto con más detalle?',
      sender: 'user',
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newMessage]

    setMessages(updatedMessages)
    setIsLoading(true)

    await generateChatResponse(updatedMessages)
  }

  return (
    <div className="flex justify-center pt-28 pb-16 md:pt-36 md:pb-20 px-4 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-indigo-200">
      <div className="container flex flex-col items-center gap-3 h-[750px] max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Pepe IA ¡Tutor académico!
        </h1>

        <MessageList messages={messages} isLoading={isLoading} />

        <ButtonGroup
          onNewQuestion={handleNewQuestion}
          onSimilarExample={handleSimilarExample}
          onMoreDetails={handleMoreDetails}
        />

        {pendingImages.length > 0 && (
          <PendingImages pendingImages={pendingImages} removePendingImage={removePendingImage} />
        )}

        <InputArea
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleImageUpload={handleImageUpload}
          hasPendingImages={pendingImages.length > 0}
        />
      </div>
    </div>
  )
}
