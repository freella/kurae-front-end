export interface ValidationResult {
  isValid: boolean;
  errors: {
    name: string;
    email: string;
  };
}

export const validateLeadForm = (name: string, email: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: { name: '', email: '' }
  };

  // Validação de Nome
  if (!name.trim()) {
    result.errors.name = 'O nome é obrigatório.';
    result.isValid = false;
  } else if (name.trim().length < 2) {
    result.errors.name = 'O nome deve ter pelo menos 2 caracteres.';
    result.isValid = false;
  }

  // Validação de Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    result.errors.email = 'O email é obrigatório.';
    result.isValid = false;
  } else if (!emailRegex.test(email.trim())) {
    result.errors.email = 'Digite um e-mail válido (ex: seuemail@exemplo.com).';
    result.isValid = false;
  }

  return result;
};
