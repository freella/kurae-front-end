<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="project"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`project-title-${project.slug}`"
        @click.self="emit('close')"
      >
        <div
          ref="panelRef"
          class="modal-panel"
          :style="{ '--accent': project.accentColor }"
          @keydown="onPanelKeydown"
        >
          <GoldenSpiral
            class="modal-spiral"
            :size="500"
            :color="project.accentColor"
            :opacity="0.07"
          />

          <header class="modal-header">
            <div class="modal-meta">
              <span class="modal-tag">{{ project.tag }}</span>
              <span class="modal-year">{{ project.year }}</span>
            </div>
            <button
              ref="closeButton"
              class="modal-close"
              type="button"
              aria-label="Fechar detalhes do projeto"
              @click="emit('close')"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </header>

          <h2 :id="`project-title-${project.slug}`" class="modal-name">{{ project.name }}</h2>
          <p class="modal-short">{{ project.shortDesc }}</p>

          <div class="modal-divider" aria-hidden="true" />

          <div class="modal-sections">
            <section
              v-for="(section, index) in project.sections"
              :key="section.title || index"
              class="modal-section"
            >
              <h3 class="modal-section-title">{{ section.title }}</h3>
              <p class="modal-section-body">{{ section.body }}</p>
            </section>
          </div>

          <section v-if="project.results.length" class="modal-results">
            <h3 class="modal-results-title">Destaques</h3>
            <ul class="modal-results-list">
              <li v-for="result in project.results" :key="result">
                <span class="result-dot" aria-hidden="true" />
                {{ result }}
              </li>
            </ul>
          </section>

          <footer class="modal-footer">
            <div class="modal-stack">
              <span class="modal-stack-label">Stack</span>
              <ul class="modal-stack-list" aria-label="Tecnologias utilizadas">
                <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

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

<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  inset: 0;
}

.modal-panel {
  --accent: #00c896;
  position: relative;
  width: 100%;
  max-width: 680px;
  max-height: 92vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 36px 32px 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 0;
  border-radius: 4px 4px 0 0;
  background: #0f0f0f;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  scrollbar-width: thin;
}

.modal-spiral {
  position: absolute;
  z-index: 0;
  top: -60px;
  right: -60px;
  pointer-events: none;
}

.modal-panel > *:not(.modal-spiral) {
  position: relative;
  z-index: 1;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-tag {
  padding: 4px 10px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
}

.modal-year {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

.modal-close {
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.modal-close:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.modal-name {
  margin: 0 0 12px;
  color: #fff;
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 600;
  line-height: 1.05;
}

.modal-short {
  max-width: 480px;
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  line-height: 1.5;
}

.modal-divider {
  height: 1px;
  margin: 32px 0;
  background: rgba(255, 255, 255, 0.08);
}

.modal-sections {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 36px;
}

.modal-section-title,
.modal-results-title {
  margin: 0 0 10px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.modal-section-body {
  max-width: 560px;
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
  line-height: 1.65;
}

.modal-results {
  margin-bottom: 36px;
  padding: 20px 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 2px solid var(--accent);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.03);
}

.modal-results-title {
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.modal-results-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.modal-results-list li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.4;
}

.result-dot {
  position: relative;
  top: -1px;
  width: 5px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--accent);
}

.modal-footer {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-stack {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-stack-label {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.modal-stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.modal-stack-list li {
  padding: 3px 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
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
  .modal-backdrop {
    align-items: center;
    padding: 24px;
  }

  .modal-panel {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .modal-enter-from .modal-panel,
  .modal-leave-to .modal-panel {
    transform: translateY(12px) scale(0.98);
  }
}

@media (max-width: 480px) {
  .modal-panel {
    padding: 28px 22px 36px;
  }

  .modal-stack {
    align-items: flex-start;
    flex-direction: column;
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
