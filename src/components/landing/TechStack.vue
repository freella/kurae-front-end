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
  <section
    id="tecnologias"
    class="mx-auto max-w-7xl border-t border-navy/30 px-4 py-20 sm:px-6 lg:px-8"
    aria-labelledby="tech-stack-title"
  >
    <div class="mb-8">
      <span
        class="mb-3 inline-block font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
      >
        Tecnologias
      </span>
      <h2
        id="tech-stack-title"
        class="mb-3 font-display text-2xl font-bold text-ice sm:text-4xl"
      >
        Ferramentas que usamos
      </h2>
      <p class="max-w-[580px] font-sans leading-relaxed text-ice/75">
        Uma seleção das tecnologias presentes no nosso stack.
      </p>
      <button
        class="motion-toggle mt-4 cursor-pointer rounded-lg border border-navy bg-graphite/90 px-3.5 py-2 font-sans text-sm font-medium text-ice transition-colors hover:border-sky-electric hover:text-cyan-vibrant focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cyan-neon"
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
          <li
            v-for="technology in technologies"
            :key="technology.name"
            class="tech-card flex min-h-[164px] w-[156px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-navy/50 bg-graphite/90 px-3 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-cyan-vibrant/50 hover:bg-petrol/40"
          >
            <img
              class="tech-logo h-14 w-14 object-contain"
              :class="{ 'tech-logo--github': technology.name === 'GitHub' }"
              :src="technology.logo"
              alt=""
              aria-hidden="true"
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
            <h3
              class="max-w-full font-sans text-[0.95rem] font-semibold leading-snug break-words text-ice"
            >
              {{ technology.name }}
            </h3>
            <span class="font-sans text-xs leading-tight text-sky-electric/85">
              {{ technology.category }}
            </span>
          </li>
        </ul>

        <ul class="tech-group tech-group--duplicate" aria-hidden="true" inert>
          <li
            v-for="technology in technologies"
            :key="technology.name"
            class="tech-card flex min-h-[164px] w-[156px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-navy/50 bg-graphite/90 px-3 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-cyan-vibrant/50 hover:bg-petrol/40"
          >
            <img
              class="tech-logo h-14 w-14 object-contain"
              :class="{ 'tech-logo--github': technology.name === 'GitHub' }"
              :src="technology.logo"
              alt=""
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
            <h3
              class="max-w-full font-sans text-[0.95rem] font-semibold leading-snug break-words text-ice"
            >
              {{ technology.name }}
            </h3>
            <span class="font-sans text-xs leading-tight text-sky-electric/85">
              {{ technology.category }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-carousel {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 3%,
    #000 97%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 3%,
    #000 97%,
    transparent
  );
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
  padding: 4px 16px 4px 0;
  list-style: none;
}

.tech-logo {
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
</style>