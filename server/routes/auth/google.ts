import type { User } from '~/interfaces/auth'

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user, tokens }) {
    try {
      const publicConfig = useRuntimeConfig().public

      const backendUser = await $fetch(`${publicConfig.baseUrl}/auth/google`, {
        method: 'POST',
        body: JSON.stringify({ user, tokens }),
      }) as User

      const sessionUser = {
        id: backendUser._id,
        user: backendUser,
        secure: user.secure,
      }

      await setUserSession(event, sessionUser, tokens)
      return sendRedirect(event, '/')
    }
    catch (error: any) {
      console.error('Google Account Error:', error)
      return sendRedirect(event, '/login')
    }
  },
  async onError(event, error) {
    console.error('Google Session Storage Failure:', error)
    return sendRedirect(event, '/login')
  },
})
