'use client'

import { default as ImgNext } from 'next/image'
import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getTemplateById } from '@/lib/constans/templates'

interface PreviewSectionProps {
  selectedTables: number[]
  selectedTemplate: string
  onImagesGenerated: (images: string[]) => void
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  selectedTables,
  selectedTemplate,
  onImagesGenerated,
}) => {
  const [loading, setLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  useEffect(() => {
    if (selectedTables.length > 0 && selectedTemplate) {
      setLoading(true)
      generateImages()
    }
  }, [selectedTables, selectedTemplate])

  const generateImages = async () => {
    try {
      const images = await Promise.all(selectedTables.map((table) => generateImageForTable(table)))
      setGeneratedImages(images)
      onImagesGenerated(images)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Continuación de PreviewSection.tsx

  const generateImageForTable = async (number: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const template = getTemplateById(selectedTemplate)
      if (!template) {
        reject(new Error('Plantilla no encontrada'))
        return
      }

      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.src = template.image // Asegúrate de que las imágenes estén en la carpeta `public/images`

      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        canvas.width = image.width
        canvas.height = image.height

        // Dibujar la imagen de plantilla
        ctx.drawImage(image, 0, 0)

        // Configurar estilo del texto
        ctx.font = '65px Arial'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'

        // Generar las multiplicaciones
        const table = Array.from({ length: 12 }, (_, i) => `${number} x ${i + 1} = ${number * (i + 1)}`)

        // Dividir en dos columnas
        const column1 = table.slice(0, 6)
        const column2 = table.slice(6, 12)

        // Posiciones iniciales
        const startX1 = canvas.width * 0.35
        const startX2 = canvas.width * 0.65
        const startY = canvas.height * 0.3
        const lineHeight = 130

        // Dibujar columna 1
        column1.forEach((text, index) => {
          ctx.fillText(text, startX1, startY + index * lineHeight)
        })

        // Dibujar columna 2
        column2.forEach((text, index) => {
          ctx.fillText(text, startX2, startY + index * lineHeight)
        })

        // Obtener la imagen generada
        const dataUrl = canvas.toDataURL('image/jpeg')
        resolve(dataUrl)
      }

      image.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Vista previa</h2>
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
                    alt={`Tabla de multiplicar del ${selectedTables[index]}`}
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
          {/* selectedTables.length > 0 && selectedTemplate ? (
            <div>
              <p className="mb-2 text-gray-700">Tablas seleccionadas: {selectedTables.join(', ')}</p>
              <p className="mb-4 text-gray-700">Plantilla seleccionada: {selectedTemplate}</p>
              // Aquí iría la lógica para generar la vista previa real
              <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                Vista previa de la ficha
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Selecciona las tablas y una plantilla para ver la vista previa</p>
          )  */}
        </CardContent>
      </Card>
    </div>
  )
}
