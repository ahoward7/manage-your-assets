export type AuthMode = 'create' | 'login' | 'google' | 'profile'
export type ModelEndpoint = 'user' | 'account' | 'profile'
export type MongoModel = User | Account | Profile

export interface GoogleJWT {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export interface User {
  _id?: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

export interface GoogleAccount {
  client: 'google'
  firstName: string
  lastName: string
  email: string
  image?: string
  password: string | 'SET_BY_GOOGLE'
}

export interface Account {
  _id?: string
  user: string
  client: 'google' | 'mya'
  firstName: string
  lastName: string
  email: string
  image?: string
  password?: string
}

export interface Profile {
  _id?: string
  user: string
  role: 'admin' | 'employee' | 'external' | ''
  supervisor?: string
  employees: string[]
  completed: boolean
}

export interface LoginForm {
  client: 'google' | 'mya'
  firstName: string
  lastName: string
  email: string
  image: string
  password: string
  confirmPassword: string
}
