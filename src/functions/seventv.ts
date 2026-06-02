import type { ParsedMessagePart } from '@twurple/chat'

import type { Emote, Response } from '@/types/seventv.type'

import type { MessageChunk } from './parsing'

export async function getSevenTvEmotes(channel: string) {
  const channelId = await getChannelId(channel)

  const res = await fetch(`https://7tv.io/v3/users/twitch/${channelId}`)

  if (res.ok) {
    const data = (await res.json()) as Response
    return data.emote_set.emotes
  }

  return []
}

export async function getChannelId(name: string) {
  const channelId = await fetch(`https://decapi.me/twitch/id/${name}`).then((res) => res.text())
  return channelId
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

export function parseSevenTvEmotePositions(text: string, emotes: Emote[]) {
  return emotes
    .flatMap((emote) => {
      try {
        const regex = new RegExp(`\\b${escapeRegex(emote.name)}\\b`, 'g')
        const matches = [...text.matchAll(regex)]
        return matches.map((match) => ({
          name: emote.name,
          start: match.index,
          end: match.index + match[0].length,
        }))
      } catch (err) {
        console.error(text, err)
      }
    })
    .filter((o) => o !== undefined)
    .sort((a, b) => a.start - b.start)
}

export function parseSevenTvEmotes(parts: ParsedMessagePart[], emotes: Emote[]): MessageChunk[] {
  return parts.flatMap((part) => {
    if (part.type !== 'text') {
      return part
    }

    const emotePositions = parseSevenTvEmotePositions(part.text, emotes)
    if (emotePositions.length > 0) {
      const message = part.text
      const result: MessageChunk[] = []
      let currentPosition = 0
      for (const token of emotePositions) {
        if (token.start > currentPosition) {
          result.push({
            type: 'text',
            position: currentPosition,
            length: token.start - currentPosition,
            text: message.substring(currentPosition, token.start),
          })
        }

        const emote = emotes.find((e) => e.name === token.name)!

        result.push({
          type: '7tv_emote',
          name: token.name,
          url: emote.data.host.url,
          files: emote.data.host.files,
        })
        currentPosition = token.end
      }

      if (currentPosition < message.length) {
        result.push({
          type: 'text',
          position: currentPosition,
          length: message.length - currentPosition,
          text: message.substring(currentPosition),
        })
      }

      return result.filter((p) => p.type !== 'text' || p.text.trim().length > 0)
    }

    return part
  })
}
