import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import Typewriter from './Typewriter'
import { Message } from '@/lib/interfaces'
import { cn } from '@/lib/utils'
import 'katex/dist/katex.min.css'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn('flex flex-col', message.sender === 'user' ? 'items-end' : 'items-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl p-4 shadow-md transition-all duration-200',
          message.sender === 'user'
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-[1.02]'
            : 'bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white hover:shadow-lg hover:scale-[1.02]',
        )}
      >
        {message.images && message.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            {message.images.map((img, index) => (
              <div key={index} className="relative group">
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  width={300}
                  height={200}
                  className="rounded-lg transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        )}
        {message.sender === 'ai' ? (
          <Typewriter text={message.content} />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} className="prose dark:prose-invert">
            {message.content}
          </ReactMarkdown>
        )}
      </div>
      <span className="text-xs text-gray-500 mt-1 px-2">{message.timestamp.toLocaleTimeString()}</span>
    </div>
  )
}
