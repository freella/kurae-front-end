<script setup lang="ts">
import { ref } from 'vue'
import dockerLogo from '@/assets/logos/infra/docker.svg'
import gitLogo from '@/assets/logos/infra/git.svg'
import githubLogo from '@/assets/logos/infra/github-devicon.svg'
import pytestLogo from '@/assets/logos/infra/pytest.svg'
import nodeLogo from '@/assets/logos/backend/nodejs.svg'
import pythonLogo from '@/assets/logos/backend/python.svg'
import djangoRestLogo from '@/assets/logos/backend/django-rest-framework.svg'
import redisLogo from '@/assets/logos/backend/redis.svg'
import postgresqlLogo from '@/assets/logos/banco/postgresql.svg'
import tailwindLogo from '@/assets/logos/frontend/tailwindcss.svg'
import vueLogo from '@/assets/logos/frontend/vuejs.svg'
import geminiLogo from '@/assets/logos/ia/gemini.svg'

const isPaused = ref(false)

const technologies = [
  { name: 'Vue.js', category: 'Frontend', logo: vueLogo },
  { name: 'Tailwind CSS', category: 'Frontend', logo: tailwindLogo },
  { name: 'Python', category: 'Backend', logo: pythonLogo },
  { name: 'Node.js', category: 'Backend', logo: nodeLogo },
  { name: 'Django REST Framework', category: 'Backend', logo: djangoRestLogo },
  { name: 'Redis', category: 'Backend', logo: redisLogo },
  { name: 'PostgreSQL', category: 'Banco de dados', logo: postgresqlLogo },
  { name: 'Google Gemini', category: 'Inteligência artificial', logo: geminiLogo },
  { name: 'Docker', category: 'Infraestrutura', logo: dockerLogo },
  { name: 'Git', category: 'Infraestrutura', logo: gitLogo },
  { name: 'GitHub', category: 'Infraestrutura', logo: githubLogo },
  { name: 'pytest', category: 'Testes', logo: pytestLogo },
]
</script>

<template>
  <section id="tecnologias" class="tech-stack" aria-labelledby="tech-stack-title">
    <div class="section-header">
      <span class="section-label">Tecnologias</span>
      <h2 id="tech-stack-title">Ferramentas que usamos</h2>
      <p>Uma seleção das tecnologias presentes no nosso stack.</p>
      <button
        class="motion-toggle"
        type="button"
        :aria-pressed="isPaused"
        @click="isPaused = !isPaused"
      >
        {{ isPaused ? 'Retomar rolagem' : 'Pausar rolagem' }}
      </button>
    </div>

    <div
      class="tech-carousel"
      :class="{ 'tech-carousel--paused': isPaused }"
      role="region"
      aria-label="Tecnologias utilizadas"
    >
      <div class="tech-track">
        <ul class="tech-group">
          <li v-for="technology in technologies" :key="technology.name" class="tech-card">
            <img
              class="tech-logo"
              :class="{ 'tech-logo--github': technology.name === 'GitHub' }"
              :src="technology.logo"
              alt=""
              aria-hidden="true"
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
            <h3>{{ technology.name }}</h3>
            <span class="tech-category">{{ technology.category }}</span>
          </li>
        </ul>
        <ul class="tech-group tech-group--duplicate" aria-hidden="true" inert>
          <li v-for="technology in technologies" :key="technology.name" class="tech-card">
            <img
              class="tech-logo"
              :class="{ 'tech-logo--github': technology.name === 'GitHub' }"
              :src="technology.logo"
              alt=""
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
            <h3>{{ technology.name }}</h3>
            <span class="tech-category">{{ technology.category }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-stack {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.section-header {
  margin-bottom: 32px;
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
  max-width: 580px;
  color: #cbd5e1;
  line-height: 1.6;
}

.motion-toggle {
  margin-top: 16px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: #e2e8f0;
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
}

.motion-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.motion-toggle:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 3px;
}

.tech-carousel {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 3%,
    #000 97%,
    transparent
  );
  mask-image: linear-gradient(to right, transparent, #000 3%, #000 97%, transparent);
}

.tech-track {
  display: flex;
  width: max-content;
  animation: tech-scroll 42s linear infinite;
}

.tech-carousel:hover .tech-track,
.tech-carousel:focus-within .tech-track,
.tech-carousel--paused .tech-track {
  animation-play-state: paused;
}

.tech-group {
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  margin: 0;
  padding: 0 16px 0 0;
  list-style: none;
}

.tech-card {
  flex: 0 0 156px;
  min-height: 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  text-align: center;
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease;
}

.tech-card:hover {
  transform: translateY(-3px);
  border-color: rgba(147, 197, 253, 0.3);
  background: rgba(255, 255, 255, 0.07);
}

.tech-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  filter: grayscale(1);
  transition: filter 180ms ease;
}

.tech-card:hover .tech-logo {
  filter: grayscale(0);
}

.tech-logo--github,
.tech-card:hover .tech-logo--github {
  filter: brightness(0) invert(1);
}

.tech-card h3 {
  max-width: 100%;
  margin: 0;
  color: #f8fafc;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.tech-category {
  color: #94a3b8;
  font-size: 0.78rem;
  line-height: 1.3;
}

@keyframes tech-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .motion-toggle {
    display: none;
  }

  .tech-carousel {
    overflow: visible;
    mask-image: none;
    -webkit-mask-image: none;
  }

  .tech-track {
    display: block;
    width: auto;
    animation: none;
  }

  .tech-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr));
    padding: 0;
  }

  .tech-group--duplicate {
    display: none;
  }

  .tech-card,
  .tech-logo {
    transition: none;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.6rem;
  }
}
</style>
