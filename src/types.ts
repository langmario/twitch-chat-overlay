export type ChatEvent = ChatMessageEvent | ChatSubEvent

export type ChatMessageEvent = {
  type: 'message'
  user: User
  text: string
  emoteOffsets: Map<string, string[]>
  parent?: {
    user: string
    text: string
  }
}

export type ChatSubEvent = {
  type: 'sub'
  user: User
  plan: string
  months: number
}

export type User = {
  name: string
  color?: string
}
