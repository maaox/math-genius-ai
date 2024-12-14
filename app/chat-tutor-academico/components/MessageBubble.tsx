import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import Typewriter from './Typewriter'
import BotIA from '@/components/bot'
import { Message } from '@/lib/interfaces'
import { cn } from '@/lib/utils'
import 'katex/dist/katex.min.css'

interface MessageBubbleProps {
  message: Message
  scrollToBottom: () => void
  isAtBottom: boolean
}

export default function MessageBubble({ message, scrollToBottom, isAtBottom }: MessageBubbleProps) {
  return (
    <div className="flex">
      {message.sender === 'ai' && (
        <div className="pt-4">
          <div className="flex items-center justify-center p-1 rounded-full bg-sky-100">
            <BotIA className="w-8 h-8 md:w-9 md:h-9" />
          </div>
        </div>
      )}
      <div className={cn('flex flex-col w-full', message.sender === 'user' ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl p-4 text-sm',
            message.sender === 'user'
              ? 'max-w-[80%] bg-gray-100 text-gray-900'
              : 'max-w-[100%] bg-white text-gray-900 dark:text-white',
          )}
        >
          {message.images && message.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {message.images.map((img, index) => (
                <div key={index} className="relative group">
                  <Image src={img} alt={`Imagen ${index + 1}`} width={150} height={75} className="rounded-lg" />
                </div>
              ))}
            </div>
          )}
          {message.sender === 'ai' ? (
            <Typewriter text={message.content} scrollToBottom={scrollToBottom} isAtBottom={isAtBottom} />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              className="prose dark:prose-invert"
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <span className="text-[10px] text-gray-500 mt-1 px-4">
          {message.timestamp.toLocaleTimeString('es-Pe', { hour12: true, minute: '2-digit', hour: 'numeric' })}
        </span>
      </div>
    </div>
  )
}
