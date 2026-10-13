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

      <div class="carousel-controls" role="group" aria-label="Controles do carrossel">
        <button
          class="carousel-btn"
          type="button"
          :disabled="atStart"
          aria-label="Projeto anterior"
          @click="scrollBy(-1)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M11 4L6 9l5 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          class="carousel-btn"
          type="button"
          :disabled="atEnd"
          aria-label="Próximo projeto"
          @click="scrollBy(1)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M7 4l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <div
      ref="trackRef"
      class="carousel-track"
      role="list"
      aria-label="Lista de projetos"
      @scroll.passive="onScroll"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.slug"
        :project="project"
        @open="openModal"
      />
      <div class="carousel-spacer" aria-hidden="true" />
    </div>

    <nav class="carousel-dots" aria-label="Navegar entre projetos">
      <button
        v-for="(project, index) in projects"
        :key="project.slug"
        class="carousel-dot"
        :class="{ active: activeIndex === index }"
        type="button"
        :aria-current="activeIndex === index ? 'true' : undefined"
        :aria-label="`Ir para ${project.name}`"
        @click="scrollToIndex(index)"
      />
    </nav>

    <ProjectModal :project="activeProject" @close="closeModal" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Project } from '@/data/projects'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectModal from '@/components/projects/ProjectModal.vue'

const trackRef = ref<HTMLDivElement | null>(null)
const scrollLeft = ref(0)
const trackWidth = ref(0)
const scrollWidth = ref(0)
const activeProject = ref<Project | null>(null)

const atStart = computed(() => scrollLeft.value <= 1)
const atEnd = computed(
  () => scrollLeft.value >= scrollWidth.value - trackWidth.value - 2,
)
const activeIndex = computed(() => {
  const track = trackRef.value
  if (!track) return 0

  const cards = [...track.querySelectorAll<HTMLElement>('[role="listitem"]')]
  if (cards.length === 0) return 0
  const trackLeft = track.getBoundingClientRect().left
  const positions = cards.map(
    (card) => track.scrollLeft + card.getBoundingClientRect().left - trackLeft,
  )
  let nearestIndex = 0

  for (let index = 1; index < positions.length; index += 1) {
    const position = positions[index]
    const nearestPosition = positions[nearestIndex]
    if (
      position !== undefined &&
      nearestPosition !== undefined &&
      Math.abs(position - track.scrollLeft) < Math.abs(nearestPosition - track.scrollLeft)
    ) {
      nearestIndex = index
    }
  }

  return nearestIndex
})

function onScroll() {
  if (!trackRef.value) return
  scrollLeft.value = trackRef.value.scrollLeft
}

function scrollBy(direction: number) {
  const track = trackRef.value
  const firstCard = track?.querySelector<HTMLElement>('[role="listitem"]')
  if (!track || !firstCard) return

  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  track.scrollBy({
    left: direction * (firstCard.getBoundingClientRect().width + gap),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

function scrollToIndex(index: number) {
  const track = trackRef.value
  const card = track?.querySelectorAll<HTMLElement>('[role="listitem"]')[index]
  if (!track || !card) return

  const left = track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left
  track.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function updateDimensions() {
  if (!trackRef.value) return
  trackWidth.value = trackRef.value.clientWidth
  scrollWidth.value = trackRef.value.scrollWidth
}

function openModal(project: Project) {
  activeProject.value = project
}

function closeModal() {
  activeProject.value = null
}

let resizeObserver: ResizeObserver | undefined
onMounted(() => {
  updateDimensions()
  resizeObserver = new ResizeObserver(updateDimensions)
  if (trackRef.value) resizeObserver.observe(trackRef.value)
})

onUnmounted(() => resizeObserver?.disconnect())
</script>

<style scoped>
.projects-section {
  width: calc(100% + 48px);
  margin: 0 -24px;
  padding: 96px 0;
}

.projects-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;
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

.carousel-controls {
  display: none;
  flex-shrink: 0;
  gap: 8px;
}

.carousel-btn {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.carousel-btn:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-btn:focus-visible {
  outline: 2px solid #00c896;
  outline-offset: 2px;
}

.carousel-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 clamp(24px, 5vw, 80px) 8px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-spacer {
  width: clamp(24px, 5vw, 80px);
  flex: 0 0 auto;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
  padding: 0 24px;
}

.carousel-dot {
  width: 6px;
  height: 6px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition:
    background 0.2s,
    width 0.2s;
}

.carousel-dot.active {
  width: 20px;
  border-radius: 3px;
  background: #00c896;
}

.carousel-dot:focus-visible {
  outline: 2px solid #00c896;
  outline-offset: 3px;
}

@media (min-width: 768px) {
  .carousel-controls {
    display: flex;
  }

  .carousel-dots {
    display: none;
  }
}

@media (max-width: 480px) {
  .projects-section {
    width: calc(100% + 32px);
    margin-inline: -16px;
    padding: 72px 0;
  }

  .projects-header {
    align-items: flex-start;
    margin-bottom: 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-dot {
    scroll-behavior: auto;
    transition: none;
  }
}
</style>
