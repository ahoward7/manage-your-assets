<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <AuthLogin
        v-if="mode === 'login'"
        v-model:mode="mode"
        v-model:account="newAccount"
        @google-login-success="handleLoginSuccess"
        @google-login-error="handleLoginError"
        @login="login"
      />
      <AuthSignup
        v-if="mode === 'signup'"
        v-model:mode="mode"
        v-model:account="newAccount"
        @google-login-success="handleLoginSuccess"
        @google-login-error="handleLoginError"
        @login="login"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from 'vue3-google-signin'
import jwtDecode from 'jwt-decode'

const mode: Ref<AuthMode> = ref('login')

const newAccount: Ref<Account> = ref({
  user: '',
  client: 'mya',
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  password: '',
})

const newUser: Ref<User> = ref({
  email: '',
  firstName: '',
  lastName: '',
  image: '',
})

const newProfile: Ref<Profile> = ref({
  user: '',
  role: '',
  supervisor: '',
  employees: [],
  completed: false,
})

async function postNewUser(): Promise<User> {
  return await $fetch<User>('/user', {
    method: 'POST',
    body: newUser.value,
  })
}

async function postNewAccount(account: Account) {
  newUser.value.email = account.email
  newUser.value.firstName = account.firstName
  newUser.value.lastName = account.lastName
  newUser.value.image = account.image || ''

  const user = await postNewUser()

  if (user && user._id) {
    newUser.value._id = user._id

    account.user = user._id

    await $fetch('/account', {
      method: 'POST',
      body: JSON.stringify({
        accountInfo: account,
      }),
    })
  }
}

async function postNewProfile(profile: Profile) {
  if (newUser.value._id) {
    profile.user = newUser.value._id || ''

    await $fetch('/profile', {
      method: 'POST',
      body: JSON.stringify({
        profileInfo: profile,
      }),
    })
  }
}

function accountFromGoogleResponse(response: CredentialResponse): Account {
  const { email, given_name, family_name, picture }: GoogleJWT = jwtDecode(response.credential || '')

  return {
    user: '',
    client: 'mya',
    firstName: given_name,
    lastName: family_name,
    email,
    image: picture,
    password: '',
  }
}

async function handleLoginSuccess(response: CredentialResponse) {
  const accountInfo = accountFromGoogleResponse(response)

  newAccount.value.client = 'google'
  newAccount.value.firstName = accountInfo.firstName
  newAccount.value.lastName = accountInfo.lastName
  newAccount.value.email = accountInfo.email
  newAccount.value.image = accountInfo.image || ''

  await postNewAccount(newAccount.value)
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
