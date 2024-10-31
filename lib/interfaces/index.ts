export interface Exercise {
  question?: string
  options?: string[]
  answer?: string
}

export interface RequestBody {
  topic: string
  quantity: number
  typeQuestion?: string[]
  difficulty: string[]
}

export interface Combination {
  difficulty: string
  typeQuestion: string
}
