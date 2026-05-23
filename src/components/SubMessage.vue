<script setup lang="ts">
import type { ChatSubEvent } from '@/types'

defineProps<Omit<ChatSubEvent, 'type'>>()
</script>

<template>
  <li class="border-twitch border-l-4 bg-white/5 px-4 py-2 leading-tight">
    <div>
      <div class="text-[0.8em] font-bold" :style="{ color: user.color }">{{ user.name }}:</div>
      <div>
        Subscribed for <span class="font-bold">{{ months }}</span> months
      </div>
    </div>
  </li>
</template>
