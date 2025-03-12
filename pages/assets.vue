<template>
  <div>
    <div>Import Assets</div>
    <ButtonPrimary @click="importAssets">
      Import Assets
    </ButtonPrimary>
  </div>
</template>

<script setup lang="ts">
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
    for (const file of files) {
      formData.append('files', file)
    }

    try {
      const assets = await assetApi.import(formData)
      console.log(assets)
    }
    catch (error) {
      console.error('Error uploading assets:', error)
    }
  }
  fileInput.click()
  fileInput.remove()
}
</script>
