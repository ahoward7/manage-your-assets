<template>
  <div class="flex flex-col gap-2">
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" />

    <div>------------------------------------------------------------------------</div>

    <div class="flex flex-col gap-1 px-4 w-96">
      <input v-model="newAccount.firstName" placeholder="First Name">
      <input v-model="newAccount.lastName" placeholder="Last Name">
      <input v-model="newAccount.email" placeholder="Email">
      <input v-model="newAccount.password" placeholder="Password">
      <button class="w-full border" @click="postNewAccount(newAccount)">
        Create Account
      </button>
    </div>

    <div>------------------------------------------------------------------------</div>

    <div class="flex flex-col gap-1 px-4 w-96">
      <input v-model="newProfile.role" placeholder="role">
      <input v-model="newProfile.supervisor" placeholder="supervisor">
      <button class="w-full border" @click="postNewProfile(newProfile)">
        Create Profile
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from 'vue3-google-signin'
import jwtDecode from 'jwt-decode'

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
</script>
