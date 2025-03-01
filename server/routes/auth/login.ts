import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const { email, password } = await readBody(event)

  const backendUser = await $fetch(`${publicConfig.baseUrl}/auth/login`, { method: 'POST', body: { email, password } })

  await setUserSession(event, { user: backendUser })

  return backendUser
})
