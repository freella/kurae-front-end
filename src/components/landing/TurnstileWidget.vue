<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      theme?: 'light' | 'dark' | 'auto'
      callback?: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    },
  ) => string
  reset: (widgetId?: string) => void
  remove: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const props = defineProps<{
  siteKey: string
}>()

const emit = defineEmits<{
  verify: [token: string]
  expire: []
  error: []
}>()

const containerRef = ref<HTMLElement | null>(null)
const widgetId = ref<string | null>(null)

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function renderWidget() {
  if (!containerRef.value || !window.turnstile || !props.siteKey) return
  if (widgetId.value) return

  widgetId.value = window.turnstile.render(containerRef.value, {
    sitekey: props.siteKey,
    theme: 'dark',
    callback: (token: string) => emit('verify', token),
    'expired-callback': () => emit('expire'),
    'error-callback': () => emit('error'),
  })
}

function loadScriptAndRender() {
  if (window.turnstile) {
    renderWidget()
    return
  }

  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }

  script.addEventListener('load', renderWidget, { once: true })
  script.addEventListener('error', () => emit('error'), { once: true })
}

function reset() {
  if (window.turnstile && widgetId.value) {
    window.turnstile.reset(widgetId.value)
  }
}

defineExpose({ reset })

onMounted(() => {
  if (props.siteKey) {
    loadScriptAndRender()
  }
})

onBeforeUnmount(() => {
  if (window.turnstile && widgetId.value) {
    window.turnstile.remove(widgetId.value)
    widgetId.value = null
  }
})
</script>

<template>
  <div v-if="siteKey" class="flex justify-center pt-1">
    <div ref="containerRef" aria-label="Verificação de segurança antispam" />
  </div>
</template>
