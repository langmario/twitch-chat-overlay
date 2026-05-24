<script setup lang="ts">
import type { ChatEvent } from '@/types'

import ChatMessage from './ChatMessage.vue'
import SubMessage from './SubMessage.vue'

defineProps<{ events: ChatEvent[] }>()
</script>

<template>
  <ul
    class="flex size-full snap-y snap-mandatory scrollbar-none flex-col justify-start overflow-scroll bg-mist-950/95 py-2 text-white *:last:snap-end *:last:scroll-mb-4"
  >
    <TransitionGroup
      enter-active-class="transition duration-1000 ease-out-expo"
      enter-from-class="opacity-0 translate-x-16"
    >
      <template v-for="event of events" :key="event.id">
        <ChatMessage v-if="event.type === 'message'" v-bind="event" compact />
      </template>
    </TransitionGroup>
  </ul>
</template>
