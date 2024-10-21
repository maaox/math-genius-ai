'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TemplateCategory, templates } from '@/lib/constans/templates'

interface TemplateGalleryProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ selectedTemplate, onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('minimalista')

  const handleCategoryChange = (category: TemplateCategory) => {
    setActiveCategory(category)
  }

  return (
    <Card className="mb-8 bg-white p-8 rounded-lg shadow-md h-[350px]">
      <CardTitle className="text-2xl font-semibold mb-4 text-blue-600">Selecciona una plantilla</CardTitle>

      {/* Categorías como botones redondeados */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(templates).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category as TemplateCategory)}
            className={`px-4 py-2 rounded-full border-2 ${
              activeCategory === category ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
            } text-sm text-gray-700 capitalize`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Renderizar plantillas de la categoría seleccionada */}
      <RadioGroup value={selectedTemplate} onValueChange={onSelectTemplate}>
        <ScrollArea className="max-h-[180px] overflow-y-auto rounded-md border">
          <div className="grid grid-cols-4 gap-4 p-4">
            {templates[activeCategory].map((template) => (
              <Card
                key={template.id}
                className={`w-full cursor-pointer ${
                  selectedTemplate === template.id ? 'border-2 border-blue-500 bg-blue-50' : 'border'
                }`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <CardContent className="p-2">
                  <RadioGroupItem value={template.id} id={`template-${template.id}`} className="sr-only" />
                  <Label htmlFor={`template-${template.id}`} className="cursor-pointer block">
                    <div className="relative w-full h-[100px]">
                      <Image
                        src={template.image}
                        alt={template.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>
                    <span className="block text-center text-sm mt-2">{template.name}</span>
                  </Label>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </RadioGroup>
    </Card>
  )
}
