<template>
  <div class="text-sm font-semibold px-3 py-2 rounded-md" :class="typeClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as PropType<MessageType>,
    default: () => 'info',
  },
})

type MessageType = 'info' | 'error' | 'success'

const typeClasses: Record<MessageType, string> = {
  info: 'text-blue-500 bg-blue-100',
  error: 'text-red-500 bg-red-100',
  success: 'text-green-500 bg-green-100',
}

const typeClass = computed(() => {
  return typeClasses[props.type]
})
</script>
