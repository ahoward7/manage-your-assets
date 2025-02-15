import Profile from '~/server/models/Profile'

export default defineEventHandler(async (event) => {
  const { user } = getQuery(event)
  return await Profile.findOne({ user })
})
