export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useUserSession()
  const authStore = useAuthStore()
  const { user: storeUser, loginInfo } = storeToRefs(authStore)

  if (storeUser.value.email) {
    return
  }

  const sessionUser = user.value as User

  if (!sessionUser) {
    loginInfo.value.isLoggedIn = false

    if (to.path !== '/login') {
      return navigateTo('/login')
    }

    return
  }

  const { data: userProfile } = await profileApi.useGet({ user: sessionUser._id })

  loginInfo.value.isLoggedIn = true

  if (!storeUser.value.email) {
    storeUser.value = sessionUser
  }

  if (!userProfile.value.completed) {
    if (to.path !== '/edit-profile') {
      return navigateTo('/edit-profile')
    }
  }
  else {
    authStore.setProfile(userProfile.value)
  }

  if (to.path === '/login') {
    return navigateTo('/')
  }
})
