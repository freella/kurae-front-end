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

<template>
  <section
    id="projetos"
    class="w-full overflow-hidden border-t border-navy/30 bg-deep-blue py-14 sm:py-20"
    aria-labelledby="projects-heading"
  >
    <header class="mx-auto mb-8 max-w-7xl px-4 sm:mb-9 sm:px-6 lg:px-8">
      <div class="max-w-xl">
        <span
          class="mb-3 inline-block font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
        >
          Portfólio
        </span>
        <h2
          id="projects-heading"
          class="mb-3.5 font-display text-4xl font-bold leading-[1.08] text-ice sm:text-5xl"
        >
          Projetos
        </h2>
        <p class="font-sans text-base leading-relaxed text-ice/75">
          Do licenciamento público ao mercado de carbono — sistemas que resolvem
          problemas reais com arquitetura pensada para crescer.
        </p>
      </div>
    </header>

    <v-slide-group
      class="projects-carousel mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
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

<style scoped>
.projects-carousel :deep(.v-slide-group__content) {
  gap: 20px;
  padding: 4px 0 12px;
}

.projects-carousel :deep(.v-slide-group__prev),
.projects-carousel :deep(.v-slide-group__next) {
  color: var(--color-cyan-vibrant);
}
</style>