import { ChatClient } from '@twurple/chat'
import { onMounted, onUnmounted, ref } from 'vue'

import type { Message } from '@/types'

export class Chat<T> extends Array<T> {
  constructor(readonly size: number) {
    super()
  }

  push(...items: T[]): number {
    for (const item of items) {
      this.addToQueue(item)
    }

    return items.length
  }

  private addToQueue(item: T) {
    if (this.length >= this.size) {
      super.shift()
    }
    super.push(item)
  }
}

export const useChat = (channel: string, options = { max_size: 100 }) => {
  const client = new ChatClient({ channels: [channel] })

  const isConnected = ref(false)
  const messages = ref<Message[]>([])

  client.onConnect(() => (isConnected.value = true))
  client.onDisconnect(() => (isConnected.value = false))
  client.onMessage((_channel, _user, text, msg) => {
    const flags: string[] = []
    if (msg.userInfo.badges.get('moderator') === '1') flags.push('MOD')
    if (msg.userInfo.badges.get('vip') === '1') flags.push('VIP')
    if (msg.userInfo.badges.get('broadcaster') === '1') flags.push('BROADCASTER')
    if (msg.userInfo.badges.get('bot-badge') === '1') flags.push('BOT')
    if (msg.isFirst) flags.push('FIRST_MESSAGE')
    const message: Message = {
      id: msg.id,
      user: {
        name: msg.userInfo.displayName,
        color: msg.userInfo.color,
        badges: msg.userInfo.badges,
      },
      text: text.trim(),
      emoteOffsets: msg.emoteOffsets,
      flags,
      parent: msg.isReply
        ? {
            user: msg.parentMessageUserDisplayName as string,
            text: msg.parentMessageText as string,
          }
        : undefined,
    }

    if (messages.value.length >= options.max_size) {
      messages.value.splice(0, messages.value.length - options.max_size)
    }
    messages.value.push(message)
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

  return { messages, isConnected }
}
