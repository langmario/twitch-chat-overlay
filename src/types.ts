export type Message = {
  id: string
  user: User
  flags: string[]
  text: string
  emoteOffsets: Map<string, string[]>
  deleted?: boolean
  parent?: {
    user: string
    text: string
  }
}

export type User = {
  name: string
  color?: string
  badges: Map<string, string>
}
