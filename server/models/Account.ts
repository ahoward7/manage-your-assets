import { model, Schema } from 'mongoose'

const AccountSchema = new Schema({
  userId: { type: String, required: true }, // many-to-one
  client: { type: String, enum: ['google', 'mya'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: false },
})

export default model('Account', AccountSchema, 'accounts')
