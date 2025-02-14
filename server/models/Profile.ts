import { model, Schema } from 'mongoose'

const ProfileSchema = new Schema({
  userId: { type: String, required: true }, // one-to-one
  role: { type: String, enum: ['admin', 'employee', 'external'], required: true },
  supervisor: { type: String, required: true },
  employees: { type: [String], required: true },
})

export default model('Profile', ProfileSchema, 'profiles')
