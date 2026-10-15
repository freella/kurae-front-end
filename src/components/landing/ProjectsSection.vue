<template>
  <section id="projetos" class="projects-section" aria-labelledby="projects-heading">
    <header class="projects-header">
      <div class="projects-header-text">
        <h2 id="projects-heading" class="projects-title">Projetos</h2>
        <p class="projects-subtitle">
          Do licenciamento público ao mercado de carbono — sistemas que resolvem problemas reais com
          arquitetura pensada para crescer.
        </p>
      </div>
    </header>

    <v-slide-group
      class="projects-carousel"
      role="region"
      aria-label="Navegar entre projetos"
      show-arrows="desktop"
      :scroll-distance="176"
      scroll-snap="start"
      :mobile-breakpoint="768"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.slug"
        :project="project"
        @open="openModal"
      />
    </v-slide-group>

    <ProjectModal :project="activeProject" @close="closeModal" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/data/projects'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectModal from '@/components/projects/ProjectModal.vue'

const activeProject = ref<Project | null>(null)

function openModal(project: Project) {
  activeProject.value = project
}

function closeModal() {
  activeProject.value = null
}
</script>

<style scoped>
.projects-section {
  width: calc(100% + 48px);
  margin: 0 -24px;
  padding: 72px 0;
}

.projects-header {
  margin-bottom: 36px;
  padding: 0 clamp(24px, 5vw, 80px);
}

.projects-header-text {
  max-width: 480px;
}

.projects-title {
  margin: 0 0 14px;
  color: #fff;
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 600;
  line-height: 1.05;
}

.projects-subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 16px;
  line-height: 1.55;
}

.projects-carousel {
  width: 100%;
  padding: 0 clamp(24px, 5vw, 80px);
}

.projects-carousel :deep(.v-slide-group__content) {
  gap: 20px;
  padding: 0 0 8px;
}

@media (max-width: 480px) {
  .projects-section {
    width: calc(100% + 32px);
    margin-inline: -16px;
    padding: 56px 0;
  }

  .projects-header {
    margin-bottom: 32px;
  }
}
</style>
