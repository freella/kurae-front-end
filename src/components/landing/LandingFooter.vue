<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CONTACT_FORM_CONFIG, LANDING_CONTENT } from '@/config/landing.config'
import kuraeLogoFooter from '@/assets/logos/kurae/Kurae_Logo_V04.svg'
</script>

<template>
  <footer
    class="mx-auto flex max-w-[1200px] flex-col items-center gap-4 border-t border-navy/40 px-4 pt-8 pb-10 text-center font-sans text-sm sm:px-6 lg:px-8"
  >
    <a
      href="#inicio"
      class="inline-flex items-center transition-opacity hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
    >
      <img
        :src="kuraeLogoFooter"
        :alt="LANDING_CONTENT.brand"
        class="h-11 w-auto"
      />
    </a>

    <nav aria-label="Links legais" class="flex flex-wrap items-center justify-center gap-4">
      <RouterLink
        :to="CONTACT_FORM_CONFIG.privacy.policyPath"
        class="text-ice/75 underline underline-offset-4 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Política de Privacidade
      </RouterLink>
    </nav>

    <p class="leading-relaxed text-ice/75">
      © 2026
      <span class="font-display font-semibold text-ice">
        {{ LANDING_CONTENT.brand }} </span
      >. Todos os direitos reservados.
    </p>
  </footer>
</template>

<style scoped>
.landing-footer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0 40px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.landing-footer p {
  color: #cbd5e1;
  line-height: 1.6;
}
</style>
