<script setup lang="ts">
import { computed } from 'vue'

import type { ChatEvent, ChatMessageEvent } from '@/types'

import ChatMessage from './ChatMessage.vue'
import SubMessage from './SubMessage.vue'

const { events } = defineProps<{ events: ChatEvent[] }>()
const emit = defineEmits<{ highlight: [ChatMessageEvent] }>()
</script>

<template>
  <ul
    class="flex size-full scrollbar-none flex-col justify-end gap-0.5 overflow-scroll py-2 text-white"
  >
    <TransitionGroup
      enter-active-class="transition duration-1000 ease-out-expo"
      enter-from-class="opacity-0 translate-x-16"
    >
      <template v-for="event of events" :key="event.id">
        <ChatMessage
          v-if="event.type === 'message'"
          v-bind="event"
          compact
          @highlight="emit('highlight', event)"
        />
      </template>
    </TransitionGroup>
  </ul>
</template>
