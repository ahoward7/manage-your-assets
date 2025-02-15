<template>
  <div v-if="account" class="flex flex-col gap-4">
    <div class="text-2xl font-bold text-blue-500">
      Login
    </div>
    <div class="flex flex-col">
      <LoginInput v-model="account.email" placeholder="Email" class="rounded-t-md border-x border-t" />
      <LoginInput v-model="account.password" placeholder="Password" class="rounded-b-md border" />
    </div>
    <div class="flex flex-col gap-2">
      <ButtonPrimary class="py-2" @click="emit('login')">
        Login
      </ButtonPrimary>
      <ButtonSecondary class="py-2" @click="mode = 'signup'">
        Create Account
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
const emit = defineEmits(['login', 'googleLoginSuccess', 'googleLoginError'])

const mode = defineModel<AuthMode>('mode')
const account = defineModel<Account>('account')
</script>
