<template>
  <div class="flex flex-col gap-4">
    <div class="text-2xl font-bold text-blue-500">
      Create Account
    </div>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <LoginInput v-model="authStore.account.firstName" placeholder="First Name" class="border rounded-md" />
        <LoginInput v-model="authStore.account.lastName" placeholder="Last Name" class="border rounded-md" />
      </div>
      <LoginInput v-model="authStore.account.email" placeholder="Email" class="border rounded-md" />
      <LoginInput v-model="authStore.account.password" type="password" placeholder="Password" class="border rounded-md" />
      <LoginInput v-model="passwordConfirmation" type-="password" placeholder="Confirm Password" class="border rounded-md" />
    </div>
    <div class="flex flex-col gap-2">
      <ButtonPrimary class="py-2" @click="mode = 'signup'">
        Create Account
      </ButtonPrimary>
      <ButtonSecondary class="py-2" @click="mode = 'login'">
        Login
      </ButtonSecondary>
    </div>
    <div class="flex items-center">
      <div class="flex-1 border" />
      <div class="px-2 opacity-40 font-semibold mb-0.5">
        or
      </div>
      <div class="flex-1 border" />
    </div>
    <div>
      <GoogleSignInButton id="google-button" @success="emit('googleLoginSuccess')" @error="emit('googleLoginError')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['signup', 'googleLoginSuccess', 'googleLoginError'])

const authStore = useAuthStore()

const mode = defineModel<AuthMode>('mode')
const passwordConfirmation = ref('')
</script>
