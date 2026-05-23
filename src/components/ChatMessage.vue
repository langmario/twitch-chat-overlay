<script setup lang="ts">
import { parseChatMessage, buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'
import IconReply from '~icons/mdi/reply'

import type { ChatMessageEvent } from '@/types'

const { user, text, emoteOffsets } = defineProps<Omit<ChatMessageEvent, 'type'>>()
const message = computed(() => parseChatMessage(text, emoteOffsets))
</script>

<template>
  <li class="flex flex-col px-4 py-1.5 leading-tight">
    <div class="flex items-end gap-2">
      <div class="text-[0.8em] font-bold" :style="{ color: user.color }">{{ user.name }}:</div>
      <div
        v-if="parent"
        class="flex items-center gap-1 overflow-hidden text-[0.8em] leading-tight opacity-50"
      >
        <IconReply class="shrink-0 -scale-x-100" />
        <span class="truncate">{{ parent.text }}</span>
      </div>
    </div>
    <div class="group/text" :data-emote-only="message.every((c) => c.type === 'emote')">
      <template v-for="chunk of message">
        <span v-if="chunk.type === 'text'">{{ chunk.text }}</span>
        <img
          v-else-if="chunk.type === 'emote'"
          class="-mt-0.5 inline-block h-[1.3lh] align-middle group-data-[emote-only=true]/text:h-14"
          :title="chunk.name"
          :src="buildEmoteImageUrl(chunk.id, { size: '3.0', backgroundType: 'dark' })"
        />
      </template>
    </div>
  </li>
</template>
