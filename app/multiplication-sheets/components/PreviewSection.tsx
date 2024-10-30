'use client'

import { default as ImgNext } from 'next/image'
import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getTemplateById } from '@/lib/constants/templates'

interface PreviewSectionProps {
  selectedTables: number[]
  selectedTemplate: string
  generatedImages: string[]
  onImagesGenerated: (images: string[]) => void
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  selectedTables,
  selectedTemplate,
  generatedImages,
  onImagesGenerated,
}) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedTables.length > 0 && selectedTemplate) {
      setLoading(true)
      generateImages()
    }
  }, [selectedTables, selectedTemplate])

  const generateImages = async () => {
    try {
      const images = await Promise.all(selectedTables.map((table) => generateImageForTable(table)))
      onImagesGenerated(images)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const generateImageForTable = async (number: number): Promise<string> => {
    let image: string = ''
    const template = getTemplateById(selectedTemplate)

    if (!template) {
      throw new Error('Plantilla no encontrada')
    }

    const templateImage = new Image()
    templateImage.crossOrigin = 'Anonymous'
    templateImage.src = template.image // Asegúrate de que las imágenes estén en la carpeta `public/images`

    const logoImage = new Image()
    logoImage.crossOrigin = 'Anonymous'
    logoImage.src = '/images/logo.png' // Ruta al logo

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

      // Dibujar la imagen de plantilla
      ctx.drawImage(templateImage, 0, 0)

      // Dibujar el logo centrado en la parte superior
      const logoWidth = canvas.width * 0.15
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth
      const logoX = (canvas.width - logoWidth) / 2
      const logoY = 150 // Margen superior
      ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight)

      // Dibujar el logo como marca de agua
      ctx.globalAlpha = 0.1 // 90% de transparencia
      const watermarkWidth = canvas.width * 0.5 // Ajustar tamaño si es necesario
      const watermarkHeight = (logoImage.height / logoImage.width) * watermarkWidth
      const watermarkX = (canvas.width - watermarkWidth) / 2
      const watermarkY = (canvas.height - watermarkHeight) / 2
      ctx.drawImage(logoImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
      ctx.globalAlpha = 1.0 // Restablecer opacidad

      // Configurar estilo del título
      ctx.font = 'bold 72px Arial'
      ctx.fillStyle = '#10528a'
      ctx.textAlign = 'center'

      // Posición del título
      const titleX = canvas.width / 2
      const titleY = logoY + logoHeight + 150 // Espacio debajo del logo

      // Dibujar el título
      ctx.fillText(`Tabla del ${number}`, titleX, titleY)

      // Configurar estilo del texto para las multiplicaciones
      ctx.font = 'bold 52px Verdana'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'

      // Generar las multiplicaciones
      const table = Array.from({ length: 12 }, (_, i) => `${number} x ${i + 1} = ${number * (i + 1)}`)

      // Dividir en dos columnas
      const column1 = table.slice(0, 6)
      const column2 = table.slice(6, 12)

      const startX1 = canvas.width * 0.3
      const startX2 = canvas.width * 0.7
      const startY = titleY + 160 // canvas.height * 0.3
      const lineHeight = 130

      // Dibujar columna 1
      column1.forEach((text, index) => {
        const yPosition = startY + index * lineHeight
        ctx.fillText(text, startX1, yPosition)
      })

      // Dibujar columna 2
      column2.forEach((text, index) => {
        const yPosition = startY + index * lineHeight
        ctx.fillText(text, startX2, yPosition)
      })

      // Obtener la imagen generada
      image = canvas.toDataURL('image/jpeg')
    } catch (error) {
      console.error('Error al cargar las imágenes o generar las imágenes:', error)
      throw error
    }

    return image
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
        </CardContent>
      </Card>
    </div>
  )
}
