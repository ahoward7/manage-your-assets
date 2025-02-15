import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
  const user = await readBody(event)
  return await User.create(user)
})
