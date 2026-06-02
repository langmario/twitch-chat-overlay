<script setup lang="ts">
import { computed } from 'vue'
import IconReply from '~icons/mdi/reply'

import IconBot from '@/assets/bot.png'
import IconBroadcaster from '@/assets/broadcaster.png'
import IconMod from '@/assets/mod.png'
import IconVIP from '@/assets/vip.png'
import type { Message } from '@/types'
import type { Emote } from '@/types/seventv.type.ts'

import FormattedMessage from './FormattedMessage.vue'

const { user, text, emoteOffsets, flags } = defineProps<Message & { sevenTvEmotes?: Emote[] }>()

const type = computed(() => {
  switch (true) {
    case flags.includes('BROADCASTER'):
      return 'broadcaster'
    case flags.includes('BOT'):
      return 'bot'
    case flags.includes('MODERATOR'):
      return 'moderator'
    case flags.includes('VIP'):
      return 'vip'
  }
})
</script>

<template>
  <li
    :data-type="type"
    :data-deleted="deleted"
    :style="{ '--user-color': user.color }"
    class="group/message relative overflow-clip rounded px-2 py-0.5 data-[type=bot]:bg-blue-400/10 data-[type=broadcaster]:bg-broadcaster/10 data-[type=mod]:bg-mod/10 data-[type=vip]:bg-vip/10"
  >
    <div v-if="parent" class="flex gap-0.5 truncate pl-1 text-xs font-bold opacity-50">
      <IconReply class="shrink-0 -scale-x-100" />
      <span class="truncate pr-0.5 italic">{{ parent.text }}</span>
    </div>
    <div>
      <div class="mr-1.5 inline-block">
        <img v-if="type === 'broadcaster'" :src="IconBroadcaster" class="mr-1.5 inline h-lh" />
        <img v-else-if="type === 'bot'" :src="IconBot" class="mr-1.5 inline h-lh" />
        <img v-else-if="type === 'moderator'" :src="IconMod" class="mr-1.5 inline h-lh" />
        <img v-else-if="type === 'vip'" :src="IconVIP" class="mr-1.5 inline h-lh" />
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
