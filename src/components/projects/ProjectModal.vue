<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import type { Project } from '@/data/projects'
import GoldenSpiral from './GoldenSpiral.vue'

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  close: []
}>()

const panelRef = ref<HTMLDivElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null
let previousBodyOverflow = ''
let bodyScrollLocked = false

watch(
  () => props.project,
  async (project) => {
    if (project) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      bodyScrollLocked = true
      await nextTick()
      closeButton.value?.focus()
      return
    }

    if (bodyScrollLocked) document.body.style.overflow = previousBodyOverflow
    bodyScrollLocked = false
    if (previousFocus?.isConnected) previousFocus.focus()
    previousFocus = null
  },
)

function onPanelKeydown(event: KeyboardEvent) {
  if (event.key !== 'Tab') return

  const focusable = panelRef.value?.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  if (!focusable?.length) return

  const first = focusable.item(0)
  const last = focusable.item(focusable.length - 1)
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.project) emit('close')
}

window.addEventListener('keydown', onKeydown)
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (bodyScrollLocked) document.body.style.overflow = previousBodyOverflow
  if (previousFocus?.isConnected) previousFocus.focus()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="project"
        class="fixed inset-0 z-[1000] flex items-end justify-center bg-deep-blue/80 p-0 backdrop-blur-md md:items-center md:p-6"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`project-title-${project.slug}`"
        @click.self="emit('close')"
      >
        <div
          ref="panelRef"
          class="modal-panel relative max-h-[92vh] w-full max-w-[680px] overflow-x-hidden overflow-y-auto rounded-t-2xl border border-b-0 border-navy/60 bg-graphite px-5.5 pt-7 pb-9 font-sans text-ice shadow-2xl sm:px-8 sm:pt-9 sm:pb-12 md:rounded-2xl md:border-b"
          :style="{ '--accent': project.accentColor || 'var(--color-cyan-vibrant)' }"
          @keydown="onPanelKeydown"
        >
          <GoldenSpiral
            class="pointer-events-none absolute -top-15 -right-15 z-0"
            :size="500"
            :color="project.accentColor || '#16defd'"
            :opacity="0.08"
          />

          <header class="relative z-1 mb-7 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span
                class="modal-tag rounded px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase"
              >
                {{ project.tag }}
              </span>
              <span class="text-xs text-ice/50">{{ project.year }}</span>
            </div>
            <button
              ref="closeButton"
              class="modal-close flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-navy/50 bg-petrol/40 text-ice/75 transition-colors hover:border-sky-electric hover:bg-petrol hover:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-2"
              type="button"
              aria-label="Fechar detalhes do projeto"
              @click="emit('close')"
            >
              <v-icon icon="mdi-close" size="20" aria-hidden="true" />
            </button>
          </header>

          <h2
            :id="`project-title-${project.slug}`"
            class="relative z-1 mb-3 font-display text-4xl font-bold leading-[1.05] text-ice sm:text-5xl"
          >
            {{ project.name }}
          </h2>
          <p class="relative z-1 max-w-[480px] text-base leading-normal text-ice/70">
            {{ project.shortDesc }}
          </p>

          <div class="relative z-1 my-8 h-px bg-navy/40" aria-hidden="true" />

          <div class="relative z-1 mb-9 flex flex-col gap-7">
            <section
              v-for="(section, index) in project.sections"
              :key="section.title || index"
            >
              <h3 class="modal-accent-text mb-2.5 text-[11px] font-semibold tracking-wider uppercase">
                {{ section.title }}
              </h3>
              <p class="max-w-[560px] text-[15px] leading-[1.65] text-ice/80">
                {{ section.body }}
              </p>
            </section>
          </div>

          <section
            v-if="project.results.length"
            class="modal-results relative z-1 mb-9 rounded-r-xl border border-navy/40 bg-deep-blue/60 px-6 py-5"
          >
            <h3 class="mb-3.5 text-[11px] font-semibold tracking-wider text-ice/60 uppercase">
              Destaques
            </h3>
            <ul class="flex flex-col gap-2.5 p-0 list-none">
              <li
                v-for="result in project.results"
                :key="result"
                class="flex items-baseline gap-2.5 text-sm leading-snug text-ice/85"
              >
                <span
                  class="result-dot relative -top-px h-1.5 w-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {{ result }}
              </li>
            </ul>
          </section>

          <footer class="relative z-1 border-t border-navy/40 pt-6">
            <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span
                class="shrink-0 text-[11px] font-semibold tracking-wider text-ice/55 uppercase"
              >
                Stack
              </span>
              <ul
                class="flex flex-wrap gap-2 p-0 list-none"
                aria-label="Tecnologias utilizadas"
              >
                <li
                  v-for="tech in project.stack"
                  :key="tech"
                  class="rounded border border-navy/50 bg-petrol/40 px-2.5 py-1 text-xs text-ice/80"
                >
                  {{ tech }}
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-panel {
  --accent: var(--color-cyan-vibrant);
  scrollbar-color: rgba(32, 95, 190, 0.4) transparent;
  scrollbar-width: thin;
}

.modal-tag {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}

.modal-close:focus-visible {
  outline-color: var(--accent);
}

.modal-accent-text {
  color: var(--accent);
}

.modal-results {
  border-left: 3px solid var(--accent);
}

.result-dot {
  background: var(--accent);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: translateY(24px);
  opacity: 0;
}

@media (min-width: 768px) {
  .modal-enter-from .modal-panel,
  .modal-leave-to .modal-panel {
    transform: translateY(12px) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-panel,
  .modal-leave-active .modal-panel {
    transition: none;
  }
}
</style>