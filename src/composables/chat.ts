import { ChatClient } from '@twurple/chat'
import { onMounted, onUnmounted, ref } from 'vue'

import type { Message } from '@/types'

export const useChat = (channel: string) => {
  const client = new ChatClient({ channels: [channel] })

  const messages = ref<Message[]>([])

  client.onMessage((_channel, _user, text, msg) => {
    const message: Message = {
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
        isBot: msg.userInfo.badges.get('bot-badge') === '1',
        isCommand: /^![a-zA-Z]/.test(text),
        isFirst: msg.isFirst,
      },
      parent: msg.isReply
        ? {
            user: msg.parentMessageUserDisplayName as string,
            text: msg.parentMessageText as string,
          }
        : undefined,
    }

    if (!message.flags?.isBot && !message.flags?.isCommand) {
      messages.value.push(message)
    }
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

  return { messages }
}
