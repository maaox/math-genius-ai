'use client'

import React, { useState } from 'react'

import { DownloadOptions } from '@/app/math-exercises/components/DownloadOptions'
import { ExercisesConfiguration } from '@/app/math-exercises/components/ExercisesConfiguration'
import { PreviewSection } from '@/app/math-exercises/components/PreviewSection'
import { TemplateGallery } from '@/app/math-exercises/components/TemplateGallery'

export default function MultiplicatiosSheets() {
  const [enteredTopic, setEnteredTopic] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('6')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Generador de Ejercicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExercisesConfiguration
          enteredTopic={enteredTopic}
          selectedQuantity={selectedQuantity}
          selectedDifficulty={selectedDifficulty}
          onEnteredTopic={setEnteredTopic}
          onSelectedQuantity={setSelectedQuantity}
          onSelectedDifficulty={setSelectedDifficulty}
        />
        <TemplateGallery selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
      </div>
      <PreviewSection
        selectedTopic={enteredTopic}
        selectedQuantity={selectedQuantity}
        selectedDifficulty={selectedDifficulty}
        selectedTemplate={selectedTemplate}
        generatedImages={generatedImages}
        onImagesGenerated={setGeneratedImages}
      />
      <DownloadOptions generatedImages={generatedImages} />
    </div>
  )
}
