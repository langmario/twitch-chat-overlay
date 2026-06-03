<script setup lang="ts">
import { buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'

import { getMessageChunks, parseMessage } from '@/functions/parsing'
import type { Emote as EmoteType } from '@/types/seventv.type'

import Emote from './Emote.vue'

const { text, emoteOffsets, sevenTvEmotes } = defineProps<{
  text: string
  emoteOffsets: Map<string, string[]>
  sevenTvEmotes?: EmoteType[]
}>()

const chunks = computed(() => parseMessage(text, emoteOffsets, sevenTvEmotes ?? []))

const buildSevenTvUrl = (emote?: EmoteType) =>
  emote
    ? `${emote.data.host.url}/${emote.data.host.files.sort((a, b) => b.height - a.height).find((f) => f.format === 'WEBP')?.name}`
    : ''
</script>

<template>
  <template v-for="chunk of chunks">
    <span v-if="chunk.type === 'text'">{{ chunk.text }}</span>
    <Emote
      v-else-if="chunk.type === 'emote'"
      :name="chunk.name"
      :src="
        chunk.variant === 'twitch'
          ? buildEmoteImageUrl(chunk.id, { size: '3.0', backgroundType: 'dark' })
          : buildSevenTvUrl(sevenTvEmotes?.find((e) => e.name === chunk.name))
      "
    />
  </template>
</template>
