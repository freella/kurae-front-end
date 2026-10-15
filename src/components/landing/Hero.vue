<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handlePrimaryAction = () => {
  router.push('/contato');
};
</script>

<template>
  <section class="relative overflow-hidden bg-slate-900 py-20 lg:py-32 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-7 text-center lg:text-left">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
            Plataforma Digital Vitalis • Gestão & IA
          </span>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Gestão Clínica Inteligente <span class="text-emerald-400">&</span> Interoperabilidade em Saúde
          </h1>
          
          <p class="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
            Unimos a robustez da gestão hospitalar tradicional com triagem assistida por IA, prontuário por voz e integração nativa com equipamentos de exames.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button 
              @click="handlePrimaryAction"
              class="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              Experimente o Vitalis
            </button>
            <a 
              href="#sobre"
              class="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all border border-slate-700 text-center"
            >
              Conhecer a Solução
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div class="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              IA Ativa
            </div>
            <div class="space-y-4">
              <div class="h-3 w-1/3 bg-slate-700 rounded"></div>
              <div class="h-24 bg-slate-900/60 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-center">
                <p class="text-xs text-slate-400 mb-1">Prontuário Inteligente (Scribing)</p>
                <p class="text-sm text-emerald-400 font-mono">"Paciente felino apresentando emese persistente há 48h..."</p>
              </div>
              <div class="flex justify-between items-center pt-2">
                <span class="text-xs text-slate-400">Status: Sincronizado</span>
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>