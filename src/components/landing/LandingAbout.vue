<script setup lang="ts">
interface TeamMember {
  name: string;
  role: string;
  description: string;
}

// Dados extraídos do documento institucional da Kurae Solutions
const team: TeamMember[] = [
  { 
    name: 'Carlos Lemos', 
    role: 'Tecnologia, Arquitetura & Liderança Técnica', 
    description: 'Arquitetura de aplicações, desenvolvimento Full Stack, IA e automação.' 
  },
  { 
    name: 'Bernardo Santos', 
    role: 'Desenvolvimento Full Stack, Automação & Segurança', 
    description: 'Desenvolvimento web e mobile, automação e segurança da informação.' 
  },
  { 
    name: 'Pedro Vinícius', 
    role: 'Dados, IA & Desenvolvimento', 
    description: 'Desenvolvimento Full Stack, análise de dados e Machine Learning.' 
  },
  { 
    name: 'Cauê Tamiarana', 
    role: 'Desenvolvimento Full Stack & Integrações', 
    description: 'Aplicações web, APIs, dashboards e integração de sistemas.' 
  },
  { 
    name: 'João Gabriel Costa Rodrigues', 
    role: 'Desenvolvimento Web/front-end & IA', 
    description: 'Desenvolvimento web, infraestrutura de TI, IA e redes.' 
  },
  { 
    name: 'Paulo Vitor Rodrigues', 
    role: 'Design, UX & Marketing', 
    description: 'Web Design, design de interfaces, UX e Growth Marketing.' 
  },
  { 
    name: 'Yasmin Rodrigues', 
    role: 'Product Manager Produto & Negócios', 
    description: 'Identificação de problemas, validação de ideias, estratégia e produto.' 
  }
];
</script>

<template>
  <section id="sobre" class="py-24 bg-slate-950 text-slate-300 border-t border-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Cabeçalho Institucional -->
      <div class="max-w-3xl mx-auto text-center mb-20">
        <h2 class="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">
          Sobre a Kurae Solutions
        </h2>
        <p class="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
          Problemas reais antes da tecnologia.
        </p>
        <p class="text-lg text-slate-400 mb-6">
          A Kurae existe para transformar desafios de pessoas e empresas em soluções digitais úteis e acessíveis. O Vitalis é o nosso principal laboratório de inovação: um produto próprio nascido da compreensão profunda das dores operacionais de um contexto hospitalar real.
        </p>
        <div class="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300">
          Missão: Simplificar processos e melhorar experiências.
        </div>
      </div>

      <!-- Grid da Equipe Multidisciplinar -->
      <div>
        <div class="text-center mb-12">
          <h3 class="text-2xl font-bold text-white">Nossa Equipe</h3>
          <p class="text-slate-400 mt-2">Profissionais multidisciplinares por trás da plataforma Vitalis.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Renderização dinâmica da equipe usando v-for -->
          <div 
            v-for="(member, index) in team" 
            :key="index"
            class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-1"
          >
            <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-emerald-400 font-bold text-lg border border-slate-700">
              {{ member.name.charAt(0) }}
            </div>
            <h4 class="text-white font-bold mb-1">{{ member.name }}</h4>
            <p class="text-xs text-emerald-400 font-medium mb-3 h-8">{{ member.role }}</p>
            <p class="text-sm text-slate-400 leading-relaxed">
              {{ member.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>