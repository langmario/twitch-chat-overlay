<script setup lang="ts">
import type { ChatEvent } from '@/types'

import ChatMessage from './ChatMessage.vue'

const { events } = defineProps<{ events: ChatEvent[] }>()
</script>

<template>
  <ul
    class="scrollbar-none flex size-full flex-col justify-end gap-0.5 overflow-scroll py-2 text-white"
  >
    <TransitionGroup
      enter-active-class="transition duration-1000 ease-out-expo"
      enter-from-class="opacity-0 translate-x-16"
    >
      <template v-for="event of events" :key="event.id">
        <ChatMessage v-if="event.type === 'message'" v-bind="event" />
      </template>
    </TransitionGroup>
  </ul>
</template>
