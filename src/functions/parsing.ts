import { parseChatMessage, type ParsedMessagePart } from '@twurple/chat'

import type { Emote, ParsedMessageSevenTvEmotePart } from '@/types/seventv.type'

import { parseSevenTvEmotes } from './seventv'

export type MessageChunk = ParsedMessagePart | ParsedMessageSevenTvEmotePart

export function parseMessage(
  text: string,
  twitchEmoteOffsets: Map<string, string[]>,
  sevenTvEmotes: Emote[],
): MessageChunk[] {
  const twitchChunks = parseChatMessage(text, twitchEmoteOffsets)
  const allChunks = parseSevenTvEmotes(twitchChunks, sevenTvEmotes)

  return allChunks
}
