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

<template>
  <article class="h-[172px] w-[184px] shrink-0 snap-start" role="listitem">
    <button
      class="project-card group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-navy/50 bg-gradient-to-br from-graphite to-deep-blue p-0 text-left font-sans text-ice transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
      :style="{ '--accent': project.accentColor || 'var(--color-cyan-vibrant)' }"
      :aria-label="`Ver detalhes: ${project.name}`"
      @click="$emit('open', project)"
    >
      <img
        v-if="project.cover"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-15"
        :src="project.cover"
        alt=""
        aria-hidden="true"
      />
      <GoldenSpiral
        class="pointer-events-none absolute -right-10 -bottom-10 z-1 shrink-0"
        :size="160"
        :color="project.accentColor || '#16defd'"
        :opacity="0.15"
      />

      <div class="relative z-2 flex h-full flex-col px-3.5 py-3.5">
        <div class="mb-auto flex items-center justify-between gap-2">
          <span
            class="card-tag whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium tracking-wider uppercase"
          >
            {{ project.tag }}
          </span>
          <span class="shrink-0 text-[10px] text-ice/45">{{ project.year }}</span>
        </div>

        <div class="mt-auto mb-3">
          <h3 class="mb-1.5 font-display text-[21px] font-bold leading-[1.1] text-ice">
            {{ project.name }}
          </h3>
          <p class="line-clamp-3 text-[11px] leading-[1.4] text-ice/70">
            {{ project.shortDesc }}
          </p>
        </div>

        <div class="flex items-center justify-between gap-1.5">
          <ul
            class="card-stack flex min-w-0 gap-1 overflow-hidden p-0 list-none"
            aria-label="Tecnologias"
          >
            <li
              v-for="tech in project.stack.slice(0, 3)"
              :key="tech"
              class="truncate text-[9px] text-ice/50"
            >
              {{ tech }}
            </li>
            <li v-if="project.stack.length > 3" class="truncate text-[9px] text-ice/50">
              +{{ project.stack.length - 3 }}
            </li>
          </ul>
          <span
            class="card-cta shrink-0 text-[10px] font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            aria-hidden="true"
          >
            Ver projeto
          </span>
        </div>
      </div>

      <span
        class="card-accent-line absolute bottom-0 left-0 z-3 h-0.5 w-0 transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
        aria-hidden="true"
      />
    </button>
  </article>
</template>

<style scoped>
.project-card {
  --accent: var(--color-cyan-vibrant);
}

.project-card:hover {
  border-color: var(--accent);
}

.project-card:focus-visible {
  outline-color: var(--accent);
}

.card-tag {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}

.card-cta {
  color: var(--accent);
}

.card-accent-line {
  background: var(--accent);
}

.card-stack li + li::before {
  margin-right: 4px;
  color: rgba(238, 247, 250, 0.25);
  content: '·';
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .card-accent-line,
  .card-cta {
    transition: none;
  }
}
</style>