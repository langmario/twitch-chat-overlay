<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Chat from '../components/Chat.vue'

const route = useRoute()
const channel = computed(() => route.params.channel?.toString())
</script>

<template>
  <div class="relative h-screen w-full bg-mist-950/98">
    <Chat v-if="channel" :channel="channel" />
  </div>
</template>
