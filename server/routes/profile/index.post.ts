import Profile from '~/server/models/Profile'

export default defineEventHandler(async (event) => {
  const profile = await readBody(event)
  return await Profile.create(profile)
})
