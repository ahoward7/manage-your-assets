import mongoose from 'mongoose'

export default function useMongooseModel<T = any>(modelName: string) {
  if (!mongoose.models[modelName]) {
    throw new Error(`Model "${modelName}" is not registered in Mongoose.`)
  }
  return mongoose.models[modelName] as mongoose.Model<T>
}
