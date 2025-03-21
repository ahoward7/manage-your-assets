<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <div class="flex flex-col gap-4">
        <div class="text-2xl font-bold text-blue-500">
          Edit Profile
        </div>
        <InfoMessage v-if="!profile.completed">
          Your profile is incomplete. Please fill out the information below before continuing.
        </InfoMessage>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <label class="w-[5.25rem] shrink-0 flex justify-end">Role:</label>
            <MyaSelect v-model="profileForm.role" class="grow" label="Role" :options="roleOptions" />
          </div>
          <div class="flex items-center gap-4">
            <label class="w-[5.25rem] shrink-0 flex justify-end">Supervisor:</label>
            <MyaUserSelect v-model="profileForm.supervisor" class="grow" />
          </div>
          <div v-if="profileForm.role.option === 'supervisor'" class="flex gap-4">
            <label class="w-[5.25rem] shrink-0 flex justify-end mt-1">Employees:</label>
            <div class="grow flex flex-col gap-2">
              <div v-if="profileForm.employees.length > 0" class="flex flex-col gap-2 bg-slate-50 px-2 py-1 border border-slate-300 rounded-md">
                <div v-for="employee in profileForm.employees" :key="employee._id">
                  {{ `${employee.lastName}, ${employee.firstName}` }}
                </div>
              </div>
              <MyaUserSelect v-model:users="profileForm.employees" placeholder="Select Employee" mode="multiple" @select="addEmployee($event)" />
            </div>
          </div>
        </div>
        <ButtonPrimary class="py-2" @click="saveProfile">
          Save Profile
        </ButtonPrimary>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const profile = authStore.profile

const roleOptions: { label: string, option: UserRole }[] = [
  { label: 'Admin', option: 'admin' },
  { label: 'Supervisor', option: 'supervisor' },
  { label: 'Employee', option: 'employee' },
  { label: 'External', option: 'external' },
]

const profileForm: Ref<ProfileForm> = ref({
  role: roleOptions[2],
  supervisor: null,
  employees: [],
})

try {
  const role = profile.role || 'employee'
  const supervisor = await userApi.useGet({ user: profile.supervisor })
  const employees = await userApi.useGetMany({ users: profile.employees })

  profileForm.value = {
    role: roleOptions.find(r => r.option === role) || roleOptions[2],
    supervisor: supervisor.data.value,
    employees: employees.data.value,
  }
}
catch (error) {
  console.error(error)
}

function addEmployee(user: User) {
  if (profileForm.value.employees.some((emp: User) => emp._id === user._id))
    return

  profileForm.value.employees.push(user)
}

function saveProfile() {
  const authUser = authStore.user as User

  if (!profileForm.value.supervisor) {
    return
  }

  const updatedProfile: Profile = {
    _id: authStore.profile._id,
    user: authUser._id || '-1',
    role: profileForm.value.role.option,
    supervisor: profileForm.value.supervisor._id || '-1',
    employees: profileForm.value.employees.map((emp: User) => emp._id || '-1'),
    completed: true,
  }
  profileApi.put(updatedProfile)
}
</script>
