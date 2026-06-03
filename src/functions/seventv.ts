import type { Response } from '@/types/seventv.type'

import type { EmoteInterval, EmoteOffsets } from './parsing'

export async function getSevenTvEmotes(channel: string) {
  const channelId = await getChannelId(channel)

  const res = await fetch(`https://7tv.io/v3/users/twitch/${channelId}`)

  if (res.ok) {
    const data = (await res.json()) as Response
    return data.emote_set?.emotes ?? []
  }

  return []
}

export async function getChannelId(name: string) {
  const channelId = await fetch(`https://decapi.me/twitch/id/${name}`).then((res) => res.text())
  return channelId
}

declare global {
  interface RegExpConstructor {
    escape(value: string): string
  }
}

export function getEmoteOffsets(text: string, emoteNames: Set<string>): EmoteOffsets {
  const offsets = new Map<string, EmoteInterval[]>()
  const usedEmoteNames = text.split(' ').filter((word) => emoteNames.has(word))

  for (const emote of usedEmoteNames) {
    const regex = new RegExp(`\\b${RegExp.escape(emote)}\\b`, 'gu')
    const matches = text.matchAll(regex)
    for (const match of matches) {
      offsets.set(emote, [
        ...(offsets.get(emote) ?? []),
        { start: match.index, end: match.index + match[0].length },
      ])
    }
  }

  return offsets
}
