import Account from '~/server/models/Account'

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event)
  return await Account.findOne({ email })
})
