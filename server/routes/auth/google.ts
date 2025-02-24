import type { H3Event } from 'h3'

export default defineEventHandler(async (_event: H3Event): Promise<any> => {
  const headers = getHeaders(_event)
  const Authorization = headers.authorization || headers.Authorization || ''

  const publicConfig = useRuntimeConfig().public
  const googleLoginInfo = await readBody(_event)
  return await $fetch(`${publicConfig.baseUrl}/auth/google`, { method: 'POST', body: googleLoginInfo, headers: { Authorization } })
})
