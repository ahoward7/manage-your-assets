<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <AuthLogin
        v-if="authStore.mode === 'login'"
        @google-login-success="handleLoginSuccess"
        @google-login-error="handleLoginError"
        @login="login"
      />
      <AuthCreateAccount
        v-if="authStore.mode === 'create'"
        @google-login-success="handleLoginSuccess"
        @google-login-error="handleLoginError"
        @create-account="login"
      />
      <AuthForceGoogleLogin
        v-if="authStore.mode === 'google'"
        @google-login-success="verifyEmail"
        @google-login-error="handleLoginError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from 'vue3-google-signin'

const authStore = useAuthStore()

async function handleLoginSuccess(response: CredentialResponse) {
  authStore.googleLogin(response)
}

function handleLoginError(error: Error) {
  console.error(error)
}

function login(loginInfo: LoginForm) {
  authStore.myaLogin(loginInfo)
}

function verifyEmail(response: CredentialResponse) {
  if (authStore.verifyGoogleEmail(response)) {
    authStore.mode = 'create'
  }
}
</script>

<style>
#google-button > div > div > div {
  width: 312px;
}
</style>
