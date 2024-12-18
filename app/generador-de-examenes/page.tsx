'use client'

import { useState } from 'react'

import { DownloadOptions, ExamConfiguration, PreviewSection, TemplateGallery } from '@/components/exam-generator'

export default function ExamGenerator() {
  const [enteredTopic, setEnteredTopic] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState('6')
  const [selectedTypeQuestion, setSelectedTypeQuestion] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  return (
    <div className="container pt-28 pb-16 md:pt-36 md:pb-24 px-4 mx-auto space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-secondary">Generador de Exámenes</h1>
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
      />
      <DownloadOptions enteredTopic={enteredTopic} selectedTemplate={selectedTemplate} />
    </div>
  )
}
