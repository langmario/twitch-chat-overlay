import { parseChatMessage, type ParsedMessagePart } from '@twurple/chat'

import { parseSevenTvEmotes, type Emote, type ParsedMessageSevenTvEmotePart } from './seventv'

export type MessageChunk = ParsedMessagePart | ParsedMessageSevenTvEmotePart

export function parseMessage(
  text: string,
  twitchEmoteOffsets: Map<string, string[]>,
  sevenTvEmotes: Emote[],
): MessageChunk[] {
  const twitchChunks = parseChatMessage(text, twitchEmoteOffsets)
  console.log(text, twitchChunks)
  const allChunks = parseSevenTvEmotes(twitchChunks, sevenTvEmotes)

  return allChunks
}
