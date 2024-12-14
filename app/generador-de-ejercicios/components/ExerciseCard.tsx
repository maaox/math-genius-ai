import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { Exercise } from '@/lib/interfaces'

interface ExerciseCardProps {
  exercises: Exercise[]
  startIndex: number
  pageNumber: number
  template: string
  logoUrl: string
  selectedTopic: string
  selectedDifficulty: string[]
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercises,
  startIndex,
  pageNumber,
  template,
  logoUrl,
  selectedTopic,
  selectedDifficulty,
}) => {
  const titleText = `Ejercicios sobre ${selectedTopic} de nivel ${selectedDifficulty.join(', ')}`

  return (
    <Card className="exercise-card relative w-72 h-[26rem] overflow-hidden">
      {/* Imagen de fondo (plantilla) */}
      <Image src={template} alt="Plantilla" fill style={{ objectFit: 'cover' }} />

      {/* Contenido superpuesto */}
      <div className="absolute inset-0 p-8 flex flex-col items-center">
        {/* Logo en la parte superior derecha */}
        <div className="relative w-8 h-8 mt-4">
          <Image src={logoUrl} alt="Logo" fill style={{ objectFit: 'contain' }} />
        </div>

        {/* Título */}
        {pageNumber === 1 && <h2 className="mt-4 text-xs text-center font-bold text-[#10528a]">{titleText}</h2>}

        {/* Marca de agua */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="relative w-40 h-40">
            <Image src={logoUrl} alt="Marca de agua" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>

        {/* Ejercicios */}
        <div className="mt-4 flex-1 overflow-hidden">
          {exercises.map((exercise, index) => (
            <div key={index} className="mb-1">
              <p className="text-[6px] font-indieFlower">
                <span className="font-bold">{startIndex + index + 1}.</span> {exercise.question}
              </p>
            </div>
          ))}
        </div>

        {/* Número de página */}
        {/* <div className="mt-4 text-right">
          <p className="text-sm">Página {pageNumber}</p>
        </div> */}
      </div>
    </Card>
  )
}
