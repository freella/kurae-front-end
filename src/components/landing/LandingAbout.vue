<script setup lang="ts">
interface TeamMember {
  name: string
  role: string
  description: string
}

const team: TeamMember[] = [
  {
    name: 'Carlos Lemos',
    role: 'Tecnologia, Arquitetura & Liderança Técnica',
    description:
      'Arquitetura de aplicações, desenvolvimento Full Stack, IA e automação.',
  },
  {
    name: 'Bernardo Santos',
    role: 'Desenvolvimento Full Stack, Automação & Segurança',
    description:
      'Desenvolvimento web e mobile, automação e segurança da informação.',
  },
  {
    name: 'Pedro Vinícius',
    role: 'Dados, IA & Desenvolvimento',
    description:
      'Desenvolvimento Full Stack, análise de dados e Machine Learning.',
  },
  {
    name: 'Cauê Tamiarana',
    role: 'Desenvolvimento Full Stack & Integrações',
    description: 'Aplicações web, APIs, dashboards e integração de sistemas.',
  },
  {
    name: 'João Gabriel Rodrigues',
    role: 'Desenvolvimento Web/front-end & IA',
    description: 'Desenvolvimento web, infraestrutura de TI, IA e redes.',
  },
  {
    name: 'Paulo Vitor Rodrigues',
    role: 'Design, UX & Marketing',
    description: 'Web Design, design de interfaces, UX e Growth Marketing.',
  },
  {
    name: 'Yasmin Rodrigues',
    role: 'Product Manager, Produto & Negócios',
    description:
      'Identificação de problemas, validação de ideias, estratégia e produto.',
  },
]
</script>

<template>
  <section id="sobre" class="border-t border-navy/30 bg-deep-blue py-24 text-ice/85">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto mb-20 max-w-3xl text-center">
        <h2
          class="mb-3 font-sans text-sm font-semibold tracking-wide text-cyan-vibrant uppercase"
        >
          Sobre a Kurae Solutions
        </h2>
        <p
          class="mb-6 font-display text-3xl font-bold leading-tight text-ice sm:text-4xl"
        >
          Modernizar a operação da saúde por meio de tecnologia inteligente.
        </p>
        <p class="mb-6 font-sans text-lg leading-relaxed text-ice/75">
          A Kurae Solutions é uma startup de tecnologia especializada em
          transformar e automatizar processos complexos da área da saúde em
          experiências digitais mais eficientes e integradas, reduzindo
          burocracias, tarefas manuais e retrabalho.
        </p>
        <div
          class="inline-flex items-center rounded-lg border border-navy/60 bg-petrol/50 px-4 py-2 font-sans text-sm font-medium text-turquoise"
        >
          Missão: Simplificar processos e melhorar experiências.
        </div>
      </div>

      <div>
        <div class="mb-12 text-center">
          <h3 class="font-display text-2xl font-bold text-ice">Nossa Equipe</h3>
          <p class="mt-2 font-sans text-ice/70">
            Profissionais multidisciplinares por trás da plataforma Vitalis.
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="(member, index) in team"
            :key="index"
            class="rounded-2xl border border-navy/50 bg-graphite p-6 transition-all hover:-translate-y-1 hover:border-cyan-vibrant/50"
          >
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sky-electric/40 bg-petrol/70 font-display text-lg font-bold text-cyan-vibrant"
            >
              {{ member.name.charAt(0) }}
            </div>
            <h4 class="mb-1 font-display font-bold text-ice">
              {{ member.name }}
            </h4>
            <p class="mb-3 min-h-8 font-sans text-xs font-medium text-sky-electric">
              {{ member.role }}
            </p>
            <p class="font-sans text-sm leading-relaxed text-ice/75">
              {{ member.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>