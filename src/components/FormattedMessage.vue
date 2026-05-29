<script setup lang="ts">
import { parseChatMessage, buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'

import type { EmoteOffsets } from '@/types'

const { text, emoteOffsets } = defineProps<{ text: string; emoteOffsets: EmoteOffsets }>()

const chunks = computed(() =>
  parseChatMessage(text, new Map<string, string[]>(Object.entries(emoteOffsets))),
)
const isEmoteOnly = computed(() =>
  chunks.value
    .filter((c) => c.type !== 'text' || c.text.trim().length > 0)
    .every((c) => c.type === 'emote'),
)
</script>

<template>
  <template v-for="chunk of chunks">
    <span v-if="chunk.type === 'text'">{{ chunk.text }}</span>
    <img
      v-else-if="chunk.type === 'emote'"
      :src="buildEmoteImageUrl(chunk.id, { size: '2.0', backgroundType: 'dark' })"
      :title="chunk.name"
      class="-my-0.5 inline"
      :class="isEmoteOnly ? 'h-10' : 'h-[1.2lh]'"
    />
  </template>
</template>
