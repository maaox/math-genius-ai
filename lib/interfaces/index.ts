export interface Exercise {
  question?: string
  answer?: string
}

export interface RequestBody {
  topic: string
  quantity: number
  typeQuestion?: string[]
  difficulty: string[]
}
