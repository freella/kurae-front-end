<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <footer
    class="mx-auto max-w-[1200px] border-t border-navy/40 px-4 pt-6 pb-10 text-center font-sans text-sm sm:px-6 lg:px-8"
  >
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
