import type { H3Event } from 'h3'
import { filterQuery } from '~/utils/filterQuery'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const query = filterQuery(getQuery(event))

  const userResults = await $fetch(`${publicConfig.baseUrl}/user`, { method: 'GET', query })

  return userResults
})
