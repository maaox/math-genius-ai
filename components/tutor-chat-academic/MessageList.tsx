import { Loader2 } from 'lucide-react'

import { MessageBubble } from './MessageBubble'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from '@/lib/interfaces'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="w-full h-full rounded-2xl p-6 bg-white border border-purple-100">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-full w-fit">
            <Loader2 className="animate-spin" />
            <span>Estoy pensando...</span>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
