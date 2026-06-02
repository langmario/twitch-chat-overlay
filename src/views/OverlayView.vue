<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Chat from '../components/Chat.vue'

const route = useRoute()
const channel = computed(() => route.params.channel?.toString())
</script>

<template>
  <div class="relative h-svh w-full bg-black text-white">
    <Chat v-if="channel" :channel="channel" />
  </div>
</template>
