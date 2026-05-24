<script setup lang="ts">
import { parseChatMessage, buildEmoteImageUrl } from '@twurple/chat'
import { computed } from 'vue'
import IconReply from '~icons/mdi/reply'

import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { ChatMessageEvent } from '@/types'

import FormattedMessage from './FormattedMessage.vue'

const { compact, user, text, emoteOffsets } = defineProps<
  { compact?: boolean } & Omit<ChatMessageEvent, 'type'>
>()
const emit = defineEmits<{ highlight: [] }>()

const messageChunks = computed(() => parseChatMessage(text, emoteOffsets))
const isMod = computed(() => user.badges.get('moderator') === '1')
const isVIP = computed(() => user.badges.get('vip') === '1')
</script>

<template>
  <li
    :data-mod="isMod"
    :data-vip="isVIP"
    class="group/message data-[mod=true]:border-l-mod data-[vip=true]:border-l-vip cursor-pointer border-y-2 border-l-4 border-transparent px-4 py-1 leading-tight transition hover:bg-white/10"
    @click="emit('highlight')"
  >
    <div v-if="parent" class="mb-1 flex gap-1 truncate text-[0.8em] text-mist-500">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="font-bold">{{ parent.user }}: </span>
      <span class="truncate">{{ parent.text }}</span>
    </div>
    <div>
      <span class="inline-block text-mist-200">
        <div class="mr-1.5 inline-flex h-lh gap-1 align-bottom empty:mr-0">
          <img v-if="isMod" :src="IconMod" class="inline align-text-bottom" />
          <img v-if="isVIP" :src="IconVIP" class="inline align-text-bottom" />
        </div>
        <span class="text-twitch font-bold" :style="{ color: user.color }">{{ user.name }}</span>
        <span class="mr-1">:</span>
      </span>
      <span>
        <FormattedMessage :text="text" :emote-offsets="emoteOffsets" />
      </span>
    </div>
  </li>
</template>
