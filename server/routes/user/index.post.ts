import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, name } = body
  // const User = useMongooseModel('User')
  const user = await User.create({ email, name })
  return user
})
