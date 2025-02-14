import Account from '~/server/models/Account'

export default defineEventHandler(async (event) => {
  const { accountInfo } = await readBody(event)
  const account = await Account.create(accountInfo)
  return account
})
