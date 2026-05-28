<script setup lang="ts">
import { ChatClient } from '@twurple/chat'
import { onMounted, onUnmounted, ref } from 'vue'

import { Queue } from '@/Queue.ts'
import type { Message } from '@/types.ts'

import ChatMessage from './ChatMessage.vue'

const { channel } = defineProps<{ channel: string }>()
const client = new ChatClient({ channels: [channel] })

const messages = ref(new Queue<Message>(100))

client.onConnect(() => console.log('Chat client connected'))
client.onDisconnect(() => console.log('Chat client disconnected'))
client.onMessage((_channel, _user, text, msg) => {
  messages.value.push({
    id: msg.id,
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
  const msg = messages.value.find((m) => m.id === messageId)
  if (msg) {
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
  <ul
    class="scrollbar-none flex size-full flex-col justify-end gap-0.5 overflow-scroll py-2 text-white"
  >
    <TransitionGroup
      enter-active-class="transition duration-800 ease-out-expo"
      enter-from-class="opacity-0 translate-y-8"
    >
      <ChatMessage v-for="message of messages" :key="message.id" v-bind="message" />
    </TransitionGroup>
  </ul>
</template>
