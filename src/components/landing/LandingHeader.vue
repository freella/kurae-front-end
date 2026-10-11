<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <header class="landing-header">
    <div class="brand">{{ LANDING_CONTENT.brand }}</div>

    <nav class="landing-nav">
      <a href="#inicio">Início</a>
      <a href="#sobre">Sobre</a>
      <a href="#projetos">Projetos</a>
      <a href="#tecnologias">Tecnologias</a>
      <a href="#beneficios">Benefícios</a>
      <a href="#faq">FAQ</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>
</template>

<style scoped>
.landing-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
}

.landing-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.landing-nav a {
  color: #e2e8f0;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.landing-nav a:hover {
  opacity: 0.8;
}

@media (max-width: 480px) {
  .landing-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .landing-nav {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px 16px;
  }
}
</style>
