<script setup lang="ts">
import { ref } from 'vue'

const isDetailOpen = ref(false)
</script>

<template>
  <section id="projetos" class="projects-section" aria-labelledby="projects-title">
    <div class="section-header">
      <span class="section-label">Portfólio</span>
      <h2 id="projects-title">Projetos</h2>
      <p>Conheça um dos nossos cases.</p>
    </div>

    <div class="projects-grid">
      <article class="project-card">
        <div class="project-card__content">
          <span class="project-category">Case</span>
          <h3>Vitalis</h3>
          <v-btn
            class="project-details-button"
            variant="text"
            color="white"
            append-icon="mdi-arrow-right"
            aria-haspopup="dialog"
            @click="isDetailOpen = true"
          >
            Ver detalhes
          </v-btn>
        </div>
      </article>
    </div>

    <v-dialog v-model="isDetailOpen" max-width="640" scrollable>
      <v-card class="project-dialog" aria-labelledby="vitalis-title">
        <v-card-title id="vitalis-title" class="project-dialog__title">
          <span>Vitalis</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            aria-label="Fechar detalhes do projeto Vitalis"
            @click="isDetailOpen = false"
          />
        </v-card-title>

        <v-card-text class="project-dialog__body">
          <span class="project-category">Case</span>
          <p>
            As informações completas deste case ainda não foram adicionadas.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.projects-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.section-header {
  margin-bottom: 32px;
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
  max-width: 580px;
  color: #cbd5e1;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.project-card {
  min-height: 220px;
  display: flex;
  align-items: flex-end;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03));
}

.project-card__content {
  display: grid;
  justify-items: start;
  gap: 10px;
}

.project-category {
  color: #93c5fd;
  font-size: 0.85rem;
  font-weight: 600;
}

.project-card h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.4rem;
  font-weight: 600;
}

.project-details-button {
  margin-left: -8px;
}

.project-dialog__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  white-space: normal;
}

.project-dialog__body {
  display: grid;
  justify-items: start;
  gap: 12px;
  padding-top: 8px;
  padding-bottom: 24px;
}

.project-dialog__body p {
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    min-height: 180px;
  }

  .section-header h2 {
    font-size: 1.6rem;
  }
}
</style>
