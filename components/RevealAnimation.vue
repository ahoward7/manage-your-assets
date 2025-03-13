<template>
  <div>
    <div class="relative w-full">
      <div class="relative z-0 w-[940px] h-60 flex items-center text-[220px] text-blue-500">
        <span class="verb">{{ verb }}</span>
        <div class="absolute z-10 w-[960px] left-[-20px] h-60 flex">
          <div ref="revealer" class="w-0 duration-500 ease-linear" />
          <div v-if="cursorOn" class="cursor w-2 h-full rounded-full bg-blue-300" />
          <div class="grow bg-slate-50" />
        </div>
      </div>
    </div>
    <span class="whitespace-nowrap text-8xl ml-4">Your Assets</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const verbs = ['', 'Organize', 'Protect', 'Track', 'Cover', 'Manage']

const verbIndex = ref(0)
const verb = computed(() => verbs[verbIndex.value])

const revealer = ref<HTMLDivElement | null>(null)
let rotateInterval: NodeJS.Timeout | null = null
const cursorOn = ref(true)

function revealNextVerb() {
  if (verbIndex.value === verbs.length - 1) {
    clearInterval(rotateInterval!)
    rotateInterval = null
    cursorOn.value = false
  }
  else {
    revealer.value!.style.width = '0px'
    setTimeout(async () => {
      verbIndex.value++
      await nextTick()

      const verbWidth = document.querySelector('.verb')?.getBoundingClientRect().width || 0

      revealer.value!.style.width = `${verbWidth + 60}px`
    }, 1000)
  }
}

onMounted(() => {
  revealNextVerb()
  rotateInterval = setInterval(revealNextVerb, 2000)
})

onUnmounted(() => {
  if (rotateInterval)
    clearInterval(rotateInterval)
})
</script>

<style scoped>
.cursor {
  animation: cursor-blink .8s infinite;
}

@keyframes cursor-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
