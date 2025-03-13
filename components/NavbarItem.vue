<template>
  <NuxtLink :to="to" class="relative px-1 hover:text-blue-500 underline-animation duration-300">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>
