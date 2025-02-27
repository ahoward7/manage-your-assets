<template>
  <div class="flex flex-col gap-4">
    <div class="text-2xl font-bold text-blue-500">
      Create Account
    </div>
    <InfoMessage v-if="authStore.loginInfo.onlyGoogleAccountExists">
      Google login successful! Please confirm your password to update your account.
    </InfoMessage>
    <InfoMessage v-if="authStore.loginInfo.accountAlreadyExists" type="error">
      An account already exists with this email. Please login or use a different email.
    </InfoMessage>
    <InfoMessage v-if="authStore.loginInfo.registerAccountFailed" type="error">
      Account creation failed. Please refresh page and try again.
    </InfoMessage>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <LoginInput v-model="authStore.loginForm.firstName" placeholder="First Name" class="border rounded-md" :invalid="validation.firstName.invalid" />
        <LoginInput v-model="authStore.loginForm.lastName" placeholder="Last Name" class="border rounded-md" :invalid="validation.lastName.invalid" />
      </div>
      <LoginInput v-model="authStore.loginForm.email" placeholder="Email" class="border rounded-md" :invalid="validation.email.invalid" />
      <LoginInput v-model="authStore.loginForm.password" type="password" placeholder="Password" class="border rounded-md" :invalid="validation.password.invalid || authStore.loginInfo.passwordsNotMatching" />
      <LoginInput v-model="authStore.loginForm.confirmPassword" type="password" placeholder="Confirm Password" class="border rounded-md" :invalid="validation.confirmPassword.invalid || authStore.loginInfo.passwordsNotMatching" />
      <InfoMessage v-if="authStore.loginInfo.passwordsNotMatching" type="error">
        Passwords do not match.
      </InfoMessage>
      <InfoMessage v-if="invalidLogin" type="error">
        Please fill in all fields
      </InfoMessage>
    </div>
    <div class="flex flex-col gap-2">
      <ButtonPrimary class="py-2" @click="validateAccount">
        {{ authStore.loginInfo.onlyGoogleAccountExists ? 'Update' : 'Create' }} Account
      </ButtonPrimary>
      <ButtonSecondary class="py-2" @click="setToLogin">
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
      <ButtonGoogle @click="emit('googleLogin')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['register', 'googleLogin'])

const authStore = useAuthStore()

const loginClicked = ref(false)

const invalidLogin = computed(() => {
  return (
    (
      authStore.loginForm.firstName.length === 0
      || authStore.loginForm.lastName.length === 0
      || authStore.loginForm.email.length === 0
      || authStore.loginForm.password.length === 0
      || authStore.loginForm.confirmPassword.length === 0
    )
    && loginClicked.value
  )
})

const validation = computed(() => {
  return {
    firstName: {
      field: authStore.loginForm.firstName,
      invalid: authStore.loginForm.firstName.length === 0 && loginClicked.value,
    },
    lastName: {
      field: authStore.loginForm.lastName,
      invalid: authStore.loginForm.lastName.length === 0 && loginClicked.value,
    },
    email: {
      field: authStore.loginForm.email,
      invalid: authStore.loginForm.email.length === 0 && loginClicked.value,
    },
    password: {
      field: authStore.loginForm.password,
      invalid: authStore.loginForm.password.length === 0 && loginClicked.value,
    },
    confirmPassword: {
      field: authStore.loginForm.confirmPassword,
      invalid: authStore.loginForm.confirmPassword.length === 0 && loginClicked.value,
    },
  }
})

function validateAccount() {
  let isValid = true
  loginClicked.value = true

  Object.values(validation.value).forEach((formInput) => {
    if (formInput.invalid) {
      isValid = false
    }
  })

  if (isValid) {
    emit('register', authStore.loginForm)
  }
}

function setToLogin() {
  authStore.reset()
  authStore.mode = 'login'
}
</script>
