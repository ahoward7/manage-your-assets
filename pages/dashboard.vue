<template>
  <div>
    Dashboard

    <div v-for="(category, categoryKey) in assets" :key="categoryKey">
      <div v-for="(asset, assetKey) in category.assets" :key="assetKey">
        <div v-for="(data, dataKey) in asset.data" :key="dataKey">
          {{ data }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const { data: assets } = await assetApi.useGet({ user: authStore.user._id })
</script>
