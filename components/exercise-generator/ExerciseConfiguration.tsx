'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ExercisesConfigurationProps {
  enteredTopic: string
  selectedQuantity: string
  selectedDifficulty: string[]
  onEnteredTopic: (topic: string) => void
  onSelectedQuantity: (quantity: string) => void
  onSelectedDifficulty: (difficulty: string[]) => void
}

export const ExercisesConfiguration: React.FC<ExercisesConfigurationProps> = ({
  enteredTopic,
  selectedQuantity,
  selectedDifficulty,
  onEnteredTopic,
  onSelectedQuantity,
  onSelectedDifficulty,
}) => {
  const handleDifficultyChange = (value: string) => {
    let newSelectedDifficulty = [...selectedDifficulty]
    if (newSelectedDifficulty.includes(value)) {
      newSelectedDifficulty = newSelectedDifficulty.filter((item) => item !== value)
    } else {
      newSelectedDifficulty.push(value)
    }
    onSelectedDifficulty(newSelectedDifficulty)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-primary">Personaliza tus ejercicios</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="topic">¿Qué tema quieres practicar hoy?</Label>
          <Input
            id="topic"
            type="text"
            placeholder="Ingresa el tema deseado"
            defaultValue={enteredTopic}
            onChange={(e) => onEnteredTopic(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">¿Cuántos ejercicios necesitas? </Label>
          <Input
            id="quantity"
            type="number"
            value={selectedQuantity}
            onChange={(e) => onSelectedQuantity(e.target.value)}
            min="3"
            max="40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Label>¿Qué tan difícil lo quieres?</Label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="basico"
                checked={selectedDifficulty.includes('basico')}
                onCheckedChange={() => handleDifficultyChange('basico')}
              />
              <Label htmlFor="basico">Básico</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intermedio"
                checked={selectedDifficulty.includes('intermedio')}
                onCheckedChange={() => handleDifficultyChange('intermedio')}
              />
              <Label htmlFor="intermedio">Intermedio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="avanzado"
                checked={selectedDifficulty.includes('avanzado')}
                onCheckedChange={() => handleDifficultyChange('avanzado')}
              />
              <Label htmlFor="avanzado">Avanzado</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
