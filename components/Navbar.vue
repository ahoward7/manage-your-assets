<template>
  <nav class="relative flex justify-between items-center px-4 py-2 shadow-md bg-gray-50">
    <NuxtLink to="/" class="text-xl font-bold text-blue-500 cursor-pointer">
      Manage Your Assets
    </NuxtLink>
    <div>
      <div v-if="authStore.loginInfo.isLoggedIn" class="flex items-center gap-2">
        <span class="text-sm italic">Logged in as:</span>
        <MyaSelect :label="authStore.user.firstName" :options="profileOptions" @select="selectOption" />
      </div>
      <NuxtLink v-else to="/login" class="flex gap-2">
        <ButtonPrimary>
          Login
        </ButtonPrimary>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { clear } = useUserSession()
const authStore = useAuthStore()

const profileOptions: SelectOption[] = [
  {
    label: 'Logout',
    option: 'logout',
  },
  {
    label: 'Edit Profile',
    option: 'edit',
  },
]

async function logout() {
  await clear()
  authStore.reset('/login')
}

function editProfile() {
  console.log('Edit Profile')
}

function selectOption(option: SelectOption) {
  switch (option.option) {
    case 'logout':
      logout()
      break
    case 'edit':
      editProfile()
      break
    default:
      break
  }
}
</script>
