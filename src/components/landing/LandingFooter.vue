<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <footer class="landing-footer">
    <p>© 2026 {{ LANDING_CONTENT.brand }}. Todos os direitos reservados.</p>
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
