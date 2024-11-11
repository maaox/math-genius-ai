import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

import { MesssageAPI } from '@/lib/interfaces'

const groq = new Groq({ apiKey: process.env.API_KEY_AI })

export async function GET() {
  return NextResponse.json({ message: 'Hola, funciona correctamente' })
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Faltan mensajes' }, { status: 400 })
    }

    const content = await generateResponse(messages)

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error al obtener la respuesta de la IA:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

async function generateResponse(messages: MesssageAPI[]): Promise<string> {
  const systemPrompt: MesssageAPI = {
    role: 'system',
    content:
      'Eres un docente experto que resuelve cualquier pregunta académica. Tus respuestas para fórmulas matemáticas siempre usan el lenguaje LaTeX.',
  }

  const chatCompletion = await groq.chat.completions.create({
    messages: [systemPrompt, ...messages],
    model: 'llama3-8b-8192',
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  })

  const content = chatCompletion.choices[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('La respuesta de la IA está vacía.')
  }

  return content
}
