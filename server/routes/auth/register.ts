import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const loginInfo = await readBody(event)

  const hashedPassword = await hashPassword(loginInfo.password)

  const backendUser = await $fetch(`${publicConfig.baseUrl}/auth/register`, { method: 'POST', body: { ...loginInfo, password: hashedPassword } })

  await setUserSession(event, { user: backendUser })

  return backendUser
})
