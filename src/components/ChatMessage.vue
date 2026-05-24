<script setup lang="ts">
import { parseChatMessage, buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'
import IconVIP from '~icons/mdi/diamond-stone'
import IconReply from '~icons/mdi/reply'
import IconMod from '~icons/mdi/shield-account'

import type { ChatMessageEvent } from '@/types'

const { compact, user, text, emoteOffsets } = defineProps<
  { compact?: boolean } & Omit<ChatMessageEvent, 'type'>
>()
const messageChunks = computed(() => parseChatMessage(text, emoteOffsets))
</script>

<template>
  <li class="group/message px-4 py-1.5 leading-tight" :data-compact="compact">
    <div v-if="parent" class="flex gap-1 truncate text-[0.8em] text-mist-500">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="font-bold">{{ parent.user }}: </span>
      <span class="truncate">{{ parent.text }}</span>
    </div>
    <div class="">
      <span class="inline-block text-mist-200">
        <div class="mr-1 inline empty:mr-0">
          <IconMod v-if="user.badges.has('moderator')" class="inline align-text-bottom" />
          <IconVIP v-if="user.badges.has('vip')" class="inline align-text-bottom" />
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
            class="inline h-[1.4lh]"
          />
        </template>
      </span>
    </div>
  </li>
</template>
