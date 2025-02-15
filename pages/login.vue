<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <AuthLogin
        v-if="mode === 'login'"
        v-model:mode="mode"
        @google-login-success="handleLoginSuccess"
        @google-login-error="handleLoginError"
        @login="login"
      />
      <AuthSignup
        v-if="mode === 'signup'"
        v-model:mode="mode"
        @google-login-success="handleLoginSuccess"
        @google-login-error="handleLoginError"
        @login="login"
      />
      <pre>
        {{ authStore.user }}
        {{ authStore.account }}
        {{ authStore.profile }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from 'vue3-google-signin'

const authStore = useAuthStore()

const mode: Ref<AuthMode> = ref('login')

watch(mode, () => {
  authStore.reset()
})

async function handleLoginSuccess(response: CredentialResponse) {
  authStore.googleLogin(response)
}

function handleLoginError(error: Error) {
  console.error(error)
}

function login() {
  console.log('login')
}
</script>

<style>
#google-button > div > div > div {
  width: 312px;
}
</style>
