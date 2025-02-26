import type { H3Event } from 'h3'

export default defineEventHandler(async (_event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const loginInfo = await readBody(_event)

  return await $fetch(`${publicConfig.baseUrl}/auth/register`, { method: 'POST', body: loginInfo })
})
