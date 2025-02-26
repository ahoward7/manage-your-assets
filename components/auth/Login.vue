<template>
  <div class="flex flex-col gap-4">
    <div class="text-2xl font-bold text-blue-500">
      Login
    </div>
    <InfoMessage v-if="authStore.loginInfo.noAccountExists || authStore.loginInfo.invalidPassword" type="error">
      Email or password is incorrect. Please try again or create an account.
    </InfoMessage>
    <div class="flex flex-col">
      <LoginInput v-model="authStore.loginForm.email" placeholder="Email" class="rounded-t-md border-x border-t" :invalid="validation.email.invalid" />
      <LoginInput v-model="authStore.loginForm.password" type="password" placeholder="Password" class="rounded-b-md border" :invalid="validation.password.invalid" />
    </div>
    <InfoMessage v-if="validation.email.invalid || validation.password.invalid" type="error">
      Please fill in all fields
    </InfoMessage>
    <div class="flex flex-col gap-2">
      <ButtonPrimary class="py-2" @click="validateLogin">
        Login
      </ButtonPrimary>
      <ButtonSecondary class="py-2" @click="setToRegister">
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
      <ButtonGoogle @click="emit('googleLogin')" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['login', 'googleLogin'])

const authStore = useAuthStore()

const loginClicked = ref(false)

const validation = computed(() => {
  return {
    email: {
      field: authStore.loginForm.email,
      invalid: authStore.loginForm.email.length === 0 && loginClicked.value,
    },
    password: {
      field: authStore.loginForm.password,
      invalid: authStore.loginForm.password.length === 0 && loginClicked.value,
    },
  }
})

function validateLogin() {
  let isValid = true
  loginClicked.value = true

  Object.values(validation.value).forEach((formInput) => {
    if (formInput.invalid) {
      isValid = false
    }
  })

  if (isValid) {
    emit('login', authStore.loginForm)
  }
}

function setToRegister() {
  authStore.reset()
  authStore.mode = 'register'
}
</script>
