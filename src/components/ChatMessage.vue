<script setup lang="ts">
import IconReply from '~icons/mdi/reply'

import IconBroadcaster from '@/assets/broadcaster.png'
import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { ChatMessageEvent } from '@/types'

import FormattedMessage from './FormattedMessage.vue'

const { user, text, emoteOffsets } = defineProps<Omit<ChatMessageEvent, 'type'>>()
</script>

<template>
  <li
    :data-broadcaster="flags?.isBroadcaster"
    :data-mod="flags?.isMod"
    :data-vip="flags?.isVIP"
    :data-first="flags?.isFirst"
    class="group/message cursor-pointer border-y-2 border-l-4 border-transparent px-4 py-0.5 leading-tight transition hover:bg-white/7 data-[broadcaster=true]:border-l-broadcaster data-[broadcaster=true]:bg-broadcaster/7 data-[first=true]:border-l-blue-300 data-[first=true]:bg-blue-300/7 data-[mod=true]:border-l-mod data-[mod=true]:bg-mod/7 data-[vip=true]:border-l-vip data-[vip=true]:bg-vip/7"
  >
    <div v-if="parent" class="mb-1 flex gap-1 truncate text-[0.8em] text-mist-500">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="font-bold">{{ parent.user }}: </span>
      <span class="truncate">{{ parent.text }}</span>
    </div>
    <div>
      <span class="inline-block text-mist-200">
        <div class="mr-1.5 inline-flex h-lh gap-1 align-bottom empty:mr-0">
          <img
            v-if="flags?.isBroadcaster"
            :src="IconBroadcaster"
            class="inline align-text-bottom"
          />
          <img v-if="flags?.isMod" :src="IconMod" class="inline align-text-bottom" />
          <img v-if="flags?.isVIP" :src="IconVIP" class="inline align-text-bottom" />
        </div>
        <span class="font-bold text-twitch" :style="{ color: user.color }">{{ user.name }}</span>
        <span class="mr-1">:</span>
      </span>
      <span>
        <FormattedMessage :text="text" :emote-offsets="emoteOffsets" />
      </span>
    </div>
  </li>
</template>
