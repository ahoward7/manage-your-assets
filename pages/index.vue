<template>
  <div>
    First push!

    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" />

    <button @click="createTestMongoUser">
      Create Test User
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from 'vue3-google-signin'

function handleLoginSuccess(response: CredentialResponse) {
  void response
}

function handleLoginError(error: Error) {
  console.error(error)
}

async function createTestMongoUser() {
  await $fetch('/user', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Test User',
      email: 'test.user@gmail.com',
    }),
  })
}
</script>
