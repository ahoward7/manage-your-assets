<template>
  <div class="flex justify-center">
    <div class="w-full flex flex-col gap-12 items-start">
      <div ref="boxRef" class="w-full flex items-center text-[220px] box h-32 text-blue-500">
        <div class="side-one">
          {{ verb1 }}
        </div>
        <div class="side-two">
          {{ verb2 }}
        </div>
      </div>
      <span class="whitespace-nowrap text-8xl ml-4">Your Assets</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const verbs = ['Organize', 'Protect', 'Track', 'Cover', 'Manage']

const verb1Index = ref(0)
const verb2Index = ref(-1)
const verb1 = computed(() => verbs[verb1Index.value])
const verb2 = computed(() => verbs[verb2Index.value])
const flipCounter = ref(0)

const isFlipped = ref(false)
const boxRef = ref<HTMLDivElement | null>(null)
let rotateInterval: NodeJS.Timeout | null = null

function rotateBox() {
  const box = boxRef.value
  if (!box)
    return

  isFlipped.value = !isFlipped.value
  box.style.transform = isFlipped.value ? 'rotateX(-180deg)' : 'rotateX(0deg)'

  if (isFlipped.value) {
    verb2Index.value = (verb2Index.value + 2) % verbs.length
  }
  else {
    verb1Index.value = (verb1Index.value + 2) % verbs.length
  }

  flipCounter.value++

  if (flipCounter.value === verbs.length - 1) {
    clearInterval(rotateInterval!)
    rotateInterval = null
  }
}

onMounted(() => {
  rotateBox()
  rotateInterval = setInterval(rotateBox, 1200)
})

onUnmounted(() => {
  if (rotateInterval)
    clearInterval(rotateInterval)
})
</script>

<style scoped>
body {
  -webkit-perspective: 500px;
  perspective: 500px;
}

.box {
  transition: all 0.4s ease-in;
  transform-style: preserve-3d;
  position: relative;
  transform: rotateX(0deg);
}

.box div {
  position: absolute;
  backface-visibility: hidden;
  background-repeat: no-repeat;
  text-shadow: 0 1px rgba(0,0,0,0.3);
}

.side-one {
  z-index: 400;
}

.side-two {
  transform: rotateX(-180deg);
}
</style>
