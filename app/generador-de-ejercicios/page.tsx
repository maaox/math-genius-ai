'use client'

import React, { useState } from 'react'

import { DownloadOptions } from '@/app/generador-de-ejercicios/components/DownloadOptions'
import { ExercisesConfiguration } from '@/app/generador-de-ejercicios/components/ExerciseConfiguration'
import { PreviewSection } from '@/app/generador-de-ejercicios/components/PreviewSection'
import { TemplateGallery } from '@/app/generador-de-ejercicios/components/TemplateGallery'

export default function MultiplicatiosSheets() {
  const [enteredTopic, setEnteredTopic] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('3')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  return (
    <div className="container pt-28 pb-16 md:pt-36 md:pb-24 px-4 mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-secondary">Generador de Ejercicios</h1>
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
      />
      <DownloadOptions enteredTopic={enteredTopic} selectedTemplate={selectedTemplate} />
    </div>
  )
}
