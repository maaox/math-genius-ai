import { Send, Image as ImageIcon } from 'lucide-react'

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
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        className="px-3 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-all duration-200 border-purple-100 dark:border-purple-900"
        onClick={() => document.getElementById('imageInput')?.click()}
      >
        <ImageIcon className="w-5 h-5 text-purple-500" />
        <input type="file" id="imageInput" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
      </Button>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu pregunta matemática aquí..."
        className="flex-1 resize-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-purple-100 dark:border-purple-900 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
        rows={3}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
      />
      <Button
        onClick={handleSend}
        className="px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500"
        disabled={!input.trim() && !hasPendingImages}
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  )
}
