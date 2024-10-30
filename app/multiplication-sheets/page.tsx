'use client'

import React, { useState } from 'react'

import { DownloadOptions } from '@/app/multiplication-sheets/components/DownloadOptions'
import { MultiplicationTableSelector } from '@/app/multiplication-sheets/components/MultiplicationTableSelector'
import { PreviewSection } from '@/app/multiplication-sheets/components/PreviewSection'
import { TemplateGallery } from '@/app/multiplication-sheets/components/TemplateGallery'

export default function MultiplicatiosSheets() {
  const [selectedTables, setSelectedTables] = useState<number[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Generador de Fichas de Multiplicación</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MultiplicationTableSelector selectedTables={selectedTables} onSelectTables={setSelectedTables} />
        <TemplateGallery selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </div>
      <PreviewSection
        selectedTables={selectedTables}
        selectedTemplate={selectedTemplate}
        generatedImages={generatedImages}
        onImagesGenerated={setGeneratedImages}
      />
      <DownloadOptions generatedImages={generatedImages} />
    </div>
  )
}
