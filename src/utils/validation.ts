export interface LeadFormValues {
  name: string
  email: string
  phone?: string
  message: string
  privacyAccepted: boolean
}

export interface LeadFormErrors {
  name: string
  email: string
  phone: string
  message: string
  privacyAccepted: string
}

export interface LeadValidationOptions {
  collectPhone?: boolean
  phoneRequired?: boolean
  privacyRequired?: boolean
  messageMinLength?: number
  messageMaxLength?: number
}

export interface ValidationResult {
  isValid: boolean
  errors: LeadFormErrors
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function stripPhoneDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatPhoneBR(value: string): string {
  const digits = stripPhoneDigits(value).slice(0, 11)
  if (digits.length <= 2) return digits ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function validateLeadField(
  field: keyof LeadFormErrors,
  values: LeadFormValues,
  options: LeadValidationOptions = {},
): string {
  const {
    collectPhone = true,
    phoneRequired = false,
    privacyRequired = true,
    messageMinLength = 10,
    messageMaxLength = 2000,
  } = options

  switch (field) {
    case 'name': {
      const trimmed = values.name.trim()
      if (!trimmed) return 'O nome é obrigatório.'
      if (trimmed.length < 2) return 'O nome deve ter pelo menos 2 caracteres.'
      if (trimmed.length > 120) return 'O nome deve ter no máximo 120 caracteres.'
      return ''
    }

    case 'email': {
      const trimmed = values.email.trim()
      if (!trimmed) return 'O e-mail é obrigatório.'
      if (!EMAIL_REGEX.test(trimmed)) {
        return 'Digite um e-mail válido (ex: seuemail@exemplo.com).'
      }
      return ''
    }

    case 'phone': {
      if (!collectPhone) return ''
      const digits = stripPhoneDigits(values.phone || '')
      if (!digits) {
        return phoneRequired ? 'O telefone é obrigatório.' : ''
      }
      if (digits.length !== 10 && digits.length !== 11) {
        return 'Digite um telefone válido com DDD (10 ou 11 dígitos).'
      }
      return ''
    }

    case 'message': {
      const trimmed = values.message.trim()
      if (!trimmed) return 'A mensagem é obrigatória.'
      if (trimmed.length < messageMinLength) {
        return `A mensagem deve ter pelo menos ${messageMinLength} caracteres.`
      }
      if (trimmed.length > messageMaxLength) {
        return `A mensagem deve ter no máximo ${messageMaxLength} caracteres.`
      }
      return ''
    }

    case 'privacyAccepted': {
      if (privacyRequired && !values.privacyAccepted) {
        return 'Confirme a leitura da Política de Privacidade para continuar.'
      }
      return ''
    }
  }
}

export function validateLeadForm(
  values: LeadFormValues,
  options: LeadValidationOptions = {},
): ValidationResult {
  const errors: LeadFormErrors = {
    name: validateLeadField('name', values, options),
    email: validateLeadField('email', values, options),
    phone: validateLeadField('phone', values, options),
    message: validateLeadField('message', values, options),
    privacyAccepted: validateLeadField('privacyAccepted', values, options),
  }

  const isValid = Object.values(errors).every((msg) => msg === '')
  return { isValid, errors }
}
