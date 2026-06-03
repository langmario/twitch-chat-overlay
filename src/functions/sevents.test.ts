import { describe, expect, test } from 'vitest'

import { getEmoteOffsets } from './seventv'

describe('emote offset parsing', () => {
  test('single emote', () => {
    const emotes = new Set(['KEKW'])
    const message = 'KEKW'

    const offsets = getEmoteOffsets(message, emotes)

    expect(offsets.keys()).toContain('KEKW')
    expect(offsets.get('KEKW')).toContainEqual({ start: 0, end: 4 })
  })

  test('single emote multiple occurences', () => {
    const emotes = new Set(['KEKW'])
    const message = 'KEKW KEKW KEKW'

    const offsets = getEmoteOffsets(message, emotes)

    expect(offsets.keys()).toContain('KEKW')
    expect(offsets.get('KEKW')).toContainEqual({ start: 0, end: 4 })
    expect(offsets.get('KEKW')).toContainEqual({ start: 5, end: 9 })
    expect(offsets.get('KEKW')).toContainEqual({ start: 10, end: 14 })
  })

  test('single emote with other text', () => {
    const emotes = new Set(['KEKW'])
    const message = 'Hey guys this is hilarious KEKW cant wait for more!'

    const offsets = getEmoteOffsets(message, emotes)

    expect(offsets.keys()).toContain('KEKW')
    expect(offsets.get('KEKW')).toContainEqual({ start: 27, end: 31 })
  })

  test('multiple emotes', () => {
    const emotes = new Set(['KEKW', 'LuL', 'peepoGiggle'])
    const message = 'peepoGiggle KEKW LuL'

    const offsets = getEmoteOffsets(message, emotes)

    expect(offsets.keys()).toContain('peepoGiggle')
    expect(offsets.keys()).toContain('KEKW')
    expect(offsets.keys()).toContain('LuL')
    expect(offsets.get('peepoGiggle')).toContainEqual({ start: 0, end: 11 })
    expect(offsets.get('KEKW')).toContainEqual({ start: 12, end: 16 })
    expect(offsets.get('LuL')).toContainEqual({ start: 17, end: 20 })
  })
})
