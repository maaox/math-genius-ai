'use client'

import { default as ImgNext } from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { fetchExercises } from '@/lib/api'
import { getTemplateById } from '@/lib/constants/templates'
import { Exercise } from '@/lib/interfaces'

interface PreviewSectionProps {
  selectedTopic: string
  selectedQuantity: string
  selectedDifficulty: string[]
  selectedTemplate: string
  generatedImages: string[]
  onImagesGenerated: (images: string[]) => void
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  selectedTopic,
  selectedQuantity,
  selectedDifficulty,
  selectedTemplate,
  generatedImages,
  onImagesGenerated,
}) => {
  const [loading, setLoading] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const canGenerate = selectedTopic && selectedQuantity && selectedDifficulty.length > 0 && selectedTemplate

  // useEffect para generar las imágenes cuando cambian los ejercicios o la plantilla
  useEffect(() => {
    if (exercises.length > 0) {
      setLoading(true)
      generateImages()
    }
  }, [exercises, selectedTemplate])

  const handleGenerateExercises = async () => {
    if (canGenerate) {
      setLoading(true)
      try {
        const exercisesFromIA = await fetchExercises(selectedTopic, selectedQuantity, selectedDifficulty)
        setExercises(exercisesFromIA)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const generateImages = async () => {
    try {
      const images = await generateImageWithExercises(exercises)
      onImagesGenerated(images)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const generateImageWithExercises = async (exercises: Exercise[]): Promise<string[]> => {
    const images: string[] = []
    const template = getTemplateById(selectedTemplate)

    if (!template) {
      throw new Error('Plantilla no encontrada')
    }

    const templateImage = new Image()
    templateImage.crossOrigin = 'Anonymous'
    templateImage.src = template.image

    const logoImage = new Image()
    logoImage.crossOrigin = 'Anonymous'
    logoImage.src = '/images/logo.png'

    try {
      // Esperar a que ambas imágenes se carguen
      await Promise.all([
        new Promise((res, rej) => {
          templateImage.onload = res
          templateImage.onerror = rej
        }),
        new Promise((res, rej) => {
          logoImage.onload = res
          logoImage.onerror = rej
        }),
      ])

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = templateImage.width
      canvas.height = templateImage.height

      // Variables de dimensiones y márgenes
      const totalCanvasHeight = canvas.height
      const totalCanvasWidth = canvas.width
      const startX = 150 // Margen izquierdo
      const startYPage = 100 // Posición Y inicial en las página
      const marginBottom = 280 // Margen inferior
      const lineHeight = 28 // Espacioentre las lineas de un texto largo
      const spaceBetweenExercises = 30 // Espacio entre ejercicios

      // Posiciones y alturas para la primera página
      const titleFontSize = 40
      const titleLineHeight = 40 // Espacio entre las líneas del título (si es de más de dos líneas)
      const titleHeight = titleFontSize + titleLineHeight
      const maxContentHeightFirstPage = totalCanvasHeight - startYPage - titleHeight - marginBottom

      // Posiciones y alturas para las páginas siguientes
      const maxContentHeightOtherPages = totalCanvasHeight - startYPage - marginBottom

      // Función para medir la altura total de los ejercicios en una página
      const measureExercisesHeight = (
        context: CanvasRenderingContext2D,
        exercises: Exercise[],
        startIndex: number,
        maxContentHeight: number,
      ): { exercisesCount: number; totalHeight: number } => {
        let totalHeight = 0
        let exercisesCount = 0

        for (let i = startIndex; i < exercises.length; i++) {
          const exerciseIndex = i
          const exerciseText = `${exerciseIndex + 1}. ${exercises[i].question}`
          const textHeight = measureTextHeight(context, exerciseText, canvas.width - 280, lineHeight)

          if (totalHeight + textHeight + spaceBetweenExercises > maxContentHeight) {
            break
          }

          totalHeight += textHeight + spaceBetweenExercises
          exercisesCount++
        }

        return { exercisesCount, totalHeight }
      }

      let currentIndex = 0
      let pageNumber = 0

      while (currentIndex < exercises.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(templateImage, 0, 0)

        // Dibujar el logo centrado en la parte superior
        const logoWidth = canvas.width * 0.07
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth
        const logoX = canvas.width - 220
        const logoY = startYPage // Margen superior
        ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight)

        // Dibujar el logo como marca de agua
        ctx.globalAlpha = 0.05 // 95% de transparencia
        const watermarkWidth = canvas.width * 0.5 // Ajustar tamaño si es necesario
        const watermarkHeight = (logoImage.height / logoImage.width) * watermarkWidth
        const watermarkX = (canvas.width - watermarkWidth) / 2
        const watermarkY = (canvas.height - watermarkHeight) / 2
        ctx.drawImage(logoImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
        ctx.globalAlpha = 1.0 // Restablecer opacidad

        let startY
        let maxContentHeight

        if (pageNumber === 0) {
          // Primera página
          startY = logoHeight + logoY + startYPage

          // Dibujar título
          ctx.font = `bold ${titleFontSize}px Arial`
          ctx.fillStyle = '#10528a'
          ctx.textAlign = 'center'
          const difficultyText = selectedDifficulty.join(', ')
          const titleText = `Ejercicios sobre ${selectedTopic} de nivel ${difficultyText}`
          const textHeight = wrapText(ctx, titleText, totalCanvasWidth / 2, startY, canvas.width - 280, titleLineHeight)

          startY += textHeight + spaceBetweenExercises // Espacio después del título
          maxContentHeight = maxContentHeightFirstPage
        } else {
          // Otras páginas
          startY = logoHeight + logoY + startYPage
          maxContentHeight = maxContentHeightOtherPages
        }

        // Configuración del texto para los ejercicios
        ctx.font = '24px Arial'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'left'

        // Medir cuántos ejercicios caben en la página actual
        const { exercisesCount } = measureExercisesHeight(ctx, exercises, currentIndex, maxContentHeight)

        // Añadir ejercicios a la página
        for (let i = currentIndex; i < currentIndex + exercisesCount; i++) {
          const exerciseIndex = i
          const exerciseText = `${exerciseIndex + 1}. ${exercises[i].question}`

          const textHeight = wrapText(ctx, exerciseText, startX, startY, canvas.width - 280, lineHeight)
          startY += textHeight + spaceBetweenExercises // Añadir espacio entre ejercicios
        }

        currentIndex += exercisesCount
        pageNumber++

        // Obtener la imagen generada
        const dataUrl = canvas.toDataURL('image/jpeg')
        images.push(dataUrl)
      }
    } catch (error) {
      console.error('Error al cargar las imágenes o generar las imágenes:', error)
      throw error
    }

    return images
  }

  // Función para ajustar el texto al ancho disponible y devolver la altura utilizada
  function wrapText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) {
    const words = text.split(' ')
    let line = ''
    let totalHeight = 0

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = context.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
        totalHeight += lineHeight
      } else {
        line = testLine
      }
    }
    context.fillText(line, x, y)
    totalHeight += lineHeight
    return totalHeight
  }

  // Función para medir la altura del texto sin dibujarlo
  function measureTextHeight(
    context: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    lineHeight: number,
  ): number {
    const words = text.split(' ')
    let line = ''
    let totalHeight = 0

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = context.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        line = words[n] + ' '
        totalHeight += lineHeight
      } else {
        line = testLine
      }
    }
    totalHeight += lineHeight
    return totalHeight
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Vista previa</h2>
      <Button onClick={handleGenerateExercises} disabled={loading || !canGenerate} className="mb-4">
        {loading ? 'Generando...' : 'Generar Ejercicios'}
      </Button>
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-500">Cargando...</p>
            </div>
          ) : generatedImages.length > 0 ? (
            <ScrollArea className="max-h-[500px] overflow-y-auto rounded-lg border-2 border-dashed border-gray-300">
              <div className="grid grid-cols-3 place-items-center gap-4 p-4">
                {generatedImages.map((imageSrc, index) => (
                  <ImgNext
                    key={index}
                    src={imageSrc}
                    alt={`Ejercicios de ${selectedTopic} de nivel ${selectedDifficulty}`}
                    width={300}
                    height={150}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          ) : (
            <div className="h-[100px] flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
              <p className="text-gray-500 ">Selecciona las tablas y una plantilla para ver la vista previa</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
