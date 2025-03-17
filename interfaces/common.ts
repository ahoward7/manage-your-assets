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
  [key: string]: string | Asset | null
}
