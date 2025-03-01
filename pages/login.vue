<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <AuthLogin v-if="authStore.mode === 'login'" @google-login="googleLogin" @login="myaLogin" />
      <AuthCreateAccount v-if="authStore.mode === 'register'" @google-login="googleLogin" @register="register" />
      <!-- <AuthForceGoogleLogin
        v-if="authStore.mode === 'google'"
        @google-login-success="verifyEmail"
        @google-login-error="handleLoginError"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const { openInPopup, session } = useUserSession()
const authStore = useAuthStore()

async function googleLogin() {
  openInPopup('/auth/google')
}

function myaLogin(loginInfo: LoginForm) {
  authStore.login(loginInfo)
}

function register(loginInfo: LoginForm) {
  authStore.register(loginInfo)
}

watch(session, () => {
  navigateTo('/')
})
</script>
