<script setup lang="ts">
import { buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'

import { parseMessage } from '@/functions/parsing'
import type { Emote as EmoteType } from '@/types/seventv.type'

import Emote from './Emote.vue'

const { text, emoteOffsets, sevenTvEmotes } = defineProps<{
  text: string
  emoteOffsets: Map<string, string[]>
  sevenTvEmotes?: EmoteType[]
}>()

const chunks = computed(() => parseMessage(text, emoteOffsets, sevenTvEmotes ?? []))
</script>

<template>
  <template v-for="chunk of chunks">
    <span v-if="chunk.type === 'text'">{{ chunk.text }}</span>
    <Emote
      v-else-if="chunk.type === 'emote'"
      :src="buildEmoteImageUrl(chunk.id, { size: '2.0', backgroundType: 'dark' })"
      :name="chunk.name"
    />
    <Emote
      v-else-if="chunk.type === '7tv_emote'"
      :src="chunk.url + '/' + chunk.files.at(3)?.name"
      :name="chunk.name"
    />
  </template>
</template>
