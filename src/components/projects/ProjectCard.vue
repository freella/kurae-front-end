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
        :size="160"
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
  width: 156px;
  height: 164px;
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
  padding: 14px 12px;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: auto;
}

.card-tag {
  padding: 3px 6px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.06em;
}

.card-year {
  color: rgba(255, 255, 255, 0.3);
  font-size: 10px;
}

.card-body {
  margin-top: auto;
  margin-bottom: 12px;
}

.card-name {
  margin: 0 0 6px;
  color: #fff;
  font-family: 'Fraunces', Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.1;
}

.card-desc {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.card-stack {
  display: flex;
  min-width: 0;
  overflow: hidden;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.card-stack li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.4);
  font-size: 9px;
}

.card-stack li + li::before {
  margin-right: 4px;
  color: rgba(255, 255, 255, 0.2);
  content: '·';
}

.card-cta {
  flex-shrink: 0;
  color: var(--accent);
  font-size: 10px;
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
    padding: 14px 12px;
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
