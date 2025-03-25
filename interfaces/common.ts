export type MessageType = 'success' | 'error' | 'info' | 'warning'

export interface SelectOption<T = string> {
  label: string
  option: T
}

export interface ProfileForm {
  role: SelectOption<UserRole>
  supervisor: User | null
  employees: User[]
}

export interface Asset {
  schema: string
  data: {
    _id: string
    schema: string
    [key: string]: string | Asset | null
  }
  created: Date
  updated: Date
  createdBy: string
  updatedBy: string
  owner: string
}
