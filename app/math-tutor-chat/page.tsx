'use client'

import { useState } from 'react'

import ButtonGroup from './components/ButtonGroup'
import Header from './components/Header'
import InputArea from './components/InputArea'
import MessageList from './components/MessageList'
import PendingImages from './components/PendingImages'
import { Message, PendingImage } from '@/lib/interfaces'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([])

  const handleSend = async () => {
    if (!input.trim() && pendingImages.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      images: pendingImages.map((img) => img.url),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setPendingImages([])
    setIsLoading(true)

    // Simular llamada a la API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'Claro, aquí está la solución paso a paso:\n\nPara resolver la ecuación cuadrática $ax^2 + bx + c = 0$, utilizamos la fórmula cuadrática:\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\nReemplazamos los valores de $a$, $b$ y $c$ en la fórmula.',
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
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

  const handleSimilarExample = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: '¿Podrías mostrarme un ejemplo similar?',
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    // Simular respuesta de la IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'Claro, aquí tienes un ejemplo similar:\n\nSupongamos que tenemos la ecuación $x^2 - 4x + 4 = 0$. Podemos resolverla completando el cuadrado o usando la fórmula cuadrática.',
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleMoreDetails = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: '¿Podrías explicar esto con más detalle?',
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    // Simular respuesta de la IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'Por supuesto. Vamos a profundizar en cada paso:\n\n1. **Identificar los coeficientes**: En la ecuación $ax^2 + bx + c = 0$, identificamos $a$, $b$ y $c$.\n2. **Calcular el discriminante**: Utilizamos $b^2 - 4ac$ para determinar la naturaleza de las raíces.\n3. **Aplicar la fórmula cuadrática**: Sustituimos los valores en $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.',
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="flex min-h-screen flex-col bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-indigo-200 dark:from-indigo-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto max-w-4xl p-4 flex flex-col h-screen">
        <Header />

        <MessageList messages={messages} isLoading={isLoading} />

        <div className="flex flex-col space-y-4 backdrop-blur-sm">
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
    </main>
  )
}
