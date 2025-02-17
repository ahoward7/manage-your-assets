<template>
  <input
    v-model="text" class="px-3 py-2 bg-gray-50 outline-none duration-200" :class="{ 'bg-red-100': invalid }"
  >
</template>

<script setup lang="ts">
defineProps({
  invalid: {
    type: Boolean,
    default: false,
  },
})

const text = defineModel()
</script>
