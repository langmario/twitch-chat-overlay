import { describe, expect, test } from 'vitest'

import type { MessageChunk } from './parsing'
import {
  parseSevenTvEmotePositions,
  parseSevenTvEmotes,
  type Emote,
  type EmoteData,
} from './seventv'

const testData: EmoteData = {
  animated: false,
  flags: 0,
  host: {
    files: [
      { format: '', frame_count: 0, height: 0, name: '', size: 0, static_name: '', width: 0 },
    ],
    url: '',
  },
  id: '',
  lifecycle: 0,
  listed: true,
  name: '',
  owner: {
    avatar_url: '',
    display_name: '',
    id: '',
    role_ids: [],
    style: {},
    username: '',
  },
}
const emotes: Emote[] = [
  {
    name: 'peepoGiggle',
    actor_id: '',
    flags: 0,
    id: '',
    origin_id: '',
    timestamp: 0,
    data: testData,
  },
  {
    name: 'KEKW',
    actor_id: '',
    flags: 0,
    id: '',
    origin_id: '',
    timestamp: 0,
    data: testData,
  },
  {
    name: 'W',
    actor_id: '',
    flags: 0,
    id: '',
    origin_id: '',
    timestamp: 0,
    data: testData,
  },
  {
    name: 'YEP',
    actor_id: '',
    flags: 0,
    id: '',
    origin_id: '',
    timestamp: 0,
    data: testData,
  },
]

describe('parseEmotePositions', () => {
  test('single emote', () => {
    const parsed = parseSevenTvEmotePositions('peepoGiggle', emotes)
    expect(parsed).toHaveLength(1)
    expect(parsed).toContainEqual({ name: 'peepoGiggle', start: 0, end: 11 })
  })

  test('emote at start', () => {
    const parsed = parseSevenTvEmotePositions('peepoGiggle was geht', emotes)
    expect(parsed).toHaveLength(1)
    expect(parsed).toContainEqual({ name: 'peepoGiggle', start: 0, end: 11 })
  })

  test('emote at end', () => {
    const parsed = parseSevenTvEmotePositions('was geht peepoGiggle', emotes)
    expect(parsed).toHaveLength(1)
    expect(parsed).toContainEqual({ name: 'peepoGiggle', start: 9, end: 20 })
  })

  test('multiple emotes', () => {
    const parsed = parseSevenTvEmotePositions('peepoGiggle KEKW', emotes)
    expect(parsed).toHaveLength(2)
    expect(parsed).toContainEqual({ name: 'peepoGiggle', start: 0, end: 11 })
    expect(parsed).toContainEqual({ name: 'KEKW', start: 12, end: 16 })
  })

  test('multiple emotes with other text', () => {
    const parsed = parseSevenTvEmotePositions('hey was peepoGiggle KEKW geeeeht', emotes)
    expect(parsed).toHaveLength(2)
    expect(parsed).toContainEqual({ name: 'peepoGiggle', start: 8, end: 19 })
    expect(parsed).toContainEqual({ name: 'KEKW', start: 20, end: 24 })
  })

  test('no emote', () => {
    const parsed = parseSevenTvEmotePositions('What', emotes)
    expect(parsed).toHaveLength(0)
  })
})

describe('parseSevenTvEmotes', () => {
  test('single emote', () => {
    const parsed = parseSevenTvEmotes(
      [{ type: 'text', text: 'peepoGiggle', length: 11, position: 0 }],
      emotes,
    )
    expect(parsed).toHaveLength(1)
    parsed.forEach((part) => {
      expect(part).toHaveProperty('type', '7tv_emote')
    })
  })

  test('single emote with trailing space', () => {
    const parsed = parseSevenTvEmotes(
      [{ type: 'text', text: 'peepoGiggle ', length: 11, position: 0 }],
      emotes,
    )
    expect(parsed).toHaveLength(1)
    parsed.forEach((part) => {
      expect(part).toHaveProperty('type', '7tv_emote')
    })
  })

  test('single emote with text before', () => {
    const parsed = parseSevenTvEmotes(
      [
        {
          type: 'text',
          text: 'bro KEKW',
          length: 8,
          position: 0,
        },
      ],
      emotes,
    )
    expect(parsed).toHaveLength(2)
    expect(parsed).toContainEqual<MessageChunk>({
      type: 'text',
      length: expect.any(Number),
      position: expect.any(Number),
      text: 'bro ',
    })
    expect(parsed).toContainEqual<MessageChunk>({
      type: '7tv_emote',
      name: 'KEKW',
      files: expect.any(Array),
      url: expect.any(String),
    })
  })

  test('single emote with text after', () => {
    const parsed = parseSevenTvEmotes(
      [{ type: 'text', text: 'YEP all of them', length: 0, position: 0 }],
      emotes,
    )

    expect(parsed).toHaveLength(2)
    expect(parsed).toContainEqual<MessageChunk>({
      type: '7tv_emote',
      name: 'YEP',
      files: expect.any(Array),
      url: expect.any(String),
    })
    expect(parsed).toContainEqual<MessageChunk>({
      type: 'text',
      length: expect.any(Number),
      position: expect.any(Number),
      text: ' all of them',
    })
  })

  test('multiple emote', () => {
    const parsed = parseSevenTvEmotes(
      [{ type: 'text', text: 'peepoGiggle peepoGiggle', length: 0, position: 0 }],
      emotes,
    )
    expect(parsed).toHaveLength(2)
    parsed.forEach((part) => {
      expect(part).toHaveProperty('type', '7tv_emote')
    })
  })
})
