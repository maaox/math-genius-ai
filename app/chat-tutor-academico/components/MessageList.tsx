import { Viewport } from '@radix-ui/react-scroll-area'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import MessageBubble from './MessageBubble'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from '@/lib/interfaces'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10 // Umbral de 10 píxeles
      setIsAtBottom(atBottom)
    }
  }

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom()
    }
  }, [messages])

  return (
    <ScrollArea className="w-full h-full rounded-2xl p-6 bg-white border border-purple-100">
      <Viewport ref={scrollAreaRef} onScroll={handleScroll} className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} scrollToBottom={scrollToBottom} isAtBottom={isAtBottom} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-full w-fit">
            <Loader2 className="animate-spin" />
            <span>Estoy pensando...</span>
          </div>
        )}
      </Viewport>
    </ScrollArea>
  )
}
