import { Loader2 } from 'lucide-react'
import { useRef, useEffect } from 'react'

import MessageBubble from './MessageBubble'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from '@/lib/interfaces'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <ScrollArea className="flex-grow rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-xl p-4 mb-4 backdrop-blur-sm border border-purple-100 dark:border-purple-900">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-full w-fit">
            <Loader2 className="animate-spin" />
            <span>El tutor está escribiendo...</span>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
