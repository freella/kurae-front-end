<script setup lang="ts">
import { ref } from 'vue'
import { LANDING_CONTENT } from '@/config/landing.config'

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="section-header">
      <span class="section-label">Dúvidas frequentes</span>
      <h2>Perguntas & Respostas</h2>
      <p>Encontre rapidamente as respostas para as dúvidas mais comuns.</p>
    </div>

    <div class="faq-list">
      <div
        v-for="(faq, index) in LANDING_CONTENT.faqs"
        :key="index"
        class="faq-item"
        :class="{ 'faq-item--open': openFaq === index }"
      >
        <button class="faq-question" @click="toggleFaq(index)" :aria-expanded="openFaq === index">
          <span>{{ faq.question }}</span>
          <span class="faq-icon" aria-hidden="true">{{ openFaq === index ? '−' : '+' }}</span>
        </button>

        <div class="faq-answer" :class="{ 'faq-answer--visible': openFaq === index }">
          <p>{{ faq.answer }}</p>
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
