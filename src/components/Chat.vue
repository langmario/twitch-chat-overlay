<script setup lang="ts">
import { useChat } from '@/composables/chat.ts'

import ChatMessage from './ChatMessage.vue'

const { channel } = defineProps<{ channel: string }>()

const { messages } = useChat(channel, 50)
</script>

<template>
  <ul
    class="scrollbar-none flex size-full flex-col justify-end gap-0.5 overflow-scroll scroll-smooth py-2 leading-snug text-white"
  >
    <TransitionGroup
      enter-active-class="transition duration-800 ease-out-expo"
      enter-from-class="opacity-0 translate-y-8"
    >
      <ChatMessage v-for="message of messages" :key="message.id" v-bind="message" />
    </TransitionGroup>
  </ul>
</template>
