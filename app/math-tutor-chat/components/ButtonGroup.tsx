import { RotateCcw, BookOpen, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ButtonGroupProps {
  onNewQuestion: () => void
  onSimilarExample: () => void
  onMoreDetails: () => void
}

export default function ButtonGroup({ onNewQuestion, onSimilarExample, onMoreDetails }: ButtonGroupProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        className="flex-1 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-all duration-200 border-purple-100 dark:border-purple-900"
        onClick={onNewQuestion}
      >
        <RotateCcw className="w-4 h-4 mr-2 text-purple-500" />
        Nueva Pregunta
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-all duration-200 border-purple-100 dark:border-purple-900"
        onClick={onSimilarExample}
      >
        <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
        Ejemplo Similar
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-all duration-200 border-purple-100 dark:border-purple-900"
        onClick={onMoreDetails}
      >
        <HelpCircle className="w-4 h-4 mr-2 text-indigo-500" />
        Más Detalles
      </Button>
    </div>
  )
}
