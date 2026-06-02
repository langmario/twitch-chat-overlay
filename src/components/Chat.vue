<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useChat } from '@/composables/chat.ts'
import { getSevenTvEmotes, type Emote } from '@/functions/seventv.ts'

import ChatMessage from './ChatMessage.vue'

const { channel } = defineProps<{ channel: string }>()

const { messages, isConnected } = useChat(channel, 50)
const sevenTvEmotes = ref<Emote[]>([])

onMounted(async () => {
  const emotes = await getSevenTvEmotes(channel)
  console.log('emotes', emotes)
  sevenTvEmotes.value = emotes
})
</script>

<template>
  <div class="relative size-full overflow-hidden">
    <TransitionGroup
      tag="ul"
      move-class="transition-all duration-300 ease-in-out"
      enter-active-class="transition-all duration-300 ease-in-out"
      leave-active-class="transition-all duration-300 ease-in-out absolute"
      enter-from-class="opacity-0 translate-y-full"
      leave-to-class="opacity-0"
      class="scrollbar-none flex size-full flex-col justify-end gap-1 overflow-scroll scroll-smooth py-2 leading-snug transition-opacity"
      :class="{
        'opacity-50': !isConnected,
      }"
    >
      <ChatMessage
        v-for="message of messages"
        v-bind="message"
        :key="message.id"
        :seven-tv-emotes="sevenTvEmotes"
      />
    </TransitionGroup>
    <Transition
      enter-active-class="transition ease-out"
      leave-active-class="transition ease-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="!isConnected" class="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span>Offline</span>
        <span class="relative flex size-4 text-red-500">
          <span
            class="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75"
          ></span>
          <span class="relative inline-flex size-full rounded-full bg-current"></span>
        </span>
      </div>
    </Transition>
  </div>
</template>
