<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'
import GlobalSnackbar from '@/components/global/GlobalSnackbar.vue'
import GlobalLoader from '@/components/global/GlobalLoader.vue'
import { useErrorStore } from '@/store/error.store'

const errorStore = useErrorStore()

function reloadPage() {
  window.location.reload()
}
</script>

<template>
  <template v-if="errorStore.hasError">
    <div
      class="flex min-h-screen items-center justify-center bg-gradient-to-br from-deep-blue to-dark-blue p-6 font-sans text-ice"
    >
      <div
        class="w-full max-w-[500px] rounded-2xl border border-navy/60 bg-graphite/90 px-6 py-8 text-center shadow-2xl backdrop-blur-sm"
      >
        <h1 class="mb-3 font-display text-3xl font-bold text-ice">
          Algo deu errado
        </h1>
        <p class="mb-3 leading-relaxed text-ice/85">
          {{ errorStore.message }}
        </p>

        <p
          v-if="errorStore.errorDetails"
          class="mb-6 break-words rounded-[10px] border border-petrol bg-deep-blue/80 p-3 text-sm leading-snug text-ice/70"
        >
          Detalhes: {{ errorStore.errorDetails }}
        </p>

        <button
          type="button"
          @click="reloadPage"
          class="cursor-pointer rounded-[10px] bg-cyan-vibrant px-5 py-3 text-[0.95rem] font-semibold text-deep-blue transition-all hover:-translate-y-0.5 hover:bg-cyan-neon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
        >
          Recarregar página
        </button>
      </div>
    </div>
  </template>

  <template v-else>
    <v-app>
      <router-view />
      <GlobalSnackbar />
      <GlobalLoader />
    </v-app>
  </template>
  <Analytics />
</template>