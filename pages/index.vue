<template>
  <div class="flex flex-col gap-2">
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" />

    <input v-if="newUser.email" v-model="newAccount.password">
    <button v-if="newUser.email" @click="postNewUser">
      Create User
    </button>

    <div>----------------------------------------</div>

    <div class="flex flex-col gap-1 px-4 w-96">
      <input v-model="newAccount.firstName" placeholder="First Name">
      <input v-model="newAccount.lastName" placeholder="Last Name">
      <input v-model="newAccount.email" placeholder="Email">
      <input v-model="newAccount.password" placeholder="Password">
      <button class="w-full border" @click="postNewAccount">
        Create Account
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

async function handleLoginSuccess(response: CredentialResponse) {
  const accountInfo = accountFromGoogleResponse(response)

  const newAccount: Account = await $fetch('/account', {
    method: 'POST',
    body: JSON.stringify({
      accountInfo,
    }),
  })

  newUser.value.email = newAccount.email
  newUser.value.firstName = newAccount.firstName
  newUser.value.lastName = newAccount.lastName
  newUser.value.image = newAccount.image || ''
}

async function postNewAccount() {
  newUser.value.email = newAccount.value.email
  newUser.value.firstName = newAccount.value.firstName
  newUser.value.lastName = newAccount.value.lastName
  newUser.value.image = newAccount.value.image || ''

  const user = await postNewUser()

  if (user && user._id) {
    newAccount.value.user = user._id

    await $fetch('/account', {
      method: 'POST',
      body: JSON.stringify({
        accountInfo: newAccount.value,
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

async function postNewUser(): Promise<User> {
  return await $fetch('/user', {
    method: 'POST',
    body: JSON.stringify({
      email: newUser.value.email,
      firstName: newUser.value.firstName,
      lastName: newUser.value.lastName,
      image: newUser.value.image,
    }),
  })
}

function handleLoginError(error: Error) {
  console.error(error)
}
</script>
