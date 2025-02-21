<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <AuthLogin
        v-if="authStore.mode === 'login'"
        @google-login="loginIfReady"
        @login="myaLogin"
      />
      <AuthCreateAccount
        v-if="authStore.mode === 'register'"
        @google-login="loginIfReady"
        @register="register"
      />
      <!-- <AuthForceGoogleLogin
        v-if="authStore.mode === 'google'"
        @google-login-success="verifyEmail"
        @google-login-error="handleLoginError"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthCodeFlowErrorResponse, AuthCodeFlowSuccessResponse } from 'vue3-google-signin'
import { useTokenClient } from 'vue3-google-signin'

const { isReady, login } = useTokenClient({
  onSuccess: handleLoginSuccess,
  onError: handleLoginError,
})

const authStore = useAuthStore()

async function loginIfReady() {
  if (!isReady.value) {
    return
  }

  login()
}

function handleLoginSuccess(response: AuthCodeFlowSuccessResponse) {
  authStore.googleLogin(response)
}

function handleLoginError(response: AuthCodeFlowErrorResponse) {
  console.error('Google login failed: ', response)
}

function myaLogin(loginInfo: LoginForm) {
  authStore.login(loginInfo)
}

function register(loginInfo: LoginForm) {
  authStore.register(loginInfo)
}

// function verifyEmail(response: CredentialResponse) {
//   if (authStore.verifyGoogleEmail(response)) {
//     authStore.mode = 'create'
//   }
// }
</script>
