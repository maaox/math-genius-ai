import { Exercise, MesssageAPI } from '@/lib/interfaces'

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

export async function fetchChatResponse(messages: MesssageAPI[]): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Error al obtener la respuesta de la IA')
  }

  const data = await response.json()
  return data.content
}
