type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'file'

interface SelectOption {
  value: string | number
  label: string
}

export interface FormField {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  options?: SelectOption[]
  required?: boolean
}

export interface FormSchema {
  fields: FormField[]
}