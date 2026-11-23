import { describe, it, expect } from 'vitest'
import { formatPhoneBR, validateLeadForm } from '../../src/utils/validation'

const validPayload = {
  name: 'Bernardo Neto',
  email: 'contato@kurae.dev',
  phone: '(11) 99999-8888',
  message: 'Gostaria de saber mais sobre os serviços da KURAE.',
  privacyAccepted: true,
}

describe('validateLeadForm', () => {
  it('deve retornar erro se o nome estiver vazio', () => {
    const result = validateLeadForm({ ...validPayload, name: '' })
    expect(result.isValid).toBe(false)
    expect(result.errors.name).toBe('O nome é obrigatório.')
  })

  it('deve retornar erro se o nome tiver menos de 2 caracteres', () => {
    const result = validateLeadForm({ ...validPayload, name: 'B' })
    expect(result.isValid).toBe(false)
    expect(result.errors.name).toContain('pelo menos 2 caracteres')
  })

  it('deve retornar erro se o email for inválido', () => {
    const result = validateLeadForm({ ...validPayload, email: 'email-invalido' })
    expect(result.isValid).toBe(false)
    expect(result.errors.email).toContain('válido')
  })

  it('deve permitir telefone vazio quando opcional', () => {
    const result = validateLeadForm(
      { ...validPayload, phone: '' },
      { collectPhone: true, phoneRequired: false },
    )
    expect(result.isValid).toBe(true)
    expect(result.errors.phone).toBe('')
  })

  it('deve retornar erro se telefone preenchido tiver formato inválido', () => {
    const result = validateLeadForm({ ...validPayload, phone: '11999' })
    expect(result.isValid).toBe(false)
    expect(result.errors.phone).toContain('DDD')
  })

  it('deve retornar erro se mensagem estiver vazia ou muito curta', () => {
    const emptyMsg = validateLeadForm({ ...validPayload, message: '' })
    expect(emptyMsg.isValid).toBe(false)
    expect(emptyMsg.errors.message).toBe('A mensagem é obrigatória.')

    const shortMsg = validateLeadForm({ ...validPayload, message: 'Oi' })
    expect(shortMsg.isValid).toBe(false)
    expect(shortMsg.errors.message).toContain('pelo menos 10 caracteres')
  })

  it('deve exigir ciência da Política de Privacidade quando configurada como obrigatória', () => {
    const result = validateLeadForm(
      { ...validPayload, privacyAccepted: false },
      { privacyRequired: true },
    )
    expect(result.isValid).toBe(false)
    expect(result.errors.privacyAccepted).toContain('Política de Privacidade')
  })

  it('deve ser válido com todos os dados corretos', () => {
    const result = validateLeadForm(validPayload)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({
      name: '',
      email: '',
      phone: '',
      message: '',
      privacyAccepted: '',
    })
  })
})

describe('formatPhoneBR', () => {
  it('formata celular com 11 dígitos corretamente', () => {
    expect(formatPhoneBR('11987654321')).toBe('(11) 98765-4321')
  })

  it('formata telefone fixo com 10 dígitos corretamente', () => {
    expect(formatPhoneBR('1133334444')).toBe('(11) 3333-4444')
  })
})
