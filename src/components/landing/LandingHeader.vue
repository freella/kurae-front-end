<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
import kuraeLogoHeader from '@/assets/logos/kurae/Kurae_Logo_V03.svg'
</script>

<template>
  <header class="w-full border-b border-navy/40">
    <div
      class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center lg:px-8"
    >
      <a
        href="#inicio"
        class="inline-flex items-center transition-opacity hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        <img
          :src="kuraeLogoHeader"
          :alt="LANDING_CONTENT.brand"
          class="h-10 w-auto sm:h-11"
        />
      </a>

      <nav
        aria-label="Navegação principal"
        class="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-sm font-medium lg:gap-x-8"
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
          href="#abordagem"
          class="text-ice/85 transition-colors hover:text-cyan-vibrant focus-visible:rounded-sm focus-visible:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
        >
          Abordagem
        </a>
      </nav>

      <a
        href="#contato"
        class="inline-flex items-center rounded-lg border border-cyan-vibrant/50 bg-petrol/40 px-4 py-2 font-sans text-sm font-semibold text-cyan-vibrant transition-all hover:border-cyan-vibrant hover:bg-cyan-vibrant hover:text-deep-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-neon"
      >
        Contato
      </a>
    </div>
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
