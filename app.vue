<template>
  <div class="w-screen h-screen bg-gray-50">
    <Navbar />
    <div class="flex justify-center p-4">
      <NuxtPage class="nuxt-page" style="height: calc(100vh - 48px)" />
    </div>
  </div>
</template>

<style scoped>
.nuxt-page {
  height: calc(100vh - 48px);
  max-width: 1200px;
  width: 100%;
}
</style>
