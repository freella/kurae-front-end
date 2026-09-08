import { describe, it, expect } from 'vitest'
import { validateLeadForm } from '../../src/utils/validation'

describe('validateLeadForm', () => {
  it('deve retornar erro se o nome estiver vazio', () => {
    const result = validateLeadForm('', 'teste@exemplo.com')
    expect(result.isValid).toBe(false)
    expect(result.errors.name).toBe('O nome é obrigatório.')
  })

  it('deve retornar erro se o email for inválido', () => {
    const result = validateLeadForm('Bernardo', 'email-invalido')
    expect(result.isValid).toBe(false)
    expect(result.errors.email).toContain('válido')
  })

  it('deve ser válido com dados corretos', () => {
    const result = validateLeadForm('Bernardo', 'contato@berna.dev')
    expect(result.isValid).toBe(true)
    expect(result.errors.name).toBe('')
    expect(result.errors.email).toBe('')
  })
})
