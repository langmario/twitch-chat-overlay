<script setup lang="ts">
import IconReply from '~icons/mdi/reply'

import IconBroadcaster from '@/assets/broadcaster.png'
import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { Message } from '@/types'
import type { Emote } from '@/types/seventv.type.ts'

import FormattedMessage from './FormattedMessage.vue'

const { user, text, emoteOffsets } = defineProps<Message & { sevenTvEmotes?: Emote[] }>()
</script>

<template>
  <li
    :data-broadcaster="flags?.isBroadcaster"
    :data-mod="flags?.isMod"
    :data-vip="flags?.isVIP"
    :data-first="flags?.isFirst"
    :data-deleted="deleted"
    :style="{ '--user-color': user.color }"
    class="group/message relative isolate overflow-clip rounded px-2 py-0.5 transition will-change-transform data-[broadcaster=true]:bg-broadcaster/10 data-[first=true]:bg-blue-300/10 data-[mod=true]:bg-mod/10 data-[vip=true]:bg-vip/10"
  >
    <div v-if="flags?.isFirst" class="text-xs text-blue-500 uppercase italic">First message</div>
    <div v-if="parent" class="flex gap-0.5 truncate text-xs opacity-50">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="truncate pr-0.5 italic">{{ parent.text }}</span>
    </div>
    <div>
      <div class="mr-1.5 inline-block">
        <img v-if="flags?.isBroadcaster" :src="IconBroadcaster" class="mr-1.5 inline h-lh" />
        <img v-else-if="flags?.isMod" :src="IconMod" class="mr-1.5 inline h-lh" />
        <img v-else-if="flags?.isVIP" :src="IconVIP" class="mr-1.5 inline h-lh" />
        <span id="username" class="font-bold">{{ user.name }}</span>
        <span>:</span>
      </div>
      <div class="inline group-data-[deleted=true]/message:blur-sm">
        <FormattedMessage
          :text="text"
          :emote-offsets="emoteOffsets"
          :seven-tv-emotes="sevenTvEmotes"
        />
      </div>
    </div>
  </li>
</template>

<style scoped>
#username {
  --color: var(--user-color, var(--color-twitch));
  color: hsl(from var(--color) h s max(l, 40));
}
</style>
