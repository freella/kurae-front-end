<script setup lang="ts">
import { ref } from 'vue'
import { LANDING_CONTENT } from '@/config/landing.config'

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <section
    id="faq"
    class="mx-auto max-w-7xl border-t border-navy/30 px-4 py-20 sm:px-6 lg:px-8"
  >
    <div class="mb-10">
      <span
        class="mb-3 inline-block font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
      >
        Dúvidas frequentes
      </span>
      <h2 class="mb-3 font-display text-2xl font-bold text-ice sm:text-4xl">
        Perguntas & Respostas
      </h2>
      <p class="max-w-[580px] font-sans leading-relaxed text-ice/75">
        Encontre rapidamente as respostas para as dúvidas mais comuns.
      </p>
    </div>

    <div class="flex max-w-[760px] flex-col gap-3">
      <div
        v-for="(faq, index) in LANDING_CONTENT.faqs"
        :key="index"
        class="overflow-hidden rounded-xl border transition-colors"
        :class="
          openFaq === index
            ? 'border-cyan-vibrant/60 bg-petrol/30'
            : 'border-navy/50 bg-graphite/90 hover:border-sky-electric/40'
        "
      >
        <button
          type="button"
          class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-sans text-base font-medium text-ice transition-colors hover:bg-petrol/30 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-neon"
          :aria-expanded="openFaq === index"
          @click="toggleFaq(index)"
        >
          <span>{{ faq.question }}</span>
          <span
            class="shrink-0 font-sans text-2xl font-light leading-none text-cyan-vibrant"
            aria-hidden="true"
          >
            {{ openFaq === index ? '−' : '+' }}
          </span>
        </button>

        <div
          class="overflow-hidden px-6 transition-all duration-300 ease-out"
          :class="openFaq === index ? 'max-h-[240px] pb-5 opacity-100' : 'max-h-0 opacity-0'"
        >
          <p class="font-sans text-[0.95rem] leading-relaxed text-ice/75">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
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

.faq-list {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.faq-item--open {
  border-color: rgba(147, 197, 253, 0.35);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  background: transparent;
  border: none;
  color: #f8fafc;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.faq-question:hover {
  background: rgba(255, 255, 255, 0.04);
}

.faq-icon {
  font-size: 1.4rem;
  font-weight: 300;
  color: #93c5fd;
  line-height: 1;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.faq-item--open .faq-icon {
  transform: rotate(0deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 24px;
}

.faq-answer--visible {
  max-height: 200px;
  padding: 0 24px 20px;
}

.faq-answer p {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 0.95rem;
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.6rem;
  }
}
</style>
