'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { ExamCard } from './ExamCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { fetchExercises } from '@/lib/api'
import { getTemplateById } from '@/lib/constants/templates'
import { Exercise } from '@/lib/interfaces'

interface PreviewSectionProps {
  selectedTopic: string
  selectedQuantity: string
  selectedTypeQuestion: string[]
  selectedDifficulty: string[]
  selectedTemplate: string
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  selectedTopic,
  selectedQuantity,
  selectedTypeQuestion,
  selectedDifficulty,
  selectedTemplate,
}) => {
  const [loading, setLoading] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const canGenerate =
    selectedTopic &&
    selectedQuantity &&
    selectedTypeQuestion.length > 0 &&
    selectedDifficulty.length > 0 &&
    selectedTemplate

  const pages = exercises.length > 0 ? splitExercisesAndAnswersIntoPages(exercises) : []
  const template = getTemplateById(selectedTemplate)
  const logoUrl = '/images/KAI.png'

  const handleGenerateExercises = async () => {
    if (canGenerate) {
      setLoading(true)
      try {
        const exercisesFromIA = await fetchExercises(
          selectedTopic,
          selectedQuantity,
          selectedDifficulty,
          selectedTypeQuestion,
        )
        setExercises(exercisesFromIA)
      } catch (error) {
        console.error('Error al generar los ejercicios: ', error)
        toast.error('Error al generar los ejercicios.', { richColors: true, duration: 3000 })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-primary">Así se verá tu trabajo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center space-x-2 text-slate-400">
            <Loader2 className="animate-spin" />
            <p>Creando...</p>
          </div>
        ) : exercises.length > 0 ? (
          <ScrollArea className="h-[450px] rounded-md border bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 p-4">
              {pages.map((page, pageIndex) => (
                <ExamCard
                  key={pageIndex}
                  exercises={page.exercises}
                  startIndex={page.startIndex}
                  pageNumber={page.pageNumber}
                  isAnswerPage={page.isAnswerPage}
                  template={template?.image || ''}
                  logoUrl={logoUrl}
                  selectedTopic={selectedTopic}
                  selectedDifficulty={selectedDifficulty}
                />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        ) : (
          <div className="h-24 px-8 flex justify-center items-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-100">
            <p className="text-slate-400 text-center">Configura el tema, preguntas y plantilla para ver cómo queda</p>
          </div>
        )}
        <Button onClick={handleGenerateExercises} disabled={loading || !canGenerate} className="w-full">
          Crear examen
        </Button>
      </CardContent>
    </Card>
  )
}

const LINE_HEIGHT = 8 // Altura de línea en píxeles
const EXERCISE_MARGIN = 4 // Margen entre ejercicios
const PAGE_CONTENT_HEIGHT_FIRST_PAGE = 225 // Altura disponible en la primera página
const PAGE_CONTENT_HEIGHT_OTHER_PAGES = 250 // Altura disponible en otras páginas

const estimateTextHeight = (text: string): number => {
  const words = text.split(' ').length
  const wordsPerLine = 12 // Estimación de palabras por línea
  const lines = Math.ceil(words / wordsPerLine)
  return lines * LINE_HEIGHT + EXERCISE_MARGIN
}

interface Page {
  exercises: Exercise[]
  startIndex: number
  pageNumber: number
  isAnswerPage: boolean
}

const splitExercisesAndAnswersIntoPages = (exercises: Exercise[]): Page[] => {
  const pages: Page[] = []
  let currentPageExercises: Exercise[] = []
  let currentPageHeight = 0
  let startIndex = 0
  let pageNumber = 1
  let isAnswerPage = false

  // Función para agregar una página
  const addPage = (lastIndex: number = 0) => {
    pages.push({
      exercises: currentPageExercises,
      isAnswerPage,
      startIndex,
      pageNumber,
    })
    currentPageExercises = []
    currentPageHeight = 0
    startIndex = lastIndex
    pageNumber++
  }

  // Dividir ejercicios en páginas
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i]
    const exerciseHeight = estimateTextHeight(exercise.question)
    const maxPageHeight = pageNumber === 1 ? PAGE_CONTENT_HEIGHT_FIRST_PAGE : PAGE_CONTENT_HEIGHT_OTHER_PAGES

    if (currentPageHeight + exerciseHeight > maxPageHeight && currentPageExercises.length > 0) {
      addPage(i)
    }
    currentPageExercises.push(exercise)
    currentPageHeight += exerciseHeight
  }
  if (currentPageExercises.length > 0) {
    addPage()
  }

  // Dividir respuestas en páginas
  isAnswerPage = true
  currentPageExercises = []
  currentPageHeight = 0
  startIndex = 0
  pageNumber = 1

  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i]
    const answerHeight = estimateTextHeight(`Respuesta: ${exercise.answer}`)
    const maxPageHeight = pageNumber === 1 ? PAGE_CONTENT_HEIGHT_FIRST_PAGE : PAGE_CONTENT_HEIGHT_OTHER_PAGES

    if (currentPageHeight + answerHeight > maxPageHeight && currentPageExercises.length > 0) {
      addPage(i)
    }
    currentPageExercises.push(exercise)
    currentPageHeight += answerHeight
  }
  if (currentPageExercises.length > 0) {
    addPage()
  }

  return pages
}
