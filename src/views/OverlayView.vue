<script setup lang="ts">
import { ChatClient } from '@twurple/chat'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { Queue } from '@/Queue'

import Overlay from '../components/Overlay.vue'
import type { ChatEvent } from '../types'

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

onMounted(() => {
  client.connect()
})
onUnmounted(() => {
  client.quit()
})
</script>

<template>
  <div class="h-screen w-full bg-mist-950/95 text-lg">
    <Overlay :events="events" />
  </div>
</template>
