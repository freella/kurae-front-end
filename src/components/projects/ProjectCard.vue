<template>
  <article class="project-card-item" role="listitem">
    <button
      class="project-card"
      :style="{ '--accent': project.accentColor }"
      :aria-label="`Ver detalhes: ${project.name}`"
      @click="$emit('open', project)"
    >
      <img
        v-if="project.cover"
        class="card-cover"
        :src="project.cover"
        alt=""
        aria-hidden="true"
      />
      <GoldenSpiral
        class="card-spiral"
        :size="320"
        :color="project.accentColor"
        :opacity="0.15"
      />

      <div class="card-inner">
        <div class="card-top">
          <span class="card-tag">{{ project.tag }}</span>
          <span class="card-year">{{ project.year }}</span>
        </div>

        <div class="card-body">
          <h3 class="card-name">{{ project.name }}</h3>
          <p class="card-desc">{{ project.shortDesc }}</p>
        </div>

        <div class="card-bottom">
          <ul class="card-stack" aria-label="Tecnologias">
            <li v-for="tech in project.stack.slice(0, 3)" :key="tech">{{ tech }}</li>
            <li v-if="project.stack.length > 3">+{{ project.stack.length - 3 }}</li>
          </ul>
          <span class="card-cta" aria-hidden="true">Ver projeto</span>
        </div>
      </div>

      <span class="card-accent-line" aria-hidden="true" />
    </button>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '@/data/projects'
import GoldenSpiral from './GoldenSpiral.vue'

defineProps<{
  project: Project
}>()

defineEmits<{
  open: [project: Project]
}>()
</script>

<style scoped>
.project-card-item {
  width: clamp(280px, 32vw, 360px);
  aspect-ratio: 1;
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.project-card {
  --accent: #00c896;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  background: linear-gradient(145deg, #0f172a, #1e293b);
  cursor: pointer;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  text-align: left;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
}

.project-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.card-spiral {
  position: absolute;
  z-index: 1;
  right: -40px;
  bottom: -40px;
  flex-shrink: 0;
  pointer-events: none;
}

.card-cover {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.16;
  pointer-events: none;
}

.card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 28px;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: auto;
}

.card-tag {
  padding: 4px 10px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
}

.card-year {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}

.card-body {
  margin-top: auto;
  margin-bottom: 28px;
}

.card-name {
  margin: 0 0 12px;
  color: #fff;
  font-family: 'Fraunces', Georgia, serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.1;
}

.card-desc {
  max-width: 240px;
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 14px;
  line-height: 1.55;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.card-stack li {
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
}

.card-stack li + li::before {
  margin-right: 8px;
  color: rgba(255, 255, 255, 0.2);
  content: '·';
}

.card-cta {
  flex-shrink: 0;
  color: var(--accent);
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.project-card:hover .card-cta,
.project-card:focus-visible .card-cta {
  opacity: 1;
}

.card-accent-line {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.project-card:hover .card-accent-line,
.project-card:focus-visible .card-accent-line {
  width: 100%;
}

@media (max-width: 480px) {
  .card-inner {
    padding: 22px;
  }

  .card-name {
    font-size: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .card-accent-line,
  .card-cta {
    transition: none;
  }
}
</style>
