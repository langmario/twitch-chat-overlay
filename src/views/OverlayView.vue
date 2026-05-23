<script setup lang="ts">
import { ChatClient } from '@twurple/chat'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Overlay from '../components/Overlay.vue'
import type { ChatEvent } from '../types'

const route = useRoute()
const events = ref<ChatEvent[]>([])

const client = new ChatClient({
  channels: route.params.channel ? [route.params.channel.toString()] : [],
})

client.onConnect(() => console.log('Chat client connected'))
client.onDisconnect(() => console.log('Chat client disconnected'))
client.onMessage((_channel, user, text, msg) => {
  events.value.push({
    type: 'message',
    user: {
      name: msg.userInfo.displayName,
      color: msg.userInfo.color,
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

onMounted(() => {
  client.connect()
})
onUnmounted(() => {
  client.quit()
})
</script>

<template>
  <div class="h-dvh w-full text-xl">
    <Overlay :events="events" />
  </div>
</template>
