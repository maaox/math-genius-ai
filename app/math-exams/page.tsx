'use client'

import React, { useState } from 'react'

import { DownloadOptions } from '@/app/math-exams/components/DownloadOptions'
import { ExamConfiguration } from '@/app/math-exams/components/ExamConfiguration'
import { PreviewSection } from '@/app/math-exams/components/PreviewSection'
import { TemplateGallery } from '@/app/math-exams/components/TemplateGallery'

export default function MultiplicatiosSheets() {
  const [enteredTopic, setEnteredTopic] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('6')
  const [selectedTypeQuestion, setSelectedTypeQuestion] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Generador de Exámenes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExamConfiguration
          enteredTopic={enteredTopic}
          selectedQuantity={selectedQuantity}
          selectedTypeQuestion={selectedTypeQuestion}
          selectedDifficulty={selectedDifficulty}
          onEnteredTopic={setEnteredTopic}
          onSelectedQuantity={setSelectedQuantity}
          onSelectedTypeQuestion={setSelectedTypeQuestion}
          onSelectedDifficulty={setSelectedDifficulty}
        />
        <TemplateGallery selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </div>
      <PreviewSection
        selectedTopic={enteredTopic}
        selectedQuantity={selectedQuantity}
        selectedTypeQuestion={selectedTypeQuestion}
        selectedDifficulty={selectedDifficulty}
        selectedTemplate={selectedTemplate}
        generatedImages={generatedImages}
        onImagesGenerated={setGeneratedImages}
      />
      <DownloadOptions enteredTopic={enteredTopic} generatedImages={generatedImages} />
    </div>
  )
}
