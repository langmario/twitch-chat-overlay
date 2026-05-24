<script setup lang="ts">
import { parseChatMessage, buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'
import IconReply from '~icons/mdi/reply'

import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { ChatMessageEvent } from '@/types'

const { compact, user, text, emoteOffsets } = defineProps<
  { compact?: boolean } & Omit<ChatMessageEvent, 'type'>
>()
const messageChunks = computed(() => parseChatMessage(text, emoteOffsets))
</script>

<template>
  <li class="group/message px-4 py-1.5 leading-tight" :data-compact="compact">
    <div v-if="parent" class="mb-1 flex gap-1 truncate text-[0.8em] text-mist-500">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="font-bold">{{ parent.user }}: </span>
      <span class="truncate">{{ parent.text }}</span>
    </div>
    <div>
      <span class="inline-block text-mist-200">
        <div class="mr-2 inline-flex h-lh gap-1 align-bottom empty:mr-0">
          <img
            v-if="user.badges.has('moderator')"
            :src="IconMod"
            class="inline align-text-bottom"
          />
          <img v-if="user.badges.has('vip')" :src="IconVIP" class="inline align-text-bottom" />
        </div>
        <span class="text-twitch font-bold" :style="{ color: user.color }">{{ user.name }}</span>
        <span class="mr-1">:</span>
      </span>
      <span>
        <template v-for="chunk of messageChunks">
          <span v-if="chunk.type === 'text'">{{ chunk.text }}</span>
          <img
            v-else-if="chunk.type === 'emote'"
            :src="buildEmoteImageUrl(chunk.id, { size: '2.0', backgroundType: 'dark' })"
            :title="chunk.name"
            class="inline h-lh"
          />
        </template>
      </span>
    </div>
  </li>
</template>
