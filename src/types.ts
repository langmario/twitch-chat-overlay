import type { ChatUser } from '@twurple/chat'

export type Message = {
  id: string
  user: Pick<
    ChatUser,
    | 'displayName'
    | 'color'
    | 'isArtist'
    | 'isBroadcaster'
    | 'isFounder'
    | 'isLeadMod'
    | 'isMod'
    | 'isSubscriber'
    | 'isVip'
    | 'badges'
  >
  text: string
  emoteOffsets: Map<string, string[]>
  deleted?: boolean
  parent?: {
    user: string
    text: string
  }
}
