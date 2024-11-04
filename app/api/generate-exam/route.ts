import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

import { Exercise, RequestBody } from '@/lib/interfaces'

const groq = new Groq({ apiKey: process.env.API_AI_KEY })

interface ResponseIA {
  exercises: Exercise[]
}

export async function GET() {
  return NextResponse.json({ message: 'Hola, funciona correctamente' })
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { topic, quantity, difficulty, typeQuestion } = body

    if (!topic || !quantity || !difficulty || !difficulty.length || !typeQuestion || !typeQuestion.length) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
    }

    const exercises = await generateExercises(topic, quantity, difficulty, typeQuestion)

    return NextResponse.json({ exercises })
  } catch (error) {
    console.error('Error al generar ejercicios:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

function distributeExercises(totalExercises: number, totalGroups: number): number[] {
  const baseExercisesPerGroup = Math.floor(totalExercises / totalGroups)
  const remainingExercises = totalExercises % totalGroups

  const exercisesPerGroup = Array(totalGroups).fill(baseExercisesPerGroup)
  for (let i = 0; i < remainingExercises; i++) {
    exercisesPerGroup[i]++
  }

  return exercisesPerGroup
}

function getPromptInstructionsAndExample(typeQuestions: string[]): {
  instructions: string
  example: string
} {
  const instructionsList: string[] = []
  const examplesList: string[] = []

  if (typeQuestions.includes('respuesta corta')) {
    instructionsList.push('- Preguntas de respuesta corta que requieren una respuesta concisa.')
    examplesList.push(
      `{
        "typeQuestion": "Respuesta corta",
        "question": "¿En qué año ocurrió la Revolución Francesa?",
        "answer": "1789"
      }`,
    )
  }

  if (typeQuestions.includes('problemas')) {
    instructionsList.push('- Problemas que requieren una solución detallada.')
    examplesList.push(
      `{
        "typeQuestion": "Problemas",
        "question": "Si María tiene 5 manzanas y regala 2, ¿cuántas le quedan?",
        "answer": "Le quedan 3 manzanas."
      }`,
    )
  }

  const instructions = `Genera ejercicios de los siguientes tipos:\n${instructionsList.join('\n')}`

  const example = `exercises: [\n${examplesList.join(',\n')}\n]`

  return { instructions, example }
}

async function generateExercises(
  topic: string,
  quantity: number,
  difficulties: string[],
  typeQuestions: string[],
): Promise<Exercise[]> {
  let response: ResponseIA = { exercises: [] }

  // Agrupar por dificultad y tipo de pregunta
  const groups = difficulties.map((difficulty) => ({
    difficulty,
    typeQuestions,
  }))

  // Distribuir ejercicios entre los grupos
  const exercisesPerGroup = distributeExercises(quantity, groups.length)

  for (let i = 0; i < groups.length; i++) {
    const { difficulty, typeQuestions } = groups[i]
    const numExercises = exercisesPerGroup[i]

    // Generar ejercicios para este grupo
    const groupExercises = await generateExercisesForGroup(topic, numExercises, difficulty, typeQuestions)

    response = { exercises: response.exercises.concat(groupExercises) }
  }

  return response.exercises
}

async function generateExercisesForGroup(
  topic: string,
  quantity: number,
  difficulty: string,
  typeQuestions: string[],
): Promise<Exercise[]> {
  const { instructions, example } = getPromptInstructionsAndExample(typeQuestions)

  const userPrompt = `
    Genera ${quantity} ejercicios en español sobre el tema "${topic}".
    Nivel de dificultad: "${difficulty}".
    Tipos de pregunta: "${typeQuestions.join('" y "')}".
    ${instructions}
    Devuelve únicamente un array JSON de ejercicios, siguiendo el siguiente formato:
    ${example}
    `.trim()

  // Realizar la llamada a la API de Groq
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'Eres un asistente que genera ejercicios educativos en español basados en un tema, nivel de dificultad y tipos de pregunta específicos.',
      },
      { role: 'user', content: userPrompt },
    ],
    model: 'llama3-8b-8192',
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    response_format: { type: 'json_object' },
    stop: null,
  })

  // Obtener el contenido de la respuesta
  const content = chatCompletion.choices[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('La respuesta de la IA está vacía.')
  }

  // Parsear el JSON de la respuesta
  let groupExercises: ResponseIA
  try {
    console.log(content)
    groupExercises = JSON.parse(content)

    // Validar que se generó el número exacto de ejercicios
    if (groupExercises.exercises.length < quantity) {
      console.error(
        `Se esperaban ${quantity} ejercicios para dificultad "${difficulty}", pero se recibieron ${groupExercises.exercises.length}.`,
      )
      throw new Error(`La IA no generó la cantidad correcta de ejercicios para dificultad "${difficulty}".`)
    }

    return groupExercises.exercises.length > quantity
      ? groupExercises.exercises.slice(0, quantity)
      : groupExercises.exercises
  } catch (error) {
    console.error('Error al parsear el JSON o validar la cantidad:', error)
    throw new Error('Error al parsear la respuesta de la IA.')
  }
}
