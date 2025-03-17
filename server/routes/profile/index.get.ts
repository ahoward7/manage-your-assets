import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const { user } = getQuery(event)

  const profile = await $fetch(`${publicConfig.baseUrl}/profile`, { method: 'GET', query: { user } })

  return profile
})
