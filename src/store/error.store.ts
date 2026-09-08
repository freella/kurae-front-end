import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const hasError = ref(false)
  const message = ref('Ocorreu um erro inesperado. Tente novamente.')
  const errorDetails = ref('')

  function setError(error: unknown) {
    hasError.value = true
    message.value = 'Ocorreu um erro inesperado. Tente novamente.'

    if (error instanceof Error) {
      errorDetails.value = error.message
      return
    }

    errorDetails.value = 'Erro desconhecido.'
  }

  function clearError() {
    hasError.value = false
    message.value = 'Ocorreu um erro inesperado. Tente novamente.'
    errorDetails.value = ''
  }

  return {
    hasError,
    message,
    errorDetails,
    setError,
    clearError,
  }
})