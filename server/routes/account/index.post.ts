import Account from '~/server/models/Account'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { credential } = body
  const { email, given_name, family_name, picture } = credential
  const account = await Account.create({
    userId: email,
    client: 'google',
    firstName: given_name,
    lastName: family_name,
    email,
    image: picture,
  })
  return account
})
