<template>
  <div class="relative select-none">
    <div class="flex items-center justify-center bg-blue-500 text-white font-bold outline-none rounded-md pr-3 pl-1 py-1 cursor-pointer" @click="expanded = !expanded">
      <Icon icon="radix-icons:caret-down" class="w-6 h-6" />
      <span>{{ label }}</span>
    </div>
    <div class="absolute right-0 flex flex-col bg-white px-2 py-2 rounded-md shadow-md border duration-300" :class="expanded ? 'h-[72px] opacity-1 top-[38px] z-10' : 'top-6 h-0 opacity-0 z-[-1]'">
      <div
        v-for="option in options"
        :key="option.option"
        value="Logout"
        class="relative group flex items-center text-sm text-nowrap font-semibold border-blue-500 hover:bg-blue-500 hover:text-white select-none outline-none px-2 py-1 cursor-pointer rounded-sm"
        @click="emit('select', option.option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<SelectOption[]>,
  },
})

const emit = defineEmits(['select'])

const expanded = ref(false)
</script>
