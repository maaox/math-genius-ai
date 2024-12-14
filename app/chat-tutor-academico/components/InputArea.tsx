import { Send, Image as ImageIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface InputAreaProps {
  input: string
  setInput: (value: string) => void
  handleSend: () => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasPendingImages: boolean
}

export default function InputArea({
  input,
  setInput,
  handleSend,
  handleImageUpload,
  hasPendingImages,
}: InputAreaProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = '20px'

      const newHeight = Math.min(textarea.scrollHeight, 80) // Máximo 80px
      textarea.style.height = `${newHeight}px`
    }
  }

  return (
    <div className="w-full flex flex-col p-3 rounded-2xl bg-white">
      <Textarea
        ref={textareaRef}
        onInput={handleInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="¡Escribe tu duda académica y Pepe IA te ayudará!"
        className="min-h-[20px] p-3 border-none focus:!ring-transparent bg-transparent resize-none"
        rows={1}
        onKeyDown={handleKeyPress}
      />

      <div className="flex justify-between">
        <Button
          onClick={() => document.getElementById('imageInput')?.click()}
          className="px-2 py-4 bg-white rounded-full border-none hover:bg-purple-100 transition-all duration-200"
          disabled
        >
          <ImageIcon className="w-6 h-6 text-purple-500" />
          <input
            type="file"
            id="imageInput"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </Button>
        <Button
          onClick={handleSend}
          className="px-2.5 py-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500"
          disabled={!input.trim() && !hasPendingImages}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
