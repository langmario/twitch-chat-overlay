export type User = {
  avatar_url: string
  display_name: string
  id: string
  role_ids: string[]
  style: object
  username: string
}

export type EmoteFile = {
  format: string
  frame_count: number
  height: number
  name: string
  size: number
  static_name: string
  width: number
}

export type EmoteData = {
  animated: boolean
  flags: number
  host: {
    files: EmoteFile[]
    url: string
  }
  id: string
  lifecycle: number
  listed: boolean
  name: string
  owner: User
}

export type Emote = {
  actor_id: string
  data: EmoteData
  flags: number
  id: string
  name: string
  origin_id: unknown
  timestamp: number
}

export type EmoteSet = {
  capacity: number
  emote_count: number
  emotes: Emote[]
  flags: number
  id: string
  immutable: boolean
  name: string
  owner: User
  privileged: boolean
  tags: unknown[]
}

export type Response = {
  display_name: string
  emote_capacity: number
  emote_set: EmoteSet
  emote_set_id: string
  id: string
  linked_at: number
  platform: string
  user: User
  username: string
}

export interface ParsedMessageSevenTvEmotePart {
  type: '7tv_emote'
  name: string
  url: string
  files: EmoteFile[]
}
