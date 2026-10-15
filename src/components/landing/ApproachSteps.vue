<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: '1. O Problema Antes da Tecnologia',
    description: 'Mergulhamos no contexto do negócio. Não escrevemos uma linha de código sem antes compreender a dor real que precisa de ser resolvida.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
  },
  {
    title: '2. Experiência e Estratégia',
    description: 'Desenhamos a solução focada nas pessoas. Unimos usabilidade e objetivos de negócio para garantir que o produto final é intuitivo e útil.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    title: '3. Desenvolvimento e Qualidade',
    description: 'Transformamos o design em realidade com arquitetura sólida, segurança e boas práticas de engenharia de software.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    title: '4. Evolução Contínua',
    description: 'Um produto digital nunca está verdadeiramente finalizado. Monitorizamos métricas, aplicamos melhorias e escalamos a solução conforme o negócio cresce.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
  }
];

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {

        entry.target.classList.remove('opacity-0', 'translate-y-12');
        entry.target.classList.add('opacity-100', 'translate-y-0');

        observer.value?.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2, 
    rootMargin: '0px 0px -50px 0px' 
  });


  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.value?.observe(el);
  });
});

onUnmounted(() => {

  observer.value?.disconnect();
});
</script>

<template>
  <section class="py-24 bg-slate-900 border-t border-slate-800 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16 scroll-animate opacity-0 translate-y-12 transition-all duration-1000 ease-out">
        <h2 class="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">
          Nossa Abordagem
        </h2>
        <p class="text-3xl sm:text-4xl font-bold text-white">
          Como transformamos ideias em produtos
        </p>
      </div>

      <div class="relative max-w-4xl mx-auto">

        <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-800"></div>

        <div class="space-y-12">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="relative flex flex-col md:flex-row items-center w-full scroll-animate opacity-0 translate-y-12 transition-all duration-1000 ease-out"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            

            <div class="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-900 shadow-xl my-6 md:my-0">
              <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon" />
                </svg>
              </div>
            </div>


            <div 
              class="w-full md:w-1/2"
              :class="index % 2 === 0 ? 'md:pr-16 text-center md:text-right' : 'md:pl-16 text-center md:text-left md:ml-auto'"
            >
              <h3 class="text-xl font-bold text-white mb-2">{{ step.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ step.description }}</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>