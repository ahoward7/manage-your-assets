<template>
  <div class="flex justify-center items-center">
    <div class="w-[360px] bg-white pt-4 pb-6 px-6 rounded-xl shadow-md mb-40">
      <div class="flex flex-col gap-4">
        <div class="text-2xl font-bold text-blue-500">
          Edit Profile
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <label class="w-[5.25rem] shrink-0 flex justify-end">Role:</label>
            <MyaSelect v-model="profileForm.role" class="grow" label="Role" :options="roleOptions" />
          </div>
          <div class="flex items-center gap-4">
            <label class="w-[5.25rem] shrink-0 flex justify-end">Supervisor:</label>
            <MyaUserSelect v-model="profileForm.supervisor" class="grow" />
          </div>
          <div class="flex gap-4">
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

const profileForm: Ref<ProfileForm> = ref({
  role: { label: 'Employee', option: 'employee' },
  supervisor: null,
  employees: [] as User[],
})

const roleOptions: { label: string, option: UserRole }[] = [
  { label: 'Admin', option: 'admin' },
  { label: 'Supervisor', option: 'supervisor' },
  { label: 'Employee', option: 'employee' },
  { label: 'External', option: 'external' },
]

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
    user: authUser._id,
    role: profileForm.value.role.option,
    supervisor: profileForm.value.supervisor._id,
    employees: profileForm.value.employees.map(emp => emp._id),
    completed: true,
  }
  authStore.updateProfile(updatedProfile)
}
</script>
