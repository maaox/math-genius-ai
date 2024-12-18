'use client'

import { MultiplicationCard } from './MultiplicationCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getTemplateById } from '@/lib/constants/templates'

interface PreviewSectionProps {
  selectedTables: number[]
  selectedTemplate: string
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ selectedTables, selectedTemplate }) => {
  const template = getTemplateById(selectedTemplate)
  const logoUrl = '/images/KAI.png'

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-primary">Así se verá tu trabajo</CardTitle>
      </CardHeader>

      <CardContent>
        {selectedTables.length > 0 && selectedTemplate ? (
          <ScrollArea className="h-[450px] rounded-md border bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 p-4">
              {selectedTables.map((number) => (
                <MultiplicationCard key={number} number={number} template={template?.image || ''} logoUrl={logoUrl} />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        ) : (
          <div className="h-24 px-8 flex justify-center items-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-100">
            <p className="text-slate-400 text-center">Selecciona las tablas y una plantilla para ver cómo queda</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
