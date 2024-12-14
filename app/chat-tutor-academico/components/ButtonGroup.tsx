import { Plus, Lightbulb, MessageCircleMore } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ButtonGroupProps {
  onNewQuestion: () => void
  onSimilarExample: () => void
  onMoreDetails: () => void
}

export default function ButtonGroup({ onNewQuestion, onSimilarExample, onMoreDetails }: ButtonGroupProps) {
  return (
    <div className="w-full flex flex-wrap gap-2">
      <Button
        variant="outline"
        className="flex-1 bg-white/80 rounded-full hover:bg-green-50 transition-all duration-200 border-green-100"
        onClick={onNewQuestion}
      >
        <Plus className="w-4 h-4 mr-2 text-green-500" />
        <p className="text-green-500">Nueva Pregunta</p>
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-white/80 rounded-full hover:bg-sky-50 transition-all duration-200 border-sky-100"
        onClick={onSimilarExample}
      >
        <Lightbulb className="w-4 h-4 mr-2 text-sky-500" />
        <p className="text-sky-500">Ejemplo Similar</p>
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-white/80 rounded-full hover:bg-yellow-50 transition-all duration-200 border-yellow-100"
        onClick={onMoreDetails}
      >
        <MessageCircleMore className="w-4 h-4 mr-2 text-yellow-500" />
        <p className="text-yellow-500">Más Detalles</p>
      </Button>
    </div>
  )
}
