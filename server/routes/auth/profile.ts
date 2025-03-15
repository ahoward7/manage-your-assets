import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const { userId } = getQuery(event)

  const profile = await $fetch(`${publicConfig.baseUrl}/auth/profile`, { method: 'GET', query: { user: userId } })

  return profile
})
