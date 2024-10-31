'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ExamConfigurationProps {
  enteredTopic: string
  selectedQuantity: string
  selectedTypeQuestion: string[]
  selectedDifficulty: string[]
  onEnteredTopic: (topic: string) => void
  onSelectedQuantity: (quantity: string) => void
  onSelectedTypeQuestion: (TypeQuestion: string[]) => void
  onSelectedDifficulty: (difficulty: string[]) => void
}

export const ExamConfiguration: React.FC<ExamConfigurationProps> = ({
  enteredTopic,
  selectedQuantity,
  selectedTypeQuestion,
  selectedDifficulty,
  onEnteredTopic,
  onSelectedQuantity,
  onSelectedTypeQuestion,
  onSelectedDifficulty,
}) => {
  const handleTypeQuestionChange = (value: string) => {
    let newSelectedTypeQuestion = [...selectedTypeQuestion]
    if (newSelectedTypeQuestion.includes(value)) {
      newSelectedTypeQuestion = newSelectedTypeQuestion.filter((item) => item !== value)
    } else {
      newSelectedTypeQuestion.push(value)
    }
    onSelectedTypeQuestion(newSelectedTypeQuestion)
  }

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
    <Card className="mb-8 bg-white rounded-lg shadow-md h-[470px]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-blue-600">Configuración para el Examen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Tema Específico</Label>
          <Input
            id="topic"
            type="text"
            placeholder="Ingresa el tema deseado"
            defaultValue={enteredTopic}
            onChange={(e) => onEnteredTopic(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Cantidad de Preguntas</Label>
          <Input
            id="quantity"
            type="number"
            value={selectedQuantity}
            onChange={(e) => onSelectedQuantity(e.target.value)}
            min="6"
            max="40"
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo de preguntas</Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eleccion-multiple"
                checked={selectedTypeQuestion.includes('eleccion multiple')}
                onCheckedChange={() => handleTypeQuestionChange('eleccion multiple')}
              />
              <Label htmlFor="eleccion multiple">Elección múltiple</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rellenar-espacios"
                checked={selectedTypeQuestion.includes('rellenar espacios')}
                onCheckedChange={() => handleTypeQuestionChange('rellenar espacios')}
              />
              <Label htmlFor="rellenar espacios">Rellenar espacios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="respuesta-corta"
                checked={selectedTypeQuestion.includes('respuesta corta')}
                onCheckedChange={() => handleTypeQuestionChange('respuesta corta')}
              />
              <Label htmlFor="respuesta corta">Respuesta corta</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="problemas"
                checked={selectedTypeQuestion.includes('problemas')}
                onCheckedChange={() => handleTypeQuestionChange('problemas')}
              />
              <Label htmlFor="problemas">Problemas</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nivel de Dificultad</Label>
          <div className="flex space-x-4">
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
