import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
  const { _id } = getQuery(event)
  return await User.findOne({ _id })
})
