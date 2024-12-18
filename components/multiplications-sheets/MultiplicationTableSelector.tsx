'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-primary">Selecciona las tablas</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col items-center justify-center">
        <div className="space-y-8 w-11/12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((table) => (
              <div key={table} className="flex items-center space-x-2">
                <Checkbox
                  id={`table-${table}`}
                  checked={selectedTables.includes(table)}
                  onCheckedChange={() => toggleTable(table)}
                />
                <Label htmlFor={`table-${table}`}>Tabla del {table}</Label>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="select-all"
              checked={selectedTables.length === 12}
              onCheckedChange={toggleAll}
              aria-label="Seleccionar todas las tablas"
            />
            <Label htmlFor="select-all">Seleccionar todas las tablas</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
