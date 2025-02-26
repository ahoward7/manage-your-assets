<template>
  <div class="w-screen h-screen bg-gray-50">
    <Navbar />
    <NuxtPage style="height: calc(100vh - 48px)" />
  </div>
</template>

<style>
#google-button > div > div > div {
  width: 312px;
}

#google-button {
  pointer-events: none;
}
</style>
