export type AuthMode = 'register' | 'login' | 'google' | 'profile'
export type ModelEndpoint = 'user' | 'account' | 'profile'
export type MongoModel = User | Account | Profile
export type UserRole = 'admin' | 'employee' | 'external' | ''
export type AccountClient = 'google' | 'mya' | 'merged'

// Base
interface BaseEntity {
  _id: string
}

// User
export interface BaseUser {
  firstName: string
  lastName: string
  email: string
  image: string
}

export interface User extends BaseEntity, BaseUser {}
export interface NewUser extends BaseUser {}

// Account
export interface BaseAccount {
  user: string
  client: AccountClient
  email: string
  password: string
}

export interface Account extends BaseEntity, BaseAccount {}
export interface NewAccount extends BaseAccount {}

// Profile
export interface BaseProfile {
  user: string
  role: UserRole
  supervisor: string
  employees: string[]
  completed: boolean
}

export interface Profile extends BaseEntity, BaseProfile {}
export interface NewProfile extends BaseProfile {}

// Login Form
export interface LoginForm extends BaseUser {
  client: AccountClient
  password: string
  confirmPassword: string
}
