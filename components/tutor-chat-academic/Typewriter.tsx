import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

interface TypewriterProps {
  text: string
}

export const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let isCancelled = false

    const typeText = async () => {
      setDisplayedText('')
      const tokens = tokenize(text)
      for (const token of tokens) {
        if (isCancelled) break
        setDisplayedText((prev) => prev + token)
        await delay(20) // Ajusta la velocidad aquí
      }
    }

    typeText()

    return () => {
      isCancelled = true
    }
  }, [text])

  return (
    <div style={{ whiteSpace: 'pre-wrap', tabSize: 4 }} className="prose dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkMath, remarkBreaks]} rehypePlugins={[rehypeKatex]}>
        {displayedText}
      </ReactMarkdown>
    </div>
  )
}

// Función para retrasar la ejecución
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Función para tokenizar el texto
function tokenize(text: string): string[] {
  text = text.replace(/\t/g, '-') // Reemplaza tabulaciones por cuatro espacios
  const regex =
    /(```[\s\S]*?```)|(\$\$[\s\S]*?\$\$)|(\$[\s\S]*?\$)|(\*{1,3}[\s\S]+?\*{1,3})|  (__[\s\S]+?__)|(_[\s\S]+?_)|(~{2}[\s\S]+?~{2})|(\n)|(\s+)|([^\s]+)/g

  const tokens = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    tokens.push(match[0])
  }

  return tokens
}
