export type Message = {
  id: string
  user: User
  flags?: Flags
  text: string
  emoteOffsets: Map<string, string[]>
  deleted?: boolean
  parent?: {
    user: string
    text: string
  }
}

export type Flags = {
  isMod?: boolean
  isVIP?: boolean
  isFirst?: boolean
  isBroadcaster?: boolean
  isBot?: boolean
  isCommand?: boolean
}

export type User = {
  name: string
  color?: string
  badges: Map<string, string>
}
