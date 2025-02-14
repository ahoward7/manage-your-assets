<template>
  <div>
    First push!

    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" />
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from "nuxt3-vue3-google-signin"

const handleLoginSuccess = (response: CredentialResponse) => {
  console.log(response)
}

const handleLoginError = (error: Error) => {
  console.error(error)
}
</script>