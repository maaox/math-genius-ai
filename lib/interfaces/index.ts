export interface Exercise {
  question: string
  answer?: string
}

export interface RequestBody {
  topic: string
  quantity: number
  typeQuestion?: string[]
  difficulty: string[]
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  images?: string[]
  timestamp: Date
}

export interface PendingImage {
  id: string
  url: string
}

export interface MesssageAPI {
  role: 'system' | 'assistant' | 'user'
  content: string
}
