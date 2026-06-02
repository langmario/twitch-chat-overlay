<script setup lang="ts">
import { buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'

import { parseMessage } from '@/functions/parsing'
import type { Emote } from '@/types/seventv.type'

const { text, emoteOffsets, sevenTvEmotes } = defineProps<{
  text: string
  emoteOffsets: Map<string, string[]>
  sevenTvEmotes?: Emote[]
}>()

const chunks = computed(() => parseMessage(text, emoteOffsets, sevenTvEmotes ?? []))
const isEmoteOnly = computed(() =>
  chunks.value.every((c) => c.type === 'emote' || c.type === '7tv_emote'),
)
</script>

<template>
  <template v-for="chunk of chunks">
    <span v-if="chunk.type === 'text'">{{ chunk.text }}</span>
    <img
      v-else-if="chunk.type === 'emote'"
      :src="buildEmoteImageUrl(chunk.id, { size: '2.0', backgroundType: 'dark' })"
      class="inline"
      :title="chunk.name"
      :class="isEmoteOnly ? 'h-10' : 'h-[1.2lh]'"
    />
    <img
      v-else-if="chunk.type === '7tv_emote'"
      :src="chunk.url + '/' + chunk.files.at(3)?.name"
      class="inline"
      :title="chunk.name"
      :class="isEmoteOnly ? 'h-10' : 'h-[1.2lh]'"
    />
  </template>
</template>
