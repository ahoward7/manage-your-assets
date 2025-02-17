<template>
  <div class="flex flex-col gap-4">
    <div class="text-2xl font-bold text-blue-500">
      Login With Google
    </div>
    <InfoMessage v-if="authStore.googleAccountExistsWithoutMyaAccount">
      Before setting password, please login with your Google account.
    </InfoMessage>
    <div>
      <GoogleSignInButton id="google-button" @success="emit('googleLoginSuccess', $event)" @error="emit('googleLoginError', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['googleLoginSuccess', 'googleLoginError'])

const authStore = useAuthStore()
</script>
