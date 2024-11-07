import { Brain, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center py-6 relative">
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="relative">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          Tutor Matemático IA
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Tu asistente personal para aprender matemáticas
        </p>
      </div>
    </header>
  )
}
