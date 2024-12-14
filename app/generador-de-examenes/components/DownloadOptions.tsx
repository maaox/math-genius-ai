'use client'

import {
  Packer,
  Document,
  Paragraph,
  ImageRun,
  convertMillimetersToTwip,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  PageBreak,
} from 'docx'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import JSZip from 'jszip'
import { Download, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DownloadOptionsProps {
  enteredTopic: string
  selectedTemplate: string
}

export const DownloadOptions: React.FC<DownloadOptionsProps> = ({ enteredTopic, selectedTemplate }) => {
  const [generatedImages, setGeneratedImages] = useState<HTMLCanvasElement[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const topic = enteredTopic.replace(' ', '_')
  const scaleFactor = 3.5

  // Limpiar las imágenes generadas cuando cambien las tablas o la plantilla
  useEffect(() => {
    setGeneratedImages([])
  }, [selectedTemplate])

  const generateImages = async (): Promise<HTMLCanvasElement[]> => {
    setIsGenerating(true)

    const elements = document.querySelectorAll('.exam-card')
    const canvasPromises = Array.from(elements).map((element) =>
      html2canvas(element as HTMLElement, { scale: scaleFactor }),
    )
    const canvases = await Promise.all(canvasPromises)
    setGeneratedImages(canvases)
    setIsGenerating(false)

    return canvases
  }

  const downloadFile = async (format: string) => {
    if (!selectedTemplate) {
      toast.error('No hay contenido para descargar.', { richColors: true, duration: 3000 })
      return
    }

    let canvases = generatedImages
    if (generatedImages.length === 0) {
      canvases = await generateImages()
    }

    switch (format) {
      case 'JPG':
        downloadAsImages(canvases)
        break
      case 'PDF':
        downloadAsPDF(canvases)
        break
      case 'WORD':
        downloadAsWord(canvases)
        break
      default:
        break
    }
  }

  const downloadAsImages = async (canvases: HTMLCanvasElement[]) => {
    if (generatedImages.length === 1) {
      // Descargar imagen única
      const canvas = canvases[0]
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const link = document.createElement('a')
      link.href = imgData
      link.download = `examen-${topic}.jpg`
      link.click()
    } else {
      // Crear un zip con las imágenes
      const zip = new JSZip()
      canvases.forEach((canvas, index) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const base64Data = imgData.split(',')[1]
        zip.file(`examen_${index + 1}.jpg`, base64Data, { base64: true })
      })
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, `examen-${topic}.zip`)
      })
    }
  }

  const downloadAsPDF = async (canvases: HTMLCanvasElement[]) => {
    const pdf = new jsPDF('portrait', 'pt', 'a4')

    canvases.forEach((canvas, index) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      if (index > 0) {
        pdf.addPage()
      }
      const imgWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight)
    })

    pdf.save(`examen-${topic}.pdf`)
  }

  const downloadAsWord = async (canvases: HTMLCanvasElement[]) => {
    const pageWidth = convertMillimetersToTwip(210) // Ancho de A4 en mm
    const pageHeight = convertMillimetersToTwip(297) // Altura de A4 en mm

    const imageParagraphs = await Promise.all(
      canvases.map(async (canvas, index) => {
        const imgData = canvas.toDataURL('image/png')
        const imageBuffer = dataURLToArrayBuffer(imgData)
        const imageDoc = new ImageRun({
          type: 'jpg',
          data: imageBuffer,
          transformation: {
            width: 794,
            height: 1123,
          },
          floating: {
            horizontalPosition: {
              relative: HorizontalPositionRelativeFrom.PAGE,
              align: HorizontalPositionAlign.CENTER,
            },
            verticalPosition: {
              relative: VerticalPositionRelativeFrom.PAGE,
              align: VerticalPositionAlign.CENTER,
            },
          },
        })

        return new Paragraph({
          children: index === canvases.length - 1 ? [imageDoc] : [imageDoc, new PageBreak()],
        })
      }),
    )

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
              size: {
                width: pageWidth,
                height: pageHeight,
              },
            },
          },
          children: imageParagraphs,
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `examen-${topic}.docx`)
  }

  const dataURLToArrayBuffer = (dataURL: string): ArrayBuffer => {
    const base64 = dataURL.split(',')[1]
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Guarda tu trabajo</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        <Button onClick={() => downloadFile('WORD')} disabled={isGenerating} className="flex items-center w-1/3">
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          WORD
        </Button>
        <Button
          onClick={() => downloadFile('PDF')}
          disabled={isGenerating}
          variant="destructive"
          className="flex items-center w-1/3"
        >
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          PDF
        </Button>
        <Button
          onClick={() => downloadFile('JPG')}
          disabled={isGenerating}
          className="flex items-center bg-green-500 hover:bg-green-400 w-1/3"
        >
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          JPG
        </Button>
      </CardContent>
    </Card>
  )
}
