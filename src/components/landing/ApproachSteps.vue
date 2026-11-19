<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Step {
  title: string
  description: string
  icon: string
}

const steps: Step[] = [
  {
    title: '1. O Problema Antes da Tecnologia',
    description:
      'Mergulhamos no contexto do negócio. Não escrevemos uma linha de código sem antes compreender a dor real que precisa de ser resolvida.',
    icon: 'mdi-magnify',
  },
  {
    title: '2. Experiência e Estratégia',
    description:
      'Desenhamos a solução focada nas pessoas. Unimos usabilidade e objetivos de negócio para garantir que o produto final é intuitivo e útil.',
    icon: 'mdi-lightbulb-outline',
  },
  {
    title: '3. Desenvolvimento e Qualidade',
    description:
      'Transformamos o design em realidade com arquitetura sólida, segurança e boas práticas de engenharia de software.',
    icon: 'mdi-code-tags',
  },
  {
    title: '4. Evolução Contínua',
    description:
      'Um produto digital nunca está verdadeiramente finalizado. Monitorizamos métricas, aplicamos melhorias e escalamos a solução conforme o negócio cresce.',
    icon: 'mdi-autorenew',
  },
]

const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12')
          entry.target.classList.add('opacity-100', 'translate-y-0')

          observer.value?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.value?.observe(el)
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <section
    id="abordagem"
    class="overflow-hidden border-t border-navy/30 bg-graphite/50 py-24"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="scroll-animate mb-16 translate-y-12 text-center opacity-0 transition-all duration-1000 ease-out"
      >
        <h2
          class="mb-3 font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
        >
          Nossa Abordagem
        </h2>
        <p class="font-display text-3xl font-bold text-ice sm:text-4xl">
          Como transformamos ideias em produtos
        </p>
      </div>

      <div class="relative mx-auto max-w-4xl">
        <div
          class="absolute left-1/2 hidden h-full w-px -translate-x-1/2 transform bg-navy/50 md:block"
        ></div>

        <div class="space-y-12">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="scroll-animate relative flex w-full translate-y-12 flex-col items-center opacity-0 transition-all duration-1000 ease-out md:flex-row"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <div
              class="z-10 my-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-navy/60 bg-deep-blue shadow-xl md:absolute md:left-1/2 md:my-0 md:-translate-x-1/2 md:transform"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full border border-sky-electric/30 bg-petrol/80 text-cyan-vibrant"
              >
                <v-icon :icon="step.icon" size="20" aria-hidden="true" />
              </div>
            </div>

            <div
              class="w-full md:w-1/2"
              :class="
                index % 2 === 0
                  ? 'text-center md:pr-16 md:text-right'
                  : 'text-center md:ml-auto md:pl-16 md:text-left'
              "
            >
              <h3 class="mb-2 font-display text-xl font-bold text-ice">
                {{ step.title }}
              </h3>
              <p class="font-sans text-sm leading-relaxed text-ice/75">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>