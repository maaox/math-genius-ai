'use client'

import React, { useState } from 'react'

import { DownloadOptions } from '@/app/fichas-de-multiplicacion/components/DownloadOptions'
import { MultiplicationTableSelector } from '@/app/fichas-de-multiplicacion/components/MultiplicationTableSelector'
import { PreviewSection } from '@/app/fichas-de-multiplicacion/components/PreviewSection'
import { TemplateGallery } from '@/app/fichas-de-multiplicacion/components/TemplateGallery'

export default function MultiplicationSheets() {
  const [selectedTables, setSelectedTables] = useState<number[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  return (
    <div className="container pt-28 pb-16 md:pt-36 md:pb-24 px-4 mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-secondary">
        Generador de Fichas de Multiplicación
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MultiplicationTableSelector selectedTables={selectedTables} onSelectTables={setSelectedTables} />
        <TemplateGallery selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </div>
      <PreviewSection selectedTables={selectedTables} selectedTemplate={selectedTemplate} />
      <DownloadOptions selectedTables={selectedTables} selectedTemplate={selectedTemplate} />
    </div>
  )
}
