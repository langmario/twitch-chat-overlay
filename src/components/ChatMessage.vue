<script setup lang="ts">
import { computed, onMounted, toRaw } from 'vue'
import IconReply from '~icons/mdi/reply'

import IconBot from '@/assets/bot.png'
import IconBroadcaster from '@/assets/broadcaster.png'
import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { Message } from '@/types'
import type { Emote } from '@/types/seventv.type.ts'

import FormattedMessage from './FormattedMessage.vue'

const { user, text, emoteOffsets } = defineProps<Message & { sevenTvEmotes?: Emote[] }>()
const isBot = computed(() => user.badges.get('bot') === '1')
</script>

<template>
  <li
    :data-broadcaster="user.isBroadcaster"
    :data-bot="isBot"
    :data-mod="user.isMod"
    :data-vip="user.isVip"
    :data-subscriber="user.isSubscriber"
    :data-deleted="deleted"
    :style="{ '--user-color': user.color }"
    class="group/message relative overflow-clip rounded px-2 py-0.5 data-[bot=true]:bg-blue-400/15 data-[broadcaster=true]:bg-broadcaster/15 data-[mod=true]:bg-mod/15 data-[vip=true]:bg-vip/10"
  >
    <div v-if="parent" class="flex gap-0.5 truncate pl-1 text-xs font-bold opacity-50">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="truncate pr-0.5 italic">{{ parent.text }}</span>
    </div>
    <div>
      <div class="mr-1.5 inline-block">
        <img
          v-if="user.isBroadcaster"
          :src="IconBroadcaster"
          class="mr-1.5 inline h-[0.9lh] align-text-bottom"
        />
        <img v-else-if="isBot" :src="IconBot" class="mr-1.5 inline h-[0.9lh] align-text-bottom" />
        <img
          v-else-if="user.isMod"
          :src="IconMod"
          class="mr-1.5 inline h-[0.9lh] align-text-bottom"
        />
        <img
          v-else-if="user.isVip"
          :src="IconVIP"
          class="mr-1.5 inline h-[0.9lh] align-text-bottom"
        />
        <span id="username" class="font-bold">{{ user.displayName }}</span>
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
