import Profile from '~/server/models/Profile'

export default defineEventHandler(async (event) => {
  const { profileInfo } = await readBody(event)
  const profile = await Profile.create(profileInfo)
  return profile
})
