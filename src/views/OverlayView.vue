<script setup lang="ts">
import { ChatClient } from '@twurple/chat'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

import { Queue } from '@/Queue'

import Overlay from '../components/Overlay.vue'
import type { ChatEvent, ChatMessageEvent } from '../types'

const route = useRoute()
const events = ref(new Queue<ChatEvent>(100))

const client = new ChatClient({
  channels: route.params.channel ? [route.params.channel.toString()] : [],
})

client.onConnect(() => console.log('Chat client connected'))
client.onDisconnect(() => console.log('Chat client disconnected'))
client.onMessage((_channel, user, text, msg) => {
  console.log(msg.userInfo.badges)
  events.value.push({
    id: msg.id,
    type: 'message',
    user: {
      name: msg.userInfo.displayName,
      color: msg.userInfo.color,
      badges: msg.userInfo.badges,
    },
    text,
    emoteOffsets: msg.emoteOffsets,
    parent: msg.parentMessageId
      ? {
          user: msg.parentMessageUserDisplayName as string,
          text: msg.parentMessageText as string,
        }
      : undefined,
  })
})

const highlighted = ref<ChatMessageEvent>()
const showHighlighted = ref(false)

onMounted(() => {
  client.connect()
})
onUnmounted(() => {
  client.quit()
})
</script>

<template>
  <div class="relative h-screen w-full bg-mist-950/98">
    <Overlay
      :events="events"
      @highlight="
        (event) => {
          highlighted = event
          showHighlighted = true
        }
      "
    />
    <Transition
      enter-active-class="transition duration-750 ease-out-expo"
      leave-active-class="transition duration-750 ease-out-expo"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showHighlighted && highlighted"
        class="fixed inset-0 grid place-items-center bg-black/50"
        @click.self="showHighlighted = false"
      >
        <div
          class="mx-4 space-y-2 rounded-lg border-2 border-mist-800 bg-mist-950 p-4 text-center text-white shadow-2xl/100"
        >
          <div class="text-xl font-bold" :style="{ color: highlighted.user.color }">
            {{ highlighted.user.name }}
          </div>
          <div class="italic">
            &OpenCurlyDoubleQuote;{{ highlighted.text }}&CloseCurlyDoubleQuote;
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
