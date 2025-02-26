import type { H3Event } from 'h3'

export default defineEventHandler(async (_event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const { email, password } = await readBody(_event)

  return await $fetch(`${publicConfig.baseUrl}/auth/login`, { method: 'POST', body: { email, password } })
})
