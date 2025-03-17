export type AuthMode = 'register' | 'login' | 'google' | 'profile'
export type ModelEndpoint = 'user' | 'account' | 'profile'
export type MongoModel = User | Account | Profile
export type UserRole = 'admin' | 'supervisor' | 'employee' | 'external' | ''
export type AccountClient = 'google' | 'mya' | 'merged'

// User
export interface User {
  _id?: string
  firstName: string
  lastName: string
  email: string
  image: string
}

// Account
export interface Account {
  _id?: string
  user: string
  client: AccountClient
  email: string
  password: string
}

// Profile
export interface Profile {
  _id?: string
  user: string
  role: UserRole
  supervisor: string
  employees: string[]
  completed: boolean
}

// Login Form
export interface LoginForm extends User {
  client: AccountClient
  password: string
  confirmPassword: string
}
