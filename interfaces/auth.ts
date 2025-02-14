export interface User {
  _id?: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

export interface Account {
  _id?: string
  userId: string
  client: 'google' | 'mya'
  firstName: string
  lastName: string
  email: string
  image?: string
  password?: string
}

export interface Profile {
  _id?: string
  userId: string
  role: 'admin' | 'employee' | 'external'
  supervisor: string
  employees: string[]
}
