import { Exercise } from '@/lib/interfaces'

export async function fetchExercises(
  topic: string,
  quantity: string,
  difficulty: string[],
  typeQuestion?: string[],
): Promise<Exercise[]> {
  const response = await fetch(`/api/${typeQuestion ? 'generate-exam' : 'generate-exercises'}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, quantity, difficulty, typeQuestion }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Error al obtener los ejercicios')
  }

  const data = await response.json()
  return data.exercises
}
