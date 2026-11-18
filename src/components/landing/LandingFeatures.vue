<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <section
    id="beneficios"
    class="mx-auto max-w-7xl border-t border-navy/30 px-4 py-20 sm:px-6 lg:px-8"
  >
    <div class="mb-10">
      <span
        class="mb-3 inline-block font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
      >
        Benefícios
      </span>
      <h2 class="mb-3 font-display text-2xl font-bold text-ice sm:text-4xl">
        Por que escolher nossa solução?
      </h2>
      <p class="max-w-[580px] font-sans leading-relaxed text-ice/75">
        Uma plataforma pensada para ser legível, adaptável e pronta para evoluir
        com o seu projeto.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="benefit in LANDING_CONTENT.benefits"
        :key="benefit.title"
        class="rounded-2xl border border-navy/50 bg-graphite/90 px-6 py-7 transition-all hover:-translate-y-0.5 hover:border-cyan-vibrant/50 hover:bg-petrol/40"
      >
        <div
          class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-sky-electric/30 bg-petrol/70"
        >
          <v-icon :icon="benefit.icon" color="primary" size="26" />
        </div>
        <h3 class="mb-2.5 font-display text-lg font-bold text-ice">
          {{ benefit.title }}
        </h3>
        <p class="font-sans text-sm leading-relaxed text-ice/75">
          {{ benefit.description }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.section-header {
  margin-bottom: 40px;
}

.section-label {
  display: inline-block;
  margin-bottom: 12px;
  color: #93c5fd;
  font-size: 0.9rem;
  font-weight: 600;
}

.section-header h2 {
  margin-bottom: 12px;
  font-size: 2rem;
}

.section-header p {
  color: #cbd5e1;
  line-height: 1.6;
  max-width: 580px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  padding: 28px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.2s ease, background 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.08);
}

.feature-icon {
  font-size: 1.75rem !important;
  display: block;
  margin-bottom: 14px;
  color: #93c5fd !important;
}

.feature-card h3 {
  margin: 0 0 10px;
  font-size: 1.05rem;
  font-weight: 600;
}

.feature-card p {
  color: #cbd5e1;
  line-height: 1.5;
  font-size: 0.93rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header h2 {
    font-size: 1.6rem;
  }
}
</style>
