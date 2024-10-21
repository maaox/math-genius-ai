'use client'

import { Card, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface MultiplicationTableSelectorProps {
  selectedTables: number[]
  onSelectTables: (tables: number[]) => void
}

export const MultiplicationTableSelector: React.FC<MultiplicationTableSelectorProps> = ({
  selectedTables,
  onSelectTables,
}) => {
  const toggleTable = (table: number) => {
    if (selectedTables.includes(table)) {
      onSelectTables(selectedTables.filter((t) => t !== table))
    } else {
      onSelectTables([...selectedTables, table])
    }
  }

  const toggleAll = (checked: boolean) => {
    if (checked) {
      onSelectTables(Array.from({ length: 12 }, (_, i) => i + 1))
    } else {
      onSelectTables([])
    }
  }

  return (
    <Card className="flex flex-col justify-between mb-8 bg-white p-8 rounded-lg shadow-md h-[350px]">
      <CardTitle className="text-2xl font-semibold mb-4 text-blue-600">Selección de Tablas</CardTitle>
      <div className="grid grid-cols-3 justify-items-stretch gap-4 mb-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((table) => (
          <div key={table} className="flex items-center space-x-2">
            <Checkbox
              id={`table-${table}`}
              checked={selectedTables.includes(table)}
              onCheckedChange={() => toggleTable(table)}
            />
            <Label htmlFor={`table-${table}`} className="text-gray-700">
              Tabla del {table}
            </Label>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Switch id="select-all" checked={selectedTables.length === 12} onCheckedChange={toggleAll} />
        <Label htmlFor="select-all" className="text-gray-700">
          Seleccionar todas las tablas
        </Label>
      </div>
    </Card>
  )
}
