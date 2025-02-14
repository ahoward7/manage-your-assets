<template>
  <div>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" />

    <input v-if="newUser.email" v-model="newAccount.password">
    <button v-if="newUser.email" @click="postNewUser">
      Create User
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CredentialResponse } from 'vue3-google-signin'
import jwtDecode from 'jwt-decode'

const newAccount: Ref<Account> = ref({
  userId: '',
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
  const credential = jwtDecode(response.credential || '')

  const newAccount: Account = await $fetch('/account', {
    method: 'POST',
    body: JSON.stringify({
      credential,
    }),
  })

  newUser.value.email = newAccount.email
  newUser.value.firstName = newAccount.firstName
  newUser.value.lastName = newAccount.lastName
  newUser.value.image = newAccount.image || ''
}

async function postNewUser() {
  await $fetch('/user', {
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
