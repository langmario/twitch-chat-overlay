<script setup lang="ts">
import IconReply from '~icons/mdi/reply'

import IconBroadcaster from '@/assets/broadcaster.png'
import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { Message } from '@/types'

import FormattedMessage from './FormattedMessage.vue'

const { user, text, emoteOffsets } = defineProps<Message>()
</script>

<template>
  <li
    :data-broadcaster="flags?.isBroadcaster"
    :data-mod="flags?.isMod"
    :data-vip="flags?.isVIP"
    :data-first="flags?.isFirst"
    :data-deleted="deleted"
    class="group/message relative px-3 py-0.5 transition data-[broadcaster=true]:bg-broadcaster/5 data-[first=true]:bg-blue-300/5 data-[mod=true]:bg-mod/5 data-[vip=true]:bg-vip/5"
  >
    <div
      class="absolute inset-y-0 left-0 w-1 rounded-r group-data-[broadcaster=true]/message:bg-broadcaster group-data-[mod=true]/message:bg-mod group-data-[vip=true]/message:bg-vip"
    ></div>
    <div v-if="flags?.isFirst" class="text-xs text-blue-400 uppercase">First message</div>
    <div v-if="parent" class="flex gap-0.5 truncate text-sm text-mist-500">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="truncate pr-0.5 italic">{{ parent.text }}</span>
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
        <span id="username" class="font-bold" :style="{ '--user-color': `${user.color}` }">
          {{ user.name }}
        </span>
        <span class="mr-1">:</span>
      </span>
      <span class="group-data-[deleted=true]/message:blur-sm">
        <FormattedMessage :text="text" :emote-offsets="emoteOffsets" />
      </span>
    </div>
  </li>
</template>

<style scoped>
#username {
  --color: var(--user-color, var(--color-twitch));
  color: hsl(from var(--color) h s max(l, 40));
}
</style>
