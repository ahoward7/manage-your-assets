<template>
  <input v-model="text" class="px-3 py-2 bg-gray-50 outline-none duration-200">
</template>

<script setup lang="ts">
const text = defineModel()
</script>
