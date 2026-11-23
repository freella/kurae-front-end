<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { isAxiosError } from 'axios'
import { track } from '@vercel/analytics'
import { CONTACT_FORM_CONFIG } from '@/config/landing.config'
import { leadService } from '@/services/lead.service'
import {
  formatPhoneBR,
  stripPhoneDigits,
  validateLeadField,
  validateLeadForm,
  type LeadFormErrors,
  type LeadFormValues,
} from '@/utils/validation'
import TurnstileWidget from './TurnstileWidget.vue'

const form = reactive<LeadFormValues>({
  name: '',
  email: '',
  phone: '',
  message: '',
  privacyAccepted: false,
})

// Campo honeypot invisível para bots (usuários reais não interagem com ele)
const websiteHoneypot = ref('')
const turnstileToken = ref('')
const turnstileError = ref('')
const turnstileRef = ref<InstanceType<typeof TurnstileWidget> | null>(null)

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const cooldownRemaining = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

const errors = reactive<LeadFormErrors>({
  name: '',
  email: '',
  phone: '',
  message: '',
  privacyAccepted: '',
})

const validationOptions = {
  collectPhone: CONTACT_FORM_CONFIG.collectPhone,
  phoneRequired: CONTACT_FORM_CONFIG.phoneRequired,
  privacyRequired: CONTACT_FORM_CONFIG.privacy.required,
  messageMinLength: CONTACT_FORM_CONFIG.messageMinLength,
  messageMaxLength: CONTACT_FORM_CONFIG.messageMaxLength,
}

const hasTurnstile = computed(() => Boolean(CONTACT_FORM_CONFIG.turnstileSiteKey))
const messageLength = computed(() => form.message.length)
const isSubmitDisabled = computed(() => isSubmitting.value || cooldownRemaining.value > 0)

function startCooldown() {
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownRemaining.value = CONTACT_FORM_CONFIG.submitCooldownSeconds
  cooldownTimer = setInterval(() => {
    cooldownRemaining.value -= 1
    if (cooldownRemaining.value <= 0 && cooldownTimer) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
      cooldownRemaining.value = 0
    }
  }, 1000)
}

function handleBlur(field: keyof LeadFormErrors) {
  errors[field] = validateLeadField(field, form, validationOptions)
}

function handlePhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  form.phone = formatPhoneBR(input.value)
  errors.phone = ''
}

function clearFieldError(field: keyof LeadFormErrors) {
  errors[field] = ''
}

function handleTurnstileVerify(token: string) {
  turnstileToken.value = token
  turnstileError.value = ''
}

function handleTurnstileExpire() {
  turnstileToken.value = ''
  turnstileError.value = 'A verificação de segurança expirou. Confirme novamente.'
}

function handleTurnstileError() {
  turnstileToken.value = ''
  turnstileError.value = 'Não foi possível carregar a verificação de segurança. Recarregue a página.'
}

