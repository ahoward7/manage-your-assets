import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, firstName, lastName, image } = body
  const user = await User.create({ email, firstName, lastName, image })
  return user
})
