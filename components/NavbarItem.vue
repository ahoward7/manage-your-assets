<template>
  <NuxtLink :to="to" class="hover:text-blue-500 duration-300 font-semibold">
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