async function focusFirstInvalidField() {
  await nextTick()
  const order: Array<{ key: keyof LeadFormErrors; id: string }> = [
    { key: 'name', id: 'contact-name' },
    { key: 'email', id: 'contact-email' },
    { key: 'phone', id: 'contact-phone' },
    { key: 'message', id: 'contact-message' },
    { key: 'privacyAccepted', id: 'contact-privacy' },
  ]

  for (const item of order) {
    if (errors[item.key]) {
      document.getElementById(item.id)?.focus()
      break
    }
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  form.privacyAccepted = false
  websiteHoneypot.value = ''
  turnstileToken.value = ''
  turnstileError.value = ''
  turnstileRef.value?.reset()
}

async function handleSubmit() {
  if (isSubmitDisabled.value) return

  successMessage.value = ''
  errorMessage.value = ''
  turnstileError.value = ''

  const validation = validateLeadForm(form, validationOptions)
  Object.assign(errors, validation.errors)

  if (!validation.isValid) {
    await focusFirstInvalidField()
    return
  }

  if (hasTurnstile.value && !turnstileToken.value) {
    turnstileError.value = 'Complete a verificação de segurança antes de enviar.'
    return
  }

  try {
    isSubmitting.value = true

    await leadService.create({
      name: form.name,
      email: form.email,
      phone: CONTACT_FORM_CONFIG.collectPhone ? stripPhoneDigits(form.phone || '') : undefined,
      message: form.message,
      privacy_accepted: form.privacyAccepted,
      privacy_policy_version: CONTACT_FORM_CONFIG.privacy.policyVersion,
      website: websiteHoneypot.value || undefined,
      turnstile_token: turnstileToken.value || undefined,
    })

    successMessage.value = 'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.'
    resetForm()
    startCooldown()

    try {
      track('contact_form_submitted')
    } catch {
      // Ignora falhas de telemetria
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status
      const responseData = err.response?.data as
        | { error?: string; details?: Record<string, string> }
        | undefined

      if (status === 429) {
        errorMessage.value =
          'Muitas tentativas em pouco tempo. Aguarde alguns instantes antes de tentar novamente.'
      } else if (status === 400 && responseData?.details) {
        const details = responseData.details
        if (details.name) errors.name = details.name
        if (details.email) errors.email = details.email
        if (details.phone) errors.phone = details.phone
        if (details.message) errors.message = details.message
        if (details.privacy_accepted) errors.privacyAccepted = details.privacy_accepted
        if (details.turnstile_token) {
          turnstileError.value = details.turnstile_token
          turnstileToken.value = ''
          turnstileRef.value?.reset()
        }
        errorMessage.value = responseData.error || 'Revise os campos destacados e tente novamente.'
        await focusFirstInvalidField()
      } else {
        errorMessage.value =
          responseData?.error || 'Não foi possível enviar sua mensagem. Tente novamente.'
      }
    } else {
      errorMessage.value = 'Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.'
    }
  } finally {
    isSubmitting.value = false
  }
}

onBeforeUnmount(() => {
  if (cooldownTimer) {
    clearInterval(cooldownTimer)
  }
})
</script>

<template>
  <section
    id="contato"
    aria-labelledby="contact-heading"
    class="mx-auto max-w-7xl border-t border-navy/30 px-4 py-20 text-center sm:px-6 lg:px-8"
  >
    <span
      class="mb-3 inline-block font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
    >
      Contato
    </span>
    <h2 id="contact-heading" class="mb-3 font-display text-2xl font-bold text-ice sm:text-4xl">
      Pronto para começar?
    </h2>
    <p class="mx-auto mb-8 max-w-xl font-sans leading-relaxed text-ice/75">
      Preencha o formulário abaixo para falar com a equipe comercial da KURAE.
    </p>

    <form
      novalidate
      class="mx-auto grid max-w-[520px] gap-4 text-left font-sans"
      @submit.prevent="handleSubmit"
    >
      <!-- Honeypot antispam: oculto visualmente e inacessível via teclado/leitores de tela -->
      <div class="sr-only" aria-hidden="true">
        <label for="contact-website">Site da empresa</label>
        <input
          id="contact-website"
          v-model="websiteHoneypot"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
        />
      </div>

      <!-- Nome -->
      <div class="grid gap-2">
        <label for="contact-name" class="text-sm font-semibold text-ice">
          Nome <span class="text-cyan-vibrant" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          v-model="form.name"
          name="name"
          type="text"
          autocomplete="name"
          required
          maxlength="120"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
          :class="[
            'min-h-12 w-full rounded-[10px] border bg-graphite/90 px-3.5 text-base text-ice placeholder:text-ice/45 transition-all duration-200 focus:outline-none',
            errors.name
              ? 'border-error bg-error/10 focus:border-error'
              : 'border-navy focus:border-cyan-vibrant focus:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
          ]"
          placeholder="Seu nome completo"
          @input="clearFieldError('name')"
          @blur="handleBlur('name')"
        />
        <span
          v-if="errors.name"
          id="contact-name-error"
          role="alert"
          class="text-xs font-medium text-error"
        >
          {{ errors.name }}
        </span>
      </div>

      <!-- E-mail -->
      <div class="grid gap-2">
        <label for="contact-email" class="text-sm font-semibold text-ice">
          E-mail <span class="text-cyan-vibrant" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          name="email"
          type="email"
          inputmode="email"
          autocomplete="email"
          required
          maxlength="255"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
          :class="[
            'min-h-12 w-full rounded-[10px] border bg-graphite/90 px-3.5 text-base text-ice placeholder:text-ice/45 transition-all duration-200 focus:outline-none',
            errors.email
              ? 'border-error bg-error/10 focus:border-error'
              : 'border-navy focus:border-cyan-vibrant focus:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
          ]"
          placeholder="seuemail@empresa.com"
          @input="clearFieldError('email')"
          @blur="handleBlur('email')"
        />
        <span
          v-if="errors.email"
          id="contact-email-error"
          role="alert"
          class="text-xs font-medium text-error"
        >
          {{ errors.email }}
        </span>
      </div>

      <!-- Telefone (configurável conforme definição do Comercial) -->
      <div v-if="CONTACT_FORM_CONFIG.collectPhone" class="grid gap-2">
        <label for="contact-phone" class="text-sm font-semibold text-ice">
          Telefone
          <span
            v-if="CONTACT_FORM_CONFIG.phoneRequired"
            class="text-cyan-vibrant"
            aria-hidden="true"
          >
            *
          </span>
          <span v-else class="font-normal text-ice/55">(opcional)</span>
        </label>
        <input
          id="contact-phone"
          :value="form.phone"
          name="phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          :required="CONTACT_FORM_CONFIG.phoneRequired"
          maxlength="15"
          :aria-invalid="Boolean(errors.phone)"
          :aria-describedby="errors.phone ? 'contact-phone-error' : undefined"
          :class="[
            'min-h-12 w-full rounded-[10px] border bg-graphite/90 px-3.5 text-base text-ice placeholder:text-ice/45 transition-all duration-200 focus:outline-none',
            errors.phone
              ? 'border-error bg-error/10 focus:border-error'
              : 'border-navy focus:border-cyan-vibrant focus:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
          ]"
          placeholder="(11) 99999-9999"
          @input="handlePhoneInput"
          @blur="handleBlur('phone')"
        />
        <span
          v-if="errors.phone"
          id="contact-phone-error"
          role="alert"
          class="text-xs font-medium text-error"
        >
          {{ errors.phone }}
        </span>
      </div>

      <!-- Mensagem -->
      <div class="grid gap-2">
        <div class="flex items-baseline justify-between gap-2">
          <label for="contact-message" class="text-sm font-semibold text-ice">
            Mensagem <span class="text-cyan-vibrant" aria-hidden="true">*</span>
          </label>
          <span class="text-xs text-ice/55" aria-live="off">
            {{ messageLength }}/{{ CONTACT_FORM_CONFIG.messageMaxLength }}
          </span>
        </div>
        <textarea
          id="contact-message"
          v-model="form.message"
          name="message"
          rows="4"
          required
          :maxlength="CONTACT_FORM_CONFIG.messageMaxLength"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? 'contact-message-error' : undefined"
          :class="[
            'w-full resize-y rounded-[10px] border bg-graphite/90 px-3.5 py-3 text-base text-ice placeholder:text-ice/45 transition-all duration-200 focus:outline-none',
            errors.message
              ? 'border-error bg-error/10 focus:border-error'
              : 'border-navy focus:border-cyan-vibrant focus:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
          ]"
          placeholder="Conte brevemente como podemos ajudar sua empresa."
          @input="clearFieldError('message')"
          @blur="handleBlur('message')"
        />
        <span
          v-if="errors.message"
          id="contact-message-error"
          role="alert"
          class="text-xs font-medium text-error"
        >
          {{ errors.message }}
        </span>
      </div>

      <!-- Privacidade / LGPD -->
      <div class="grid gap-1.5 pt-1">
        <div class="flex items-start gap-3">
          <input
            id="contact-privacy"
            v-model="form.privacyAccepted"
            name="privacyAccepted"
            type="checkbox"
            :required="CONTACT_FORM_CONFIG.privacy.required"
            :aria-invalid="Boolean(errors.privacyAccepted)"
            :aria-describedby="errors.privacyAccepted ? 'contact-privacy-error' : undefined"
            class="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-navy bg-graphite accent-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-neon"
            @change="clearFieldError('privacyAccepted')"
          />
          <label for="contact-privacy" class="cursor-pointer text-xs leading-relaxed text-ice/80">
            {{ CONTACT_FORM_CONFIG.privacy.checkboxPrefix }}
            <RouterLink
              :to="CONTACT_FORM_CONFIG.privacy.policyPath"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-cyan-vibrant underline underline-offset-2 transition-colors hover:text-cyan-neon focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-neon"
            >
              {{ CONTACT_FORM_CONFIG.privacy.linkLabel }}
            </RouterLink>
            {{ CONTACT_FORM_CONFIG.privacy.checkboxSuffix }}
          </label>
        </div>
        <span
          v-if="errors.privacyAccepted"
          id="contact-privacy-error"
          role="alert"
          class="text-xs font-medium text-error"
        >
          {{ errors.privacyAccepted }}
        </span>
      </div>

      <!-- Cloudflare Turnstile (ativado automaticamente quando VITE_TURNSTILE_SITE_KEY existir) -->
      <div v-if="hasTurnstile" class="grid gap-1.5">
        <TurnstileWidget
          ref="turnstileRef"
          :site-key="CONTACT_FORM_CONFIG.turnstileSiteKey"
          @verify="handleTurnstileVerify"
          @expire="handleTurnstileExpire"
          @error="handleTurnstileError"
        />
        <span v-if="turnstileError" role="alert" class="text-center text-xs font-medium text-error">
          {{ turnstileError }}
        </span>
      </div>

      <button
        type="submit"
        class="mt-2 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-[10px] bg-cyan-vibrant px-5 font-semibold text-deep-blue shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-neon hover:shadow-[0_0_30px_rgba(0,240,255,0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        :disabled="isSubmitDisabled"
      >
        <template v-if="isSubmitting">Enviando...</template>
        <template v-else-if="cooldownRemaining > 0">
          Aguarde {{ cooldownRemaining }}s para novo envio
        </template>
        <template v-else>Enviar mensagem</template>
      </button>
    </form>

    <p
      v-if="successMessage"
      role="status"
      aria-live="polite"
      class="mx-auto mt-4 max-w-[520px] font-sans text-sm font-medium text-turquoise"
    >
      {{ successMessage }}
    </p>

    <p
      v-if="errorMessage"
      role="alert"
      aria-live="assertive"
      class="mx-auto mt-4 max-w-[520px] font-sans text-sm font-medium text-error"
    >
      {{ errorMessage }}
    </p>
  </section>
</template>
