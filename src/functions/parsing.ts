import type { Emote } from '@/types/seventv.type'

import { getEmoteOffsets } from './seventv'

export type EmoteInterval = { start: number; end: number }
export type EmoteOffsets = Map<string, EmoteInterval[]>

export interface EmotePosition {
  name: string
  type: 'twitch' | 'sevenTV'
  position: EmoteInterval
}

export type Chunk = TextChunk | EmoteChunk

export interface TextChunk {
  type: 'text'
  text: string
}

export interface EmoteChunk {
  type: 'emote'
  variant: 'twitch' | 'sevenTV'
  id: string
  name: string
}

export function parseMessage(
  text: string,
  twitchEmoteOffsets: Map<string, string[]>,
  sevenTvEmotes: Emote[],
) {
  const twitchOffsets = [...twitchEmoteOffsets.entries()].reduce(
    (map, [key, occurences]) =>
      map.set(
        key,
        occurences.map<EmoteInterval>((o) => {
          const [start, end] = o.split('-')
          return { start: Number(start), end: Number(end) + 1 }
        }),
      ),
    new Map<string, EmoteInterval[]>(),
  )

  const sevenTvEmoteNames = new Set(sevenTvEmotes.map((e) => e.name))
  const sevenTvOffsets = getEmoteOffsets(text, sevenTvEmoteNames)

  const globalOffsets = getCombinedEmoteOffsets(twitchOffsets, sevenTvOffsets)

  return getMessageChunks(text, globalOffsets)
}

export function getMessageChunks(message: string, emotes: EmotePosition[]) {
  const chunks: Chunk[] = []
  let currentPos = 0

  for (const emote of emotes) {
    if (emote.position.start > currentPos) {
      chunks.push({
        type: 'text',
        text: message.substring(currentPos, emote.position.start),
      })
      currentPos = emote.position.start
    }

    chunks.push({
      type: 'emote',
      variant: emote.type,
      id: emote.name,
      name: message.substring(emote.position.start, emote.position.end),
    })
    currentPos = emote.position.end
  }

  if (currentPos < message.length) {
    chunks.push({
      type: 'text',
      text: message.substring(currentPos),
    })
  }

  return chunks
}

export function getCombinedEmoteOffsets(twitch: EmoteOffsets, sevenTv: EmoteOffsets) {
  const intoList = (set: EmoteOffsets, type: 'twitch' | 'sevenTV') =>
    [...set.entries()].flatMap(([name, positions]) =>
      positions.map<EmotePosition>((pos) => ({ name, position: pos, type })),
    )
  const emotes = [...intoList(twitch, 'twitch'), ...intoList(sevenTv, 'sevenTV')].sort(
    (a, b) => a.position.start - b.position.start,
  )

  return emotes
}
