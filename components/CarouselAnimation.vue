<template>
  <div>
    <div class="flex justify-center gap-4 text-7xl font-bold">
      <div ref="boxRef" class="box w-[22rem] h-[5.75rem]">
        <div class="bg-blue-500 side-one">
          {{ verb1 }}
        </div>
        <div class="bg-blue-500 side-two">
          {{ verb2 }}
        </div>
      </div>
      <span>Your Assets</span>
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

  rotateInterval = setInterval(rotateBox, 800)
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
  cursor: pointer;
  transform: rotateX(0deg);
}

.box div {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 45px rgba(255,255,255,0.3), 0 12px 20px -10px rgba(0,0,0,0.4);
  color: #FFF;
  text-align: center;
  text-shadow: 0 1px rgba(0,0,0,0.3);
}

.side-one {
  z-index: 400;
}

.side-two {
  transform: rotateX(-180deg);
}
</style>
