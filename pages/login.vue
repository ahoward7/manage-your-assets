<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <AuthLogin v-if="authStore.mode === 'login'" @google-login="googleLogin" @login="myaLogin" />
      <AuthCreateAccount v-if="authStore.mode === 'register'" @google-login="googleLogin" @register="register" />
      {{ user }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { openInPopup, user } = useUserSession()
const authStore = useAuthStore()

async function googleLogin() {
  openInPopup('/auth/google')
}

async function myaLogin(loginInfo: LoginForm) {
  await authStore.login(loginInfo)
}

async function register(loginInfo: LoginForm) {
  await authStore.register(loginInfo)
}

watch(user, () => {
  navigateTo('/')
})
</script>
