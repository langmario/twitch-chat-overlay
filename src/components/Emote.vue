<script lang="ts" setup>
defineProps<{ src: string; name: string }>()
</script>

<template>
  <img :src="src" class="inline h-[1.2lh]" :title="name" />
</template>
