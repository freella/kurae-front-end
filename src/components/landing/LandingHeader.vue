<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <header
    class="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 border-b border-navy/40 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8"
  >
    <a
      href="#inicio"
      class="font-display text-xl font-bold tracking-tight text-ice transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
    >
      {{ LANDING_CONTENT.brand }}
    </a>

    <nav
      aria-label="Navegação principal"
      class="flex w-full flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm font-medium sm:w-auto sm:gap-x-6"
    >
      <a
        href="#inicio"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Início
      </a>
      <a
        href="#sobre"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Sobre
      </a>
      <a
        href="#projetos"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Projetos
      </a>
      <a
        href="#tecnologias"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Tecnologias
      </a>
      <a
        href="#beneficios"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Benefícios
      </a>
      <a
        href="#faq"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        FAQ
      </a>
      <a
        href="#contato"
        class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Contato
      </a>
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
