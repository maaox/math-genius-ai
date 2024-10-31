import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

import { Combination, Exercise, RequestBody } from '@/lib/interfaces'

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

function generateCombinations(difficulties: string[], typeQuestions: string[]): Combination[] {
  const combinations: Combination[] = []
  for (const difficulty of difficulties) {
    for (const typeQuestion of typeQuestions) {
      combinations.push({ difficulty, typeQuestion })
    }
  }
  return combinations
}

function distributeExercises(
  totalExercises: number,
  combinations: Combination[],
): { combination: Combination; exercisesCount: number }[] {
  const distributions: { combination: Combination; exercisesCount: number }[] = []

  // Si el número de ejercicios es mayor o igual al número de combinaciones
  if (totalExercises >= combinations.length) {
    const baseExercisesPerCombination = Math.floor(totalExercises / combinations.length)
    const remainingExercises = totalExercises % combinations.length

    // Asignar el número base de ejercicios a todas las combinaciones
    for (const combination of combinations) {
      distributions.push({
        combination,
        exercisesCount: baseExercisesPerCombination,
      })
    }

    // Distribuir los ejercicios restantes
    for (let i = 0; i < remainingExercises; i++) {
      distributions[i].exercisesCount += 1
    }
  } else {
    // Si el número de ejercicios es menor que el número de combinaciones
    // Seleccionar aleatoriamente combinaciones hasta cubrir el total de ejercicios
    const shuffledCombinations = combinations.sort(() => Math.random() - 0.5)
    for (let i = 0; i < totalExercises; i++) {
      distributions.push({
        combination: shuffledCombinations[i],
        exercisesCount: 1,
      })
    }
    // Asegurar que no hay combinaciones con cero ejercicios
  }

  return distributions
}

function getPromptForTypeQuestion(typeQuestion: string): {
  instructions: string
  example: string
} {
  switch (typeQuestion) {
    case 'eleccion multiple':
      return {
        instructions:
          'Cada ejercicio debe ser una pregunta de elección múltiple con 4 opciones y la respuesta correcta indicada.',
        example: `exercises: [
        {
            "question": "¿Cuál es la capital de Francia?",
            "options": ["Madrid", "Berlín", "París", "Roma"],
            "answer": "París"
        }
        ]`,
      }
    case 'rellenar espacios':
      return {
        instructions: 'Cada ejercicio debe ser una oración con espacios en blanco para completar.',
        example: `exercises: [
        {
            "question": "La capital de España es _____.",
            "answer": "Madrid"
        }
        ]`,
      }
    case 'respuesta corta':
      return {
        instructions: 'Cada ejercicio debe ser una pregunta que requiera una respuesta corta.',
        example: `exercises: [
        {
            "question": "¿En qué año llegó Colón a América?",
            "answer": "1492"
        }
        ]`,
      }
    case 'problemas':
      return {
        instructions: 'Cada ejercicio debe ser un problema que requiera una solución detallada.',
        example: `exercises: [
        {
            "question": "Si Juan tiene 3 manzanas y compra 2 más, ¿cuántas manzanas tiene en total?",
            "answer": "Juan tiene 5 manzanas en total."
        }
        ]`,
      }
    default:
      return { instructions: '', example: '' }
  }
}

async function generateExercises(
  topic: string,
  quantity: number,
  difficulties: string[],
  typeQuestions: string[],
): Promise<Exercise[]> {
  // Generar combinaciones de dificultad y tipo de pregunta
  const combinations = generateCombinations(difficulties, typeQuestions)

  // Distribuir ejercicios entre las combinaciones
  const distributions = distributeExercises(quantity, combinations)

  let response: ResponseIA = { exercises: [] }

  for (const { combination, exercisesCount } of distributions) {
    const { difficulty, typeQuestion } = combination

    // Verificar si hay ejercicios asignados a esta combinación
    if (exercisesCount > 0) {
      const { instructions, example } = getPromptForTypeQuestion(typeQuestion)

      const userPrompt = `
        Genera ${exercisesCount > 1 ? 'ejercicios' : 'ejercicio'} en español sobre el tema "${topic}".
        Nivel de dificultad: "${difficulty}".
        Tipo de pregunta: "${typeQuestion}".
        ${instructions}
        Devuelve únicamente un array JSON de ejercicios de tamaño ${exercisesCount}, siguiendo el siguiente formato:
        ${example}
        `.trim()

      // Realizar la llamada a la API de Groq
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'Eres un asistente que genera ejercicios educativos en español basados en un tema, nivel de dificultad y tipo de pregunta específicos.',
          },
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
      let combinationExercises: ResponseIA
      try {
        combinationExercises = JSON.parse(content)

        // Validar que se generó el número exacto de ejercicios
        if (combinationExercises.exercises.length < exercisesCount) {
          console.error(
            `Se esperaban ${exercisesCount} ejercicios para dificultad "${difficulty}" y tipo "${typeQuestion}", pero se recibieron ${combinationExercises.exercises.length}.`,
          )
          throw new Error(
            `La IA no generó la cantidad correcta de ejercicios para dificultad "${difficulty}" y tipo "${typeQuestion}".`,
          )
        }

        console.log({ exam: combinationExercises.exercises })
        response = {
          exercises:
            combinationExercises.exercises.length > exercisesCount
              ? response.exercises.concat(combinationExercises.exercises.slice(0, exercisesCount))
              : response.exercises.concat(combinationExercises.exercises),
        }
      } catch (error) {
        console.error('Error al parsear el JSON o validar la cantidad:', error)
        throw new Error('Error al parsear la respuesta de la IA.')
      }
    }
  }

  return response.exercises
}
