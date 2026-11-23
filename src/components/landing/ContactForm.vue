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
    }
  } catch {
    errorMessage.value = 'Não foi possível enviar seus dados. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section
    id="contato"
    class="mx-auto max-w-7xl border-t border-navy/30 px-4 py-20 text-center sm:px-6 lg:px-8"
  >
    <span
      class="mb-3 inline-block font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
    >
      Contato
    </span>
    <h2 class="mb-3 font-display text-2xl font-bold text-ice sm:text-4xl">
      Pronto para começar?
    </h2>
    <p class="mx-auto mb-8 max-w-xl font-sans leading-relaxed text-ice/75">
      Preencha o formulário para entrar em contato com a equipe.
    </p>

    <form
      class="mx-auto grid max-w-[480px] gap-4 text-left font-sans"
      @submit.prevent="handleSubmit"
    >
      <div class="grid gap-2">
        <label for="name" class="text-sm font-semibold text-ice">Nome</label>
        <input
          id="name"
          v-model="name"
          type="text"
          :class="[
            'min-h-12 w-full rounded-[10px] border bg-graphite/90 px-3.5 text-base text-ice placeholder:text-ice/45 transition-all duration-200 focus:outline-none',
            errors.name
              ? 'border-error bg-error/10 focus:border-error'
              : 'border-navy focus:border-cyan-vibrant focus:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
          ]"
          placeholder="Seu nome"
          @input="errors.name = ''"
        />
        <span v-if="errors.name" class="text-xs font-medium text-error">
          {{ errors.name }}
        </span>
      </div>

      <div class="grid gap-2">
        <label for="email" class="text-sm font-semibold text-ice">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          :class="[
            'min-h-12 w-full rounded-[10px] border bg-graphite/90 px-3.5 text-base text-ice placeholder:text-ice/45 transition-all duration-200 focus:outline-none',
            errors.email
              ? 'border-error bg-error/10 focus:border-error'
              : 'border-navy focus:border-cyan-vibrant focus:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
          ]"
          placeholder="seuemail@exemplo.com"
          @input="errors.email = ''"
        />
        <span v-if="errors.email" class="text-xs font-medium text-error">
          {{ errors.email }}
        </span>
      </div>

      <button
        type="submit"
        class="mt-2 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-[10px] bg-cyan-vibrant px-5 font-semibold text-deep-blue shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-neon hover:shadow-[0_0_30px_rgba(0,240,255,0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
      </button>
    </form>

    <p v-if="successMessage" class="mt-4 font-sans text-sm font-medium text-turquoise">
      {{ successMessage }}
    </p>

    <p v-if="errorMessage" class="mt-4 font-sans text-sm font-medium text-error">
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
