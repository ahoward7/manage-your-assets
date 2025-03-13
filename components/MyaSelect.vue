<template>
  <div ref="selectRef" class="relative select-none">
    <div class="relative z-10 flex items-center bg-blue-500 text-white font-bold outline-none rounded-md pr-3 pl-1 py-1 cursor-pointer" @click="expanded = !expanded">
      <Icon icon="radix-icons:caret-down" class="w-6 h-6" />
      <span class="grow flex justify-center">{{ label }}</span>
    </div>
    <div class="interpolate-keywords min-w-28 absolute right-0 flex flex-col gap-2 bg-white px-2 py-2 rounded-md shadow-md border duration-300 ease-[cubic-bezier(.3,1.2,.68,1.11)] overflow-y-hidden" :class="expanded ? 'h-fit z-10 top-[36px]' : 'h-0 top-0 z-[-1]'">
      <div
        v-for="option in options"
        :key="option.option"
        value="Logout"
        class="relative group flex flex-col text-sm text-nowrap font-semibold hover:text-blue-500 py-0.5 underline-animation duration-[300ms] select-none outline-none px-1 cursor-pointer rounded-sm"
        @click="selectOption(option)"
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

const selectRef = ref<HTMLElement | null>(null)

const expanded = ref(false)

onClickOutside(selectRef, () => {
  expanded.value = false
})

function selectOption(option: SelectOption) {
  emit('select', option)
  expanded.value = false
}
</script>

<style scoped>

</style>
