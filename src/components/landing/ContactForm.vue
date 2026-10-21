<script setup lang="ts">
import { ref } from 'vue'
import { track } from '@vercel/analytics'
import { leadService } from '@/services/lead.service'
import { validateLeadForm } from '@/utils/validation'

const name = ref('')
const email = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = ref({ name: '', email: '' })

async function handleSubmit() {
  successMessage.value = ''
  errorMessage.value = ''

  const validation = validateLeadForm(name.value, email.value)
  errors.value = validation.errors

  if (!validation.isValid) {
    return
  }

  try {
    isSubmitting.value = true

    await leadService.create({
      name: name.value,
      email: email.value,
    })

    successMessage.value = 'Lead enviado com sucesso!'
    name.value = ''
    email.value = ''
    try {
      track('contact_form_submitted')
    } catch {
      // Uma falha na medição não altera o resultado do envio.
    }
  } catch {
    errorMessage.value = 'Não foi possível enviar seus dados. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contato" class="cta-section">
    <h2>Pronto para começar?</h2>
    <p>Preencha o formulário para entrar em contato com a equipe.</p>

    <form class="lead-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nome</label>
        <input
          id="name"
          v-model="name"
          type="text"
          :class="['form-input', { 'input-error': errors.name }]"
          placeholder="Seu nome"
          @input="errors.name = ''"
        />
        <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          :class="['form-input', { 'input-error': errors.email }]"
          placeholder="seuemail@exemplo.com"
          @input="errors.email = ''"
        />
        <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
      </div>

      <button type="submit" class="primary-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
      </button>
    </form>

    <p v-if="successMessage" class="form-feedback success">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage" class="form-feedback error">
      {{ errorMessage }}
    </p>
  </section>
</template>

<style scoped>
.cta-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.cta-section h2 {
  margin-bottom: 12px;
  font-size: 2rem;
}

.cta-section > p {
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 32px;
}

.lead-form {
  max-width: 480px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
  text-align: left;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #f8fafc;
}

.form-input {
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  outline: none;
  font-size: 1rem;
}

.form-input::placeholder {
  color: #94a3b8;
}

.form-input:focus {
  border-color: rgba(255, 255, 255, 0.35);
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease, opacity 0.2s ease;
  background: #ffffff;
  color: #0f172a;
  border: none;
  cursor: pointer;
}

.primary-btn:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-feedback {
  margin-top: 16px;
}

.form-feedback.success {
  color: #86efac;
}

.form-feedback.error {
  color: #fca5a5;
}

.input-error {
  border-color: #fca5a5 !important;
  background: rgba(252, 165, 165, 0.05);
}

.field-error {
  color: #fca5a5;
  font-size: 0.85rem;
  margin-top: 4px;
}

@media (max-width: 480px) {
  .cta-section h2 {
    font-size: 1.6rem;
  }
  
  .primary-btn {
    width: 100%;
  }
}
</style>
