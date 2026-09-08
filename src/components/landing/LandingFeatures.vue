<script setup lang="ts">
import { LANDING_CONTENT } from '@/config/landing.config'
</script>

<template>
  <section id="beneficios" class="features-section">
    <div class="section-header">
      <span class="section-label">Benefícios</span>
      <h2>Por que escolher nossa solução?</h2>
      <p>
        Uma plataforma pensada para ser legível, adaptável e pronta para evoluir com o seu projeto.
      </p>
    </div>

    <div class="features-grid">
      <article v-for="benefit in LANDING_CONTENT.benefits" :key="benefit.title" class="feature-card">
        <v-icon class="feature-icon" :icon="benefit.icon" />
        <h3>{{ benefit.title }}</h3>
        <p>{{ benefit.description }}</p>
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
