'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TemplateCategory, templates } from '@/lib/constants/templates'

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-primary">Selecciona una plantilla</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Categorías como botones redondeados */}
        <div className="flex space-x-2">
          {Object.keys(templates).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(category as TemplateCategory)}
              className={'px-4 py-2 rounded-full capitalize'}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Renderizar plantillas de la categoría seleccionada */}
        <ScrollArea className="h-48 rounded-md border bg-slate-50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {templates[activeCategory].map((template) => (
              <Label key={template.id} className="cursor-pointer">
                <Card
                  key={template.id}
                  className={`w-full cursor-pointer ${
                    selectedTemplate === template.id ? 'border-2 border-blue-500 bg-blue-50' : 'border'
                  }`}
                  onClick={() => onSelectTemplate(template.id)}
                >
                  <CardContent className="p-2">
                    <div className="relative w-full h-36">
                      <Image
                        src={template.image}
                        alt={template.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Label>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
