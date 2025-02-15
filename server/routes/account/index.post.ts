import Account from '~/server/models/Account'

export default defineEventHandler(async (event) => {
  const account = await readBody(event)
  return await Account.create(account)
})
