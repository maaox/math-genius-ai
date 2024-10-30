'use client'

import { Packer, Document, Paragraph, ImageRun } from 'docx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import JSZip from 'jszip'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DownloadOptionsProps {
  generatedImages: string[]
}

export const DownloadOptions: React.FC<DownloadOptionsProps> = ({ generatedImages }) => {
  const downloadFile = (format: string) => {
    if (generatedImages.length === 0) {
      alert('No hay imágenes generadas para descargar.')
      return
    }

    if (format === 'JPG') {
      downloadAsImages()
    } else if (format === 'PDF') {
      downloadAsPDF()
    } else if (format === 'WORD') {
      downloadAsWord()
    }
  }

  const downloadAsImages = () => {
    if (generatedImages.length === 1) {
      // Descargar imagen única
      const link = document.createElement('a')
      link.href = generatedImages[0]
      link.download = 'tabla_multiplicar.jpg'
      link.click()
    } else {
      // Crear un zip con las imágenes
      const zip = new JSZip()
      generatedImages.forEach((imgData, index) => {
        const base64Data = imgData.split(',')[1]
        zip.file(`tabla_multiplicar_${index + 1}.jpg`, base64Data, { base64: true })
      })
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'tablas_multiplicar.zip')
      })
    }
  }

  const downloadAsPDF = () => {
    const pdf = new jsPDF('portrait', 'pt', 'a4')

    const pageWidth = pdf.internal.pageSize.getWidth() - 50
    const pageHeight = pdf.internal.pageSize.getHeight() - 50

    generatedImages.forEach((imgData, index) => {
      if (index > 0) {
        pdf.addPage()
      }
      pdf.addImage(imgData, 'JPEG', 25, 25, pageWidth, pageHeight)
    })

    pdf.save('tablas_multiplicar.pdf')
  }

  const downloadAsWord = async () => {
    const imageParagraphs = generatedImages.map((imgData) => {
      const imageBuffer = dataURLToArrayBuffer(imgData)

      return new Paragraph({
        children: [
          new ImageRun({
            data: imageBuffer,
            transformation: {
              width: 595,
              height: 842,
            },
            type: 'jpg',
          }),
        ],
      })
    })

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                orientation: 'portrait',
                width: 11906, // 210mm en twips
                height: 16838, // 297mm en twips
              },
            },
          },
          children: imageParagraphs,
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'tablas_multiplicar.docx')
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
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-blue-600">Opciones de descarga</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button onClick={() => downloadFile('WORD')} className="flex items-center bg-blue-500 hover:bg-blue-600">
          <Download className="mr-2 h-4 w-4" /> WORD
        </Button>
        <Button onClick={() => downloadFile('PDF')} className="flex items-center bg-red-500 hover:bg-red-600">
          <Download className="mr-2 h-4 w-4" /> PDF
        </Button>
        <Button onClick={() => downloadFile('JPG')} className="flex items-center bg-green-500 hover:bg-green-600">
          <Download className="mr-2 h-4 w-4" /> JPG
        </Button>
      </CardContent>
    </Card>
  )
}
