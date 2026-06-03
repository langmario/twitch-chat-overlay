import { describe, expect, test } from 'vitest'

import { getCombinedEmoteOffsets, type EmoteOffsets } from './parsing'

describe('getCombinedEmoteOffsets', () => {
  test('combine single emotes', () => {
    const twitch: EmoteOffsets = new Map()
    const sevenTv: EmoteOffsets = new Map()

    twitch.set('KEKW', [{ start: 12, end: 16 }])
    sevenTv.set('peepoGiggle', [{ start: 0, end: 11 }])

    const combined = getCombinedEmoteOffsets(twitch, sevenTv)

    expect(combined).toHaveLength(2)
    expect(combined.at(0)).toHaveProperty('name', 'peepoGiggle')
    expect(combined.at(1)).toHaveProperty('name', 'KEKW')
  })
})
