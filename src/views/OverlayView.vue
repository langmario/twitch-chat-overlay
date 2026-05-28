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
client.onMessage((_channel, _user, text, msg) => {
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
    flags: {
      isMod: msg.userInfo.badges.get('moderator') === '1',
      isVIP: msg.userInfo.badges.get('vip') === '1',
      isBroadcaster: msg.userInfo.badges.get('broadcaster') === '1',
      isFirst: msg.isFirst,
    },
    parent: msg.isReply
      ? {
          user: msg.parentMessageUserDisplayName as string,
          text: msg.parentMessageText as string,
        }
      : undefined,
  })
})
client.onMessageRemove((_channel, messageId) => {
  const msg = events.value.find((m) => m.id === messageId)
  if (msg && msg.type === 'message') {
    msg.deleted = true
  }
})

onMounted(() => {
  client.connect()
})
onUnmounted(() => {
  client.quit()
})
</script>

<template>
  <div class="relative h-screen w-full bg-mist-950/98">
    <Overlay :events="events" />
  </div>
</template>
