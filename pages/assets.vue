<template>
  <div>
    <div>Import Assets</div>
    <ButtonPrimary @click="importAssets">
      Import Assets
    </ButtonPrimary>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

function importAssets() {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.multiple = true
  fileInput.accept = '.xlsx,.xls,.csv'

  fileInput.onchange = async (event) => {
    const files = (event.target as HTMLInputElement).files
    if (!files)
      return

    const formData = new FormData()

    formData.append('schemaName', 'Asset')
    formData.append('category', 'Assets')
    formData.append('user', JSON.stringify(authStore.user))

    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    try {
      await assetApi.import(formData)
    }
    catch (error) {
      console.error('Error uploading assets:', error)
    }
  }

  fileInput.click()
}
</script>
