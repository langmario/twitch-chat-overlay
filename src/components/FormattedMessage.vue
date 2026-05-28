<script setup lang="ts">
import { parseChatMessage, buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'

const { text, emoteOffsets } = defineProps<{ text: string; emoteOffsets: Map<string, string[]> }>()

const chunks = computed(() => parseChatMessage(text, emoteOffsets))
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
      class="inline"
      :class="isEmoteOnly ? 'h-[1.5lh]' : 'h-[1.2lh]'"
    />
  </template>
</template>
