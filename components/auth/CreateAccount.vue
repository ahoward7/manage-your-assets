<template>
  <div class="flex flex-col gap-4">
    <div class="text-2xl font-bold text-blue-500">
      Create Account
    </div>
    <InfoMessage v-if="authStore.googleAccountExistsWithoutMyaAccount">
      Google login successful! Please confirm your password to update your account.
    </InfoMessage>
    <InfoMessage v-if="authStore.noAccountExists">
      Account with this email does not exist. Please fill in the form below.
    </InfoMessage>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <LoginInput v-model="authStore.loginForm.firstName" placeholder="First Name" class="border rounded-md" />
        <LoginInput v-model="authStore.loginForm.lastName" placeholder="Last Name" class="border rounded-md" />
      </div>
      <LoginInput v-model="authStore.loginForm.email" placeholder="Email" class="border rounded-md" />
      <LoginInput v-model="authStore.loginForm.password" type="password" placeholder="Password" class="border rounded-md" />
      <LoginInput v-model="authStore.loginForm.confirmPassword" type="password" placeholder="Confirm Password" class="border rounded-md" />
      <InfoMessage v-if="authStore.passwordsNotMatching" type="error">
        Passwords do not match.
      </InfoMessage>
    </div>
    <div class="flex flex-col gap-2">
      <ButtonPrimary class="py-2" @click="emit('createAccount', authStore.loginForm)">
        {{ authStore.googleAccountExistsWithoutMyaAccount ? 'Update' : 'Create' }} Account
      </ButtonPrimary>
      <ButtonSecondary class="py-2" @click="authStore.mode = 'login'">
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
      <GoogleSignInButton id="google-button" @success="emit('googleLoginSuccess', $event)" @error="emit('googleLoginError', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['createAccount', 'googleLoginSuccess', 'googleLoginError'])

const authStore = useAuthStore()
</script>
