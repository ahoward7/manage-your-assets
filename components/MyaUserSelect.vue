<template>
  <div ref="selectRef" class="w-full relative select-none">
    <div class="relative z-10 flex items-center text-blue-500 bg-slate-50 font-bold border border-blue-500 outline-none rounded-md pr-3 pl-1 py-1 cursor-pointer" @click="expanded = !expanded">
      <Icon icon="radix-icons:caret-down" class="w-6 h-6" />
      <span class="grow flex justify-center">{{ placeHolder }}</span>
    </div>
    <div class="interpolate-keywords w-full absolute left-0 flex flex-col gap-2 bg-white p-2 rounded-md shadow-md border duration-300 ease-[cubic-bezier(.3,1.2,.68,1.11)] overflow-hidden" :class="expanded ? 'h-fit z-50 top-[38px]' : 'h-0 top-0 z-[-1]'">
      <input v-model="userSearch" class="px-2 py-1 border-b border-blue-500 outline-none" placeholder="Search by name or email">
      <template v-if="users.length > 0">
        <div
          v-for="user in users"
          :key="user.email"
          class="relative group flex flex-col text-nowrap hover:text-blue-500 py-0.5 px-2 underline-animation duration-[300ms] select-none outline-none cursor-pointer rounded-sm"
          @click="selectUser(user)"
        >
          {{ getFullName(user) }}
        </div>
      </template>
      <template v-else>
        <span class="px-2 py-0.5">No users found</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  mode: {
    type: String as PropType<'single' | 'multiple'>,
    default: 'single',
  },
  placeholder: {
    type: String,
    default: 'Select User...',
  },
})

const emit = defineEmits(['select'])

const authStore = useAuthStore()

const selectedUser = defineModel<User | null>()
const selectedUsers = defineModel<User[]>('users')
const userSearch = ref('')

function getFullName(user: User) {
  return `${user.lastName}, ${user.firstName}`
}

const placeHolder = computed(() => {
  if (!selectedUser.value?.firstName || props.mode === 'multiple')
    return props.placeholder
  return `${selectedUser.value.lastName}, ${selectedUser.value.firstName}`
})

const users: Ref<User[]> = ref([])

function setUsers(userResults: User[]) {
  const authUser = authStore.user as User
  users.value = userResults.filter(user => user._id !== authUser._id).filter((user) => {
    if (props.mode === 'multiple') {
      return !selectedUsers.value?.some(selectedUser => selectedUser._id === user._id)
    }
    return true
  })
}

const searchUsers = useDebounceFn(async () => {
  const userResults = await userApi.getMany({ search: userSearch.value })

  if (userResults) {
    setUsers(userResults)
    return
  }

  users.value = []
})

watch(userSearch, () => {
  searchUsers()
})

async function initializeUsers() {
  const { data: userResults } = await userApi.useGetMany({ search: '' })

  if (userResults) {
    setUsers(userResults.value)
    return
  }

  users.value = []
}

await initializeUsers()

// Functionality
const selectRef = ref<HTMLElement | null>(null)
const expanded = ref(false)

onClickOutside(selectRef, () => {
  expanded.value = false
})

function selectUser(option: User) {
  emit('select', option)
  setUsers(users.value)
  selectedUser.value = option
  expanded.value = false
}
</script>
