import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

import { Exercise, RequestBody } from '@/lib/interfaces'

const groq = new Groq({ apiKey: process.env.API_KEY_AI })

interface ResponseIA {
  exercises: Exercise[]
}

export async function GET() {
  return NextResponse.json({ hello: 'Hola, funciona correctamente' })
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { topic, quantity, difficulty } = body

    if (!topic || !quantity || !difficulty || !difficulty.length) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
    }

    const exercises = await generateExercises(topic, Number(quantity), difficulty)

    return NextResponse.json({ exercises })
  } catch (error) {
    console.error('Error al generar ejercicios:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

function distributeExercises(totalExercises: number, difficultyLevels: number): number[] {
  const baseExercisesPerLevel = Math.floor(totalExercises / difficultyLevels)
  const remainingExercises = totalExercises % difficultyLevels

  const exercisesPerLevel = Array(difficultyLevels).fill(baseExercisesPerLevel)
  for (let i = 0; i < remainingExercises; i++) {
    exercisesPerLevel[i]++
  }

  return exercisesPerLevel
}

async function generateExercises(topic: string, quantity: number, difficulties: string[]): Promise<Exercise[]> {
  const exercisesPerLevel = distributeExercises(quantity, difficulties.length)
  let response: ResponseIA = { exercises: [] }

  for (let i = 0; i < difficulties.length; i++) {
    const level = difficulties[i]
    const numExercises = exercisesPerLevel[i]

    // Construir el prompt y mensaje para el systema, esl asistente y usuaio
    const systemPrompt =
      'Eres un generador de contenido educativo que crea ejercicios en español sobre un tema y nivel de dificultad específicos.'

    const userPrompt = `
    Genera ${numExercises} ejercicios en español sobre el tema "${topic}" con un nivel de dificultad "${level}".
    Cada ejercicio debe incluir una pregunta clara y concisa.
    Devuelve únicamente un array JSON de ejercicios, donde cada objeto tiene una propiedad "question" con la pregunta.
    Ejemplo:
    [
      { "question": "¿Cuál es la capital de España?" },
      { "question": "Explica el proceso de la fotosíntesis." }
    ]
    `.trim()

    // Realizar la llamada a la API de Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
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
    let levelExercises: ResponseIA
    try {
      levelExercises = JSON.parse(content)

      // Validar que se generó el número exacto de ejercicios
      if (levelExercises.exercises.length !== numExercises) {
        console.error(
          `Se esperaban ${numExercises} ejercicios de nivel "${level}", pero se recibieron ${levelExercises.exercises.length}.`,
        )
        throw new Error(`La IA no generó la cantidad correcta de ejercicios para el nivel "${level}".`)
      }

      response = { exercises: response.exercises.concat(levelExercises.exercises) }
    } catch (error) {
      console.error('Error al parsear el JSON:', error)
      throw new Error('Error al parsear la respuesta de la IA.')
    }
  }

  return response.exercises
}
