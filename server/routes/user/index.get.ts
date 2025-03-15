import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const { search } = getQuery(event)

  const userResults = await $fetch(`${publicConfig.baseUrl}/user`, { method: 'GET', query: { search } })

  return userResults
})
