import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const publicConfig = useRuntimeConfig().public
  const body = await readMultipartFormData(event)

  const assets = await $fetch(`${publicConfig.baseUrl}/asset/import`, { method: 'POST', body })

  return assets
})
